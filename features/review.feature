Feature: Criar Reviews
    As a usuário comum
    I want to criar publicações sobre reviews de filme 
    So that eu posso divulgar minha avaliação sobre o filme

Scenario: Criar uma review válido
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema
    When uma requisição POST com um JSON com título "Title", corpo "Adorei o filme" e classificação 5 para a rota "http://localhost:5001/reviews/add"
    Then o JSON da resposta contém "Review criada com sucesso"
    And o status da resposta é "201"

Scenario: Criar uma review não estando logado
    Given que o usuário "ana@email.com" com senha "123456" não está autenticado no sistema
    When uma requisição POST com um JSON com título "Melhor Filme do Mundo", corpo "Adorei o filme" e classificação 5 para a rota "http://localhost:5001/reviews/add"
    Then o JSON da resposta contém "Usuário não autenticado" 
    And o status da resposta é "401"

Scenario: Criar uma review sem título
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema
    When uma requisição POST com um JSON com corpo "Adorei o filme" e classificação 5 para a rota "http://localhost:5001/reviews/add"
    Then o JSON da resposta contém "Preencha todos os campos"
    And o status da resposta é "400"

Scenario: Deletar uma review
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema 
    And o usuário "ana@email.com" é proprietário da review com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    When uma requisição DELETE com um JSON com a review para a rota "http://localhost:5001/reviews/delete"
    Then o JSON da resposta contém "Review excluída com sucesso"
    And o status da resposta é "200"

Scenario: Editar uma review
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema 
    And o usuário "ana@email.com" é proprietário da review com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    When uma requisição PUT com um JSON com o corpo "Mudei minha review" para a rota "http://localhost:5001/reviews/edit"
    Then o JSON da resposta contém "Review editada com sucesso"
    And o status da resposta é "200"

Scenario: Curtir uma review
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema 
    And existe a review do usuário "dos3@cin.ufpe.br" com senha "12345678" com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    When uma requisição PUT com um JSON com a review para a rota "http://localhost:5001/reviews/like"
    Then o JSON da resposta contém "Review curtida com sucesso"
    And o status da resposta é "200"

