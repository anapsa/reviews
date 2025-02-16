Feature: Criar Posts
    As a usuário comum
    I want to criar publicações sobre reviews de filme 
    So that eu posso divulgar minha avaliação sobre o filme

Scenario: Criar um post válido
    Given que o usuário "ana@email.com" está autenticado no sistema
    When uma requisição POST com um JSON com título "Melhor Filme do Mundo", corpo "Adorei o filme" e classificação 5 para a rota "http://localhost:5001/reviews/add"
    Then o JSON da resposta contém "Review criada com sucesso"
    And o status da resposta é "201"