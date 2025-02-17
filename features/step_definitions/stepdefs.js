<<<<<<< HEAD
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
=======
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
            response = await axios.post("http://localhost:5001/movies/add", movie);
        } catch(error){
            response = error.response;
        }
    
        if(response.status.toString() === "400"){
            try{
                response = await axios.put("http://localhost:5001/movies/update", movie);
            } catch(error){
                response = error.response;
            }
            let statusResponse = response.status.toString();
            assert.strictEqual(statusResponse,"201", "Filme não foi cadastrado corretamente");
        }
        else{
            let statusResponse = response.status.toString();
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

  When('uma requisição DELETE é enviada para o filme de nome {string} para a route {string}', async function (name,route) {
    try{
        response = await axios.delete(route, {
            data: {name: name}
        });
    } catch (error){
        response = error.response;
    }
  });

When('uma requisição de modificação POST é enviada para o filme de nome {string}, gênero {string}, classificação indicativa {string}, capa {string}, título {string} para a route {string}', 
    async function (name, genre, rating, coverURL, title, route) {
        try{
            response = await axios.put(route, {
                name:name,
                genre: genre,
                rating: rating,
                cover:{
                    imageURL: coverURL,
                    title: title
                }
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
>>>>>>> crudMovie
});

Then('o status da resposta deve ser {string}', function (expectedStatus) {
    assert.strictEqual(response.status.toString(), expectedStatus);
});

Then('o JSON da resposta deve conter {string}', function (expectedMessage) {
    assert.strictEqual(response.data.message, expectedMessage);
<<<<<<< HEAD
});

=======
});
>>>>>>> crudMovie
