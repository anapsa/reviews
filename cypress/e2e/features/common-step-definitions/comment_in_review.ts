import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário com email {string} e senha {string} está logado no sistema", (email, senha) => {
  cy.visit("http://localhost:3000/pages/cadastro");
  cy.get('[data-testid="login-button"]').click();
  cy.get('#content.move-to-left').should('be.visible');
  cy.get("#e-mail").type(`${email}`);
  cy.get("#password").type(`${senha}`);
  
  cy.get('#ent').should('not.be.disabled');

  cy.get("#ent").click();
  cy.url().should("include", "/pages/initial_page");
  cy.window().its('localStorage.userToken').should('exist');
  
});
Given('que o usuário {string} está na página da review {string}', (email, reviewId) => {
  cy.visit(`http://localhost:3000/pages/review_detail/${reviewId}`);
  console.log(`http://localhost:3000/pages/review_detail/${reviewId}`);
  cy.get('[data-testid="comment-button"]').should('be.visible');
});


Given('ele é proprietário da review', () => {
  cy.intercept('POST', 'http://localhost:5001/reviews/add').as('createReview');
  cy.visit("http://localhost:3000/pages/create_review");
  cy.get('[data-testid="title-textarea"]').type("Lugia é o melhor"); 
  cy.get('[data-testid="body-textarea"]').type("o melhor filme de todos os tempos"); 
  cy.get(`[data-testid="star-5"]`).click();
  cy.get('[data-testid="confirm"]').click(); 
  cy.wait('@createReview').then((interception) => {
    const reviewId = interception.response.body.id;
    Cypress.env('reviewId', reviewId);
  });
});

Then('a mensagem {string} deve aparecer na página', (message) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);
  });
});

Then('ele está na tela {string}', (page) => {
  cy.url().should('include', `${page}`);
});

When("ele navega para a tela {string}", (path) => {
  cy.visit(`http://localhost:3000/${path}`);
  console.log(`http://localhost:3000/${path}`);
  cy.get('[data-testid="confirm"]').should('be.visible');
});

When("ele navega para a tela dessa review", () => {
  const reviewId = Cypress.env('reviewId');
  cy.visit(`/pages/review_detail/${reviewId}`);
});

When("insere o título {string} no título", (title) => {
  cy.get('[data-testid="title-textarea"]').type(`${title}`); 
});

When("insere o conteúdo {string} no corpo review", (body) => {
  cy.get('[data-testid="body-textarea"]').type(`${body}`); 
});

When("insere a classificação {string} estrelas", (classification) => {
  cy.get(`[data-testid="star-${classification}"]`).click();
});

When("confirma {string}", (type) => {
  cy.get(`[data-testid="excluir"]`).click();
});

When("seleciona para comentar", () => {
  cy.get('[data-testid="comment-button"]').click();
  cy.get('[data-testid="comment-textarea"]').should('be.visible');
});

When("insere o comentário {string} no campo de comentários", (comentario) => {
  cy.get('[data-testid="comment-textarea"]').type(`${comentario}`); 
});

When("confirma o envio", () => {
  cy.get('[data-testid="confirm"]').click(); 
});
Then('a mensagem {string} deve aparecer na página', (message) => {
  
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);
  });
  
  
});

Given('que o indivíduo está na página de cadastro e que o username {string} já está cadastrado no banco de dados', (username) => {
  cy.visit("http://localhost:3000/pages/cadastro");

  cy.request({
    method: 'GET',
    url: `http://localhost:5001/users/find/${username}`,
    failOnStatusCode: false, // Não falhará se o usuário não for encontrado
  }).then((response) => {
    expect(response.status).to.eq(200); // Verifica se o usuário está cadastrado
  });
});



//Feature: Realizar Cadastro
Given('que o indivíduo está na página de cadastro e que o email {string} já está cadastrado no banco de dados', (email) => {
  cy.visit("http://localhost:3000/pages/cadastro");

  cy.request({
    method: 'GET',
    url: `http://localhost:5001/users/find_email/${email}`,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Given('que o indivíduo está na página de cadastro', () => {
  cy.visit("http://localhost:3000/pages/cadastro");
});

When('o indivíduo preenche o campo {string} com {string}', (campo, input) => {
  cy.get(`#${campo}`).type(`${input}`);
});

When('o indivíduo clica no botão {string}', (botao) => {
  cy.get(`#${botao}`).click();
});

Then('a borda do input {string} fica vermelha, aparece um ícone de erro no input {string} e aparece a seguinte mensagem na tela: {string}', (input1, input2, message) => {
  cy.get(`#${input1}`)
  .should('have.css', 'border-color', 'rgb(253, 8, 8)');
  cy.get(`#${input2}-incorrect`).should('be.visible');
  cy.get('#message')
    .should('be.visible')
    .and('contain', message);
});

Then('aparece a seguinte mensagem na cor verde na tela: {string}', (message) => {
  cy.get(`#message`)
  .should('have.css', 'color', 'rgb(0, 128, 0)');
  cy.get('#message')
    .should('be.visible')
    .and('contain', message);
});

Then('o usuário é redirecionado para a tela inicial', () => {
  cy.url().should("include", "/pages/initial_page");
  cy.window().its('localStorage.userToken').should('exist');
});
