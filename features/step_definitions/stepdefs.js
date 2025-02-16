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