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
