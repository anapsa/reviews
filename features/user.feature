Feature: User Operations

    Scenario: Usuário quer atualizar alguma informação do cadastro
    Given que existe um usuário com username "Quinhas_Ab"
    When uma requisição PUT com um JSON com o campo "email" com o valor "quinhasbc@hotmail.com" ocorre para o perfil do usuário "Quinhas_Ab"
    Then o campo "email" do perfil do usuário "Quinhas_Ab" deve ter o valor "quinhasbc@hotmail.com" 
    And o sistema deve retornar o status "200"
    
    Scenario: Usuário quer deletar a sua conta
    Given que existe um usuário com username "quinhas"
    When uma requisição DELETE ocorre para o perfil do usuário "quinhas"
    Then o usuário "quinhas" não existe mais no sistema
    And o sistema deve retornar o status "200"

    



