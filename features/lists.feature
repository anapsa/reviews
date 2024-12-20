Feature: Listas de filmes/séries assistidos e abandonados
  As a usuário do Opinei
   I want to atualizar minhas listas de filmes assistidos e abandonados
  So that posso atualizar minhas programações

   Scenario:  usuário quer atualizar lista de filmes assistidos de um filme que não está na lista de assistidos
   Given  que o usuário "Pedro" está logado no sistema
   And está na página "Meus_filmes_assistidos"
   When seleciona a opção em "Adicionar_Filme"
   And aparecem os seguintes campos para preencher:
   | Nome do Filme            | Gênero  | Descrição                                                                        | Avaliação do usuário |                   
   | "A Lista de Schindler"   | "Drama" | "Um filme sobre um homem de negócios durante a Segunda Guerra Mundial"           | "Excelente Filme"    |
   And seleciona a opção "Concluir_Adicionar_Filme"
   Then uma mensagem de confirmação é mostrada para o usuário indicando "Filme_adicionado_com_sucesso"
   And o usuário é redirecionado para a página "Meus_filmes_assistidos"

    Scenario: usuário quer atualizar lista de filmes abandonados de um filme que não na lista de abandonados
    Given que o usuário "Pedro" está na tela de "Meus filmes abandonados"
    When clica em "Adicionar Filme"
    And aparece o seguintes campos para preencher:
         | Nome do Filme            | Gênero   |   | Descrição                        | Avaliação do usuário                     |  
         | "Vingadores Ultimato"    | "Ação"   |   | "A batalha final dos Vingadores" | "Parei na metade do filme, muito bom"    |
    And clica em "Concluir Adicionar Filme"
    Then uma mensagem de confirmação é mostrada para o usuário afirmando "Filme adicionado com sucesso"
    And clica em “Voltar para lista de abandonados”
    And o usuário é redirecionado para tela de "Meus filmes abandonados"

   Scenario: usuário quer ver detalhes de um filme cadastrado
     Given que o usuário "Pedro" está logado no sistema 
     And está na página "Meus filmes assistidos"
     When seleciona a opção "Buscar Filme"
     And aparece o seguinte campo para preencher:
         | Nome do Filme           |   
         | "A Lista de Schindler"  |
     And seleciona a opção "Confirmar"
     Then aparece uma mensagem afirmando "Filme encontrado"
     And o usuário é redirecionado para tela de "Informações do filme"

     Scenario: usuário quer remover filme da lista de filmes abandonados que já está na lista
     Given que o usuário "Pedro" está logado no sistema
     And está na tela de "Meus filmes abandonados"
     When o usuário "Pedro" seleciona o filme "Interestelar"
     And seleciona "Remover Filme"
     Then uma mensagem de confirmação é mostrada para o usuario afirmando "Filme removido com sucesso"
     And o usuário é redirecionado para tela de "Meus filmes abandonados"

     Scenario: usuário quer encontrar filme da lista de filmes assistidos que não está cadastrado
     Given que o usuário "Pedro" está logado no sistema e está na tela "Meus_filmes_assistidos"
     When seleciona a opção em "Buscar_Filme"
     And aparece o seguinte campo para preencher:
         | Nome do Filme |
         | "O Rei Leão"  |
     And seleciona a opção em "Confirmar"
     Then aparece uma mensagem afirmando "Filme não encontrado na lista"
     And o usuário é redirecionado para tela de "Meus filmes assistidos"
