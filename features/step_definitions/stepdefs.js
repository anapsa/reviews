const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5001';

Given('que existe um usuário com username {string}', async function (username) {
    this.response = await request(BASE_URL).get(`/users/find/${username}`);
    this.user = this.response.body
});

When('o usuário pesquisa por {string} na barra de pesquisa', async function (searchUser) {
    this.response = await request(BASE_URL).get(`/users/find/${searchUser}`);
    this.searchResult = this.response.body;
});

Then('o sistema deve retornar o perfil do usuário {string}', function (searchUser) {
    assert.strictEqual(this.searchResult.name, searchUser, `Usuário encontrado não é ${searchUser}`);
});

Then('o sistema deve retornar o status {string}', function (expectedStatus){
    assert.strictEqual(this.response.status, parseInt(expectedStatus),`A busca falhou`);
})

When('o usuário executa a ação de {string} no perfil do usuário {string}', async function (action, targetUsername) {
    this.response = await request(BASE_URL).get(`/users/find/${targetUsername}`);
    this.targetUser = this.response.body;

    if(action == "Visualizar Seguindo"){
        this.followingList = this.targetUser.following;
    }

    else if(action == "Visualizar Seguidores"){
        this.followerList = this.targetUser.followers;
    }

    else if(action == "Seguir"){
        const requestBody = { originName: this.user.name,
                              destinationName: targetUsername} 

         this.response = await request(BASE_URL)
            .post(`/users/follow/${this.targetUser}`)
            .send(requestBody) 
            .set('Content-Type', 'application/json');
    }
    
  });

  Then('o sistema deve retornar a seguinte lista de {string}:', function (data, list) {
    const expectedList = list.rawTable.flat(); // Converte a tabela para um array de strings
    // Verifica se a lista retornada é igual à esperada
    if(data == "Usuários Seguidos")
        assert.deepStrictEqual(this.followingList, expectedList, `A lista de seguindo não corresponde ao esperado`);
    else if(data == "Seguidores")
        assert.deepStrictEqual(this.followerList, expectedList, `A lista de seguindo não corresponde ao esperado`);
  });

  Then('a lista de {string} do usuário {string} deve ser atualizada para:', async function (data, username, list) {
    const expectedList = list.rawTable.flat(); // Converte a tabela para um array de strings
    this.response = await request(BASE_URL).get(`/users/find/${username}`);
    this.targetUser = this.response.body

    if(data == "following")
        assert.deepStrictEqual(this.targetUser.following, expectedList, `A lista de seguindo não foi atualizada corretamente`)
    else if(data == "followers")
        assert.deepStrictEqual(this.targetUser.followers, expectedList, `A lista de seguidores não foi atualizada corretamente`)
  });

  When('o usuário realiza a operação de {string} sua conta com os seguintes campos:', function (username, list) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  
// Quando uma requisição PUT com um JSON e o campo é enviado para o perfil do usuário
When('uma requisição PUT com um JSON com o campo {string} com o valor {string} ocorre para o perfil do usuário {string}', async function (field, value, username) {
    requestBody = null;

    if(field == "email"){
        requestBody = { newName: "", 
                        newEmail: value, 
                        newPassword: ""}; // Cria um objeto JSON dinâmico com o campo e o valor fornecidos
    }
    
    if(field == "name"){
        requestBody = { newName: value, 
                        newEmail: "", 
                        newPassword: ""}; // Cria um objeto JSON dinâmico com o campo e o valor fornecidos
    }

    if(field == "password"){
        requestBody = { newName: "", 
                        newEmail: "", 
                        newPassword: value}; // Cria um objeto JSON dinâmico com o campo e o valor fornecidos
    }

    response = await request(BASE_URL)
        .put(`/users/${username}`) // URL com o nome do usuário que será atualizado
        .send(requestBody)
        .set('Accept', 'application/json'); // Definindo o tipo de resposta esperada
    // Verifica se a requisição foi bem-sucedida (status 200)
    assert.strictEqual(response.status, 200, `Erro na requisição: status ${response.status}`);
});

// Depois de atualizar, o campo do perfil deve ter o valor esperado
Then('o campo {string} do perfil do usuário {string} deve ter o valor {string}', async function (field, username, expectedValue) {
    // Busca o usuário atualizado
    const userResponse = await request(BASE_URL).get(`/users/find/${username}`);
    updatedUser = userResponse.body;
    // Verifica se o campo foi atualizado com o valor esperado
    assert.strictEqual(updatedUser[field], expectedValue, `O campo ${field} não foi atualizado corretamente`);
});

When('uma requisição DELETE ocorre para o perfil do usuário {string}', async function (username) {
    this.response = await request(BASE_URL)
        .delete(`/users/${username}`)
        .set('Accept', 'application/json');

    assert.strictEqual(this.response.status, 200, `Erro na requisição: status ${this.response.status}`);
});

Then('o usuário {string} não existe mais no sistema', async function (username) {
    const userResponse = await request(BASE_URL).get(`/users/find/${username}`);
    assert.strictEqual(userResponse.status, 404, `Usuário ainda existe no sistema, mas deveria ter sido deletado`);
});
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

let response;

Given('que o usuário {string} com senha {string} está autenticado no sistema', async function (email, password) {
    try {
        const loginResponse = await axios.post('http://localhost:5001/users/login', {
            email: email,
            password: password
        });
        token = loginResponse.data.token;
    } catch (error) {
        throw new Error('Falha na autenticação');
    }
});
Given('que o usuário {string} com senha {string} não está autenticado no sistema', async function (email, password) {
    token = "";
});
Given('o usuário {string} é proprietário da review com título {string}, corpo {string} e classificação {int}', async function (email, titulo, corpo, classificacao) {
    try {
        const reviewResponse = await axios.post('http://localhost:5001/reviews/add', {
            title: titulo,
            body: corpo,
            classification: classificacao
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (reviewResponse.data && reviewResponse.data.id) {
            reviewId = reviewResponse.data.id;
        } else {
            throw new Error('Review não foi criada corretamente');
        }
    } catch (error) {
        throw new Error('Falha ao criar a review: ' + (error.response ? error.response.data.message : error.message));
    }
});
Given('existe a review com título {string}, corpo {string} e classificação {int}', async function (titulo, corpo, classificacao) {
    try {
        const reviewResponse = await axios.post('http://localhost:5001/reviews/add', {
            title: titulo,
            body: corpo,
            classification: classificacao
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Resposta da criação da review:', reviewResponse.data);

        if (reviewResponse.data && reviewResponse.data.id) {
            reviewId = reviewResponse.data.id;
        } else {
            throw new Error('Review não foi criada corretamente');
        }
    } catch (error) {
        throw new Error('Falha ao criar a review: ' + (error.response ? error.response.data.message : error.message));
    }
});
Given('existe o comentário {string} do usuário {string} com senha {string}', async function (conteudo, email, senha) {
    try {
        console.log("Autenticando usuário:", email);
        const loginResponse = await axios.post('http://localhost:5001/users/login', {
            email: email,
            password: senha
        });

        const token = loginResponse.data.token;
        console.log("Token obtido:", token);

        console.log("Criando comentário...");
        console.log(reviewId)
        console.log(conteudo)
        const commentResponse = await axios.post('http://localhost:5001/comment/add', {
            body: conteudo,
            review: reviewId // Certifique-se de que reviewId está definido
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (commentResponse.data && commentResponse.data.id) {
            commentId = commentResponse.data.id;
        } else {
            throw new Error('Comentário não foi criado corretamente');
        }
        console.log("comentário salvo com ID:", commentId);
    } catch (error) {
        console.error("Erro ao criar/verificar comentário:", error.response?.data || error.message);
        throw new Error(`Erro ao criar/verificar comentário: ${error.message}`);
    }
});
When('uma requisição POST com um JSON com título {string}, corpo {string} e classificação {int} para a rota {string}', async function (titulo, corpo, classificacao, rota) {
    try {
        response = await axios.post(rota, {
            title: titulo,
            body: corpo,
            classification: classificacao
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        response = error.response;
    }
});
When('uma requisição POST com um JSON com corpo {string} e classificação {int} para a rota {string}', async function (corpo, classificacao, rota) {
    try {
        response = await axios.post(rota, {
            body: corpo,
            classification: classificacao
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        response = error.response;
    }
});
When('uma requisição POST com um JSON com conteúdo {string} para a rota {string}', async function (body, rota) {
    try {
        response = await axios.post(rota, {
            body: body, 
            review: reviewId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        response = error.response;
    }
});
When('uma requisição DELETE com um JSON com a review para a rota {string}', async function (rota) {
    try {
        response = await axios.delete(rota, {
            headers: { Authorization: `Bearer ${token}` },
            data: { id: reviewId } 
        });
    } catch (error) {
        response = error.response;
    }
});
When('uma requisição DELETE com um JSON com o comentário para a rota {string}', async function (rota) {
    console.log("ID do comentário a excluir:", commentId);
    try {
        console.log(token)
        response = await axios.delete(rota, {
            headers: { Authorization: `Bearer ${token}` },
            data: { id: commentId } 
        });
    } catch (error) {
        response = error.response;
    }
});
When('uma requisição PUT com um JSON com o corpo {string} para a rota {string}', async function (updates, rota) {
    try {
        response = await axios.put(rota, {
            id: reviewId, 
            uptades: updates
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        response = error.response;
    }
});
Then('o JSON da resposta contém {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});
Then('o status da resposta é {string}', function (expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});
//Feature: Realizar cadastro

Given('o usuário quer realizar um cadastro no sistema', function () {
    
});

When('uma requisição POST com um JSON com name {string}, email {string}, password {string} de corpo for enviada para route {string}', async function (name, email, password, route) {
    try {
        response = await axios.post(route, {
            name,
            email,
            password
        });
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta deve ser {string}', function (expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve conter {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});

