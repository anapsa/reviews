const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');

const systemState = {
    user: {name: null, admin: null},
    page: null,
    searchResult: null
};

let response

Given('que o usuário {string} está autenticado no sistema', function (username) {
    systemState.user.name = username;
    assert.strictEqual(systemState.user.name, username, "Usuário incorreto");
  });

  Given('{string} possui acesso a conta de administrador', function (username) {
    assert.strictEqual(systemState.user.name, username, "Usuário incorreto");
    systemState.user.admin = true
    assert.strictEqual(systemState.user.admin, true, "Usuário sem acesso ao cadastro de filmes");
  });

  Given('o filme {string} já está disponível no sistema', async function (movie) {
    try{
        response = await axios.post("http://localhost:5001/movies/add", {
            name: movie,
            genre: "default",
            rating: "default",
            cover: {
                imageURL: "default",
                title: "default"
            }
        });
    } catch(error){
        response = error.response
    }
  
    possibleStatus = ["201","400"]
    let statusResponse = response.status.toString()
    
    assert.ok(possibleStatus.includes(statusResponse), "Filme não foi cadastrado corretamente")
    });

    Given('o filme {string} já está disponível no sistema com gênero {string}, classificação indicativa {string}, capa {string}, título {string}', async function (name, genre, rating, coverURL, title) {
        const movie = {
            name: name,
            genre: genre,
            rating: rating,
            cover: {
                imageURL: coverURL,
                title: title
            }
        };
        try{
            response = await axios.get("http://localhost:5001/movies/get", {data: {name: movie.name}});
        } catch(error){
            response = error.response;
        }
    
        if(response.status.toString() === "201"){
            try{
                response = await axios.put("http://localhost:5001/movies/update", movie);
            } catch(error){
                response = error.response;
            }
            let statusResponse = response.status.toString();
            assert.strictEqual(statusResponse,"201", "Filme não foi cadastrado corretamente");
        }
        else{
            try{
                response = await axios.post("http://localhost:5001/movies/add", movie);
            } catch(error){
                response = error.response;
            }
            let statusResponse = response.status.toString()
            assert.strictEqual(statusResponse,"201", "Filme não foi cadastrado corretamente");
        }
    });
    
    Given('o filme {string} não está disponível no sistema', async function (movie) {
        try{
            response = await axios.delete("http://localhost:5001/movies/delete", {
                data: { name: movie }
            });
        } catch(error){
            response = error.response
        }
        
        possibleStatus = ["200","400"]
        let statusResponse = response.status.toString()
        
        assert.ok(possibleStatus.includes(statusResponse), "Filme não foi cadastrado corretamente")
    });






  When('é enviado novo conteúdo com uma requisição POST com JSON nome {string}, gênero {string}, classificação indicativa {string}, capa {string}, título {string} para a route {string}', async function (name, genre, rating, coverURL, title, route) {
    try{
        response = await axios.post(route, {
            name: name,
            genre: genre,
            rating: rating,
            cover:{
                imageURL: coverURL,
                title: title
            }
        });
    } catch (error){
        response = error.response
    }
  });

  When('é enviada uma busca com uma requisição GET pelo filme de nome {string} para a route {string}', async function (name, route) {
    try{

        response = await axios.get(route, {
            data: {name: name}
        });
    } catch (error){
        response = error.response;
    }
  });






Then('o filme retornado deve ter nome {string}, gênero {string}, classificação indicativa {string}, capa {string}, título {string}', async function (name, genre, rating, coverURL, title){
    const expectedMovie = {
        name: name,
        genre: genre,
        rating: rating,
        cover: {
            imageURL: coverURL,
            title: title
        }
    };

    const jsonResponse = (({name,genre,rating,cover}) => ({name,genre,rating,cover}))(response.data.movie);

    assert.deepEqual(expectedMovie, jsonResponse, "O filme retornado não confere com o registrado");
});

Then('o status da resposta deve ser {string}', function (expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve conter {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
});