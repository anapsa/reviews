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

Then('o JSON da resposta contém {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});
Then('o status da resposta é {string}', function (expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});