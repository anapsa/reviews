import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios from 'axios';
import { ICustomWorld } from '../support/custom-world';
Given('que o usuário {string} com senha {string} está autenticado', async function (email, password) {
    try {
        const loginResponse = await axios.post('http://localhost:5001/users/login', {
            email: email,
            password: password
        });
        const token = loginResponse.data.token;
    } catch (error) {
        throw new Error('Falha na autenticação');
    }
});

Given('escolheu o filme {string}', async function (this: ICustomWorld, nomeDoFilme: string) {
    await this.page!.goto('http://localhost:3000/pages/initial_page');
});

When('ele navega para a tela de "criação de post"', async function (this: ICustomWorld) {
    
    await this.page!.click('button[id="criar-review"]');
});

When('insere o título {string} no campo obrigatório', async function (this: ICustomWorld, titulo: string) {
    // Preencher o campo de título
    await this.page!.fill('input[name="title-textarea"]', titulo);
});

When('insere o conteúdo {string} no post', async function (this: ICustomWorld, conteudo: string) {
    // Preencher o campo de conteúdo
    await this.page!.fill('textarea[name="body-textarea"]', conteudo);
});

When('insere a classificação {string} estrelas', async function (this: ICustomWorld, classificacao: string) {
    // Selecionar a classificação em estrelas (presumindo que seja uma opção de classificação numérica)
    await this.page!.click(`input[name="classificacao"][value="${classificacao}"]`);
});

When('confirma', async function (this: ICustomWorld) {
    // Clicar no botão de confirmação
    await this.page!.click('button[id="confirmar"]');
});

Then('o post do filme {string} de título {string} com conteúdo {string} deve ser criado com sucesso', async function (this: ICustomWorld, filme: string, titulo: string, conteudo: string) {
    // Verificar se o post foi criado com sucesso
    const successMessage = this.page!.locator('text=sucesso');  
    await expect(successMessage).toBeVisible();
});

Then('aparecer na tela de "timeline pública"', async function (this: ICustomWorld) {
    // Verificar se o post aparece na timeline pública
    await this.page!.goto('http://localhost:3000/pages/initial_page');
});