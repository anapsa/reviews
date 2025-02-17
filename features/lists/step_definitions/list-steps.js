const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

let response;
let list;

Given('que um usuário cadastrado quer criar uma  lista de assistidos', function () {
    // Nenhuma ação necessária, apenas um passo descritivo
});

When('uma requisição POST com JSON com type {string}, members {string} de corpo for enviada para a rota {string}', async function (type, members,route) {
    try {
        response = await axios.post(route, {
            type,
            members: JSON.parse(members)
        });
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta da requisição deve ser {string}', function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve conter name {string}, type {string} e members {string}', async function(name,type,members){
    try {
        list = await axios.get(route, {
            name,
            type,
            members: JSON.parse(members)
        });
    } catch (error) {
        response = error.response;
    }
});

Given('que um usuário cadastrado quer cadastrar um filme na lista de assistidos', function(){

});

When('uma requisição POST com JSON com name {string}, gender {string}, description {string}, userAvaliation {string} de corpo for enviada para a rota {string}', async function (name, gender,description,userAvaliation ,route) {
    try {
        response = await axios.post(route, {
            name,
            gender,
            description,
            userAvaliation: parseInt(userAvaliation)
        });
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta deve ser {string}', function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve ser a lista atualizada com name {string}, type {string} e members {string}', 
    function (expectedName, expectedType, expectedMembers) {
        const responseData = response.data;

        // Converte a string de members para um array de objetos
        const expectedMembersArray = JSON.parse(expectedMembers);

        // Remove o _id de cada item de members (caso ele esteja presente)
        const actualMembersArray = responseData.members.map(({ _id, ...rest }) => rest);

        // Verifica o nome e o tipo
        assert.strictEqual(responseData.name, expectedName);
        assert.strictEqual(responseData.type, expectedType);

        // Verifica se os membros são iguais, comparando os conteúdos, sem o _id
        assert.deepStrictEqual(actualMembersArray, expectedMembersArray);
    });


Given('que um usuário cadastrado quer cadastrar novamente na lista de assistidos',function(){

});

When('uma requisição POST para cadastro com JSON com name {string}, gender {string}, description {string}, userAvaliation {string} de corpo for enviada para a rota {string}', async function (name, gender,description,userAvaliation ,route) {
    try {
        response = await axios.post(route, {
            name,
            gender,
            description,
            userAvaliation: parseInt(userAvaliation)
        });
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta para adicionar deve ser {string}', function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta de cadastro deve possuir a mensagem afirmando {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});

Given('que um usuário cadastrado quer obter informações de um filme da lista de assistidos',function(){

});

When('uma requisição GET for enviada para a rota {string}', async function(route){
    try {
        response = await axios.get(route);
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta encontrada deve ser {string}', function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve ser o membro encontrada com name {string}, gender {string}, description {string}, userAvaliation {string}',async function(name, gender,description,userAvaliation) {
    try {
        response = await axios.get(route, {
            name,
            gender,
            description,
            userAvaliation: parseInt(userAvaliation)
        });
    } catch (error) {
        response = error.response;
    }
});

Given('que um usuário cadastrado quer obter todas informações da lista de assistidos', function(){
     
});

When('uma requisição GET for requisitada para a rota {string}',async function (route) {
    try {
        response = await axios.get(route);
    } catch (error) {
        response = error.response;
    }
} );

Then('o status da resposta requisitada deve ser {string}',function(expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve ser a lista completa com name {string}, type {string} e members {string}', 
    function (expectedName, expectedType, expectedMembers) {
        const responseData = response.data;

        // Converte a string de members para um array de objetos
        const expectedMembersArray = JSON.parse(expectedMembers);

        // Remove o campo "_id" de cada objeto dentro de responseData.members
        const actualMembers = responseData.members.map(({ _id, ...rest }) => rest);

        // Verifica se os valores retornados batem com os esperados
        assert.strictEqual(responseData.name, expectedName);
        assert.strictEqual(responseData.type, expectedType);
        assert.deepStrictEqual(actualMembers, expectedMembersArray);
    }
);

Given('que um usuário cadastrado quer atualizar um filme da lista de assistidos', function(){

});

When('uma requisição PUT com JSON com name {string}, gender {string}, description {string}, userAvaliation {string} de corpo for enviada para a rota {string}', async function (name,gender,description,userAvaliation,route){
    try {
        response = await axios.put(route, {
            name,
            gender,
            description,
            userAvaliation: parseInt(userAvaliation)
        });
    } catch (error) {
        response = error.response;
    }
} );

Then('o status da resposta para atualização deve ser {string}',function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});


Then('o JSON da resposta deve a lista atualizada com name {string}, type {string} e members {string}', 
        async function (expectedName, expectedType, expectedMembers) {
            const responseData = response.data;
    
            // Converte a string de members para um array de objetos
            const expectedMembersArray = JSON.parse(expectedMembers);
    
            // Remove o _id de cada item de members (caso ele esteja presente)
            const actualMembersArray = responseData.members.map(({ _id, ...rest }) => rest);
    
            // Verifica o nome e o tipo
            assert.strictEqual(responseData.name, expectedName);
            assert.strictEqual(responseData.type, expectedType);
    
            // Verifica se os membros são iguais, comparando os conteúdos, sem o _id
            assert.deepStrictEqual(actualMembersArray, expectedMembersArray);
        });


Given('que um usuário cadastrado quer deletar um filme da lista de assistidos', function(){

});

When('uma requisição DELETE for enviada para a rota {string}',async function(route){
    try {
        response = await axios.delete(route);
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta para deleção deve ser {string}',function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve ser a lista atualizada da deleção com name {string}, type {string} e members {string} obtida pela rota {string}', async function (name,type,members,route) {
    try {
        response = await axios.get(route, {
            name,
            type,
            members: JSON.parse(members)
        });
    } catch (error) {
        response = error.response;
    }
});

Given('que um usuário cadastrado quer ver informações de um filme da lista de assistidos',function(){

});

When('uma requisição do tipo GET for enviada para a rota {string}', async function (route) {
    try {
        response = await axios.get(route);
    } catch (error) {
        response = error.response;
    }
});

Then('o status da resposta obtida deve ser {string}',function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve possuir a mensagem {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});

Given('que um usuário cadastrado deseja deletar um filme da lista de assistidos',function(){

});

When('uma requisição DELETE for direcionada para a rota {string}', async function (route) {
    try {
        response = await axios.delete(route);
    } catch (error) {
        response = error.response;
    }
});

Then('o status obtido para deleção deve ser {string}',function(expectedStatus){
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve possuir a mensagem afirmando {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});


