Cadastro de Conteúdo

Feature: Cadastro de Conteúdo
    As a usuário administrador
    I want to adicionar novos filmes e séries ao catálogo
    So that os demais usuários possam fazer reviews ligados a esses filmes ou séries

Scenario: Cadastrar novo filme
    Given que o usuário “Breno” está autenticado no sistema
    And “Breno” possui acesso a conta de administrador
    And está na página “Conteúdos”
    When o usuário “Breno” seleciona “Cadastrar novo conteúdo”
    And o usuário “Breno” adiciona o título “Meu Malvado Favorito 4”
    And seleciona a opção “Animação” para “Gênero” do filme 
    And seleciona a opção “Livre” para “Classificação Indicativa” do filme 
    And seleciona a opção “/capa.png” para “Capa” do filme
    And seleciona a opção “Finalizar cadastro”
    Then o usuário “Breno” continua na página “Conteúdos”
    And aparece o filme “Meu Malvado Favorito 4” entre os conteúdos disponíveis
    And o filme “Meu Malvado favorito 4” é propriamente salvo pelo sistema

 Scenario: Cadastrar filme já existente
    Given que o usuário “Breno” está autenticado no sistema
    And “Breno” possui acesso a conta de administrador
    And está na página “Conteúdos”
    And o filme “Vingadores: Ultimato” já está disponível no sistema
    When o usuário “Breno” seleciona “Cadastrar novo conteúdo”
    And o usuário “Breno” adiciona o título “Vingadores: Ultimato”
    And seleciona a opção “Finalizar cadastro”
    Then uma mensagem de erro é exibida indicando “Esse filme já existe!”

Scenario: Cadastrar filme com informações insuficientes
    Given que o usuário “Breno” está autenticado no sistema
    And “Breno” possui acesso a conta de administrador
    And está na página “Conteúdos”
    When o usuário “Breno” seleciona “Cadastrar novo conteúdo”
    And o usuário “Breno” adiciona o título “About Time”
    And seleciona a opção “Romance” para “Gênero” do filme 
    And seleciona a opção “12” para “Classificação Indicativa” do filme
    And seleciona a opção “Finalizar cadastro”
    Then uma mensagem de erro é exibida indicando “Informações insuficientes de cadastro :(”