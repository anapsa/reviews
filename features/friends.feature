Feature: Friends

Scenario: Usuário encontrado com sucesso
    Given que existe um usuário com username "Luan_Thiers"
    When o usuário pesquisa por "Quinhas_Ab" na barra de pesquisa
    Then o sistema deve retornar o perfil do usuário "Quinhas_Ab"
    And o sistema deve retornar o status "200"

Scenario: Usuário não foi encontrado
    Given que existe um usuário com username "Luan_Thiers"
    When o usuário pesquisa por "Ikru_21" na barra de pesquisa
    Then o sistema deve retornar o status "404"

Scenario: Adicionando um usuário como amigo
    Given que existe um usuário com username "Luan_Thiers"
    When o usuário executa a ação de "Seguir" no perfil do usuário "Quinhas_Ab"    
    Then a lista de "followers" do usuário "Quinhas_Ab" deve ser atualizada para:
        | Luan_Thiers | 
    And a lista de "following" do usuário "Luan_Thiers" deve ser atualizada para:
        | iams |
        | Breno |
        | Quinhas_Ab |
        | ana | 
    And o sistema deve retornar o status "200"

Scenario: Visualizando a lista de usuários seguidos
    Given que existe um usuário com username "Luan_Thiers"
    When o usuário executa a ação de "Visualizar Seguindo" no perfil do usuário "Luan_Thiers"
    Then o sistema deve retornar a seguinte lista de "Usuários Seguidos":
        | iams   |
        | Breno  |
        | Quinhas_Ab |
        | ana |
    And o sistema deve retornar o status "200"


Scenario: Visualizando a lista de seguidores
    Given que existe um usuário com username "Luan_Thiers"
    When o usuário executa a ação de "Visualizar Seguidores" no perfil do usuário "Luan_Thiers"
    Then o sistema deve retornar a seguinte lista de "Seguidores":
        | Breno   |
        | Quinhas_Ab  |
    And o sistema deve retornar o status "200"

