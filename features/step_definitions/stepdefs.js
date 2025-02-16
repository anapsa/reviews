const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

let response;

Given('que o usuário {string} está autenticado no sistema', async function (email) {
    try {
        const loginResponse = await axios.post('http://localhost:5001/users/login', {
            email: email,
            password: '123456'
        });
        token = loginResponse.data.token;
    } catch (error) {
        throw new Error('Falha na autenticação');
    }
});

Given('que o usuário {string} não está autenticado no sistema', async function (email) {
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

When('uma requisição PUT com um JSON com corpo {string} para a rota {string}', async function (updates, rota) {
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