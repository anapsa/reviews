Feature: Criar Reviews
    As a usuário comum
    I want to criar publicações sobre reviews de filme 
    So that eu posso divulgar minha avaliação sobre o filme

Scenario: Criar uma review válida
    Given que o usuário com email "polita@email.com" e senha "12345678" está logado no sistema
    When ele navega para a tela "/pages/create_review"
    And insere o título "Melhor filme de comédia" no título
    And insere o conteúdo "gostei muito do filme" no corpo review
    And insere a classificação "3" estrelas
    And confirma o envio
    Then a mensagem "Review enviada com sucesso!" deve aparecer na página
    And ele está na tela "pages/initial_page"

Scenario: Criar uma review inválida
    Given que o usuário com email "polita@email.com" e senha "12345678" está logado no sistema
    When ele navega para a tela "/pages/create_review"
    And insere o conteúdo "gostei muito do filme" no corpo review
    And insere a classificação "3" estrelas
    And confirma o envio
    Then a mensagem "Por favor, digite o título review!" deve aparecer na página
    And ele está na tela "/pages/create_review"

Scenario: Criar uma review inválida
    Given que o usuário com email "polita@email.com" e senha "12345678" está logado no sistema
    And ele é proprietário da review 
    When ele navega para a tela dessa review
    And confirma "excluir"
    Then a mensagem "Review excluída com sucesso!" deve aparecer na página
    And ele está na tela "/pages/initial_page"