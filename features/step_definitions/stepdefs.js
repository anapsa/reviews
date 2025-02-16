const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

let response;

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

