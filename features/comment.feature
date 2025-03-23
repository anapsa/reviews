Feature: Comentar em um post
    As a usuário comum
    I want to comentar em um post já existente
    So that eu posso colocar minhas impressões sobre as reviews feitas por outros usuários 

Scenario: Criar um comentário 
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema
    And existe a review com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    When uma requisição POST com um JSON com conteúdo "gostei muito da sua review" para a rota "http://localhost:5001/comment/add"
    Then o JSON da resposta contém "Comentário criado com sucesso"
    And o status da resposta é "201"

Scenario: Excluir um comentário sendo proprietário da review
    Given que o usuário "ana@email.com" com senha "123456" está autenticado no sistema
    And o usuário "ana@email.com" é proprietário da review com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    And existe o comentário "não gostei da sua review" do usuário "dos3@cin.ufpe.br" com senha "12345678"
    When uma requisição DELETE com um JSON com o comentário para a rota "http://localhost:5001/comment/delete"
    Then o JSON da resposta contém "Comentário excluído com sucesso"
    And o status da resposta é "201"

Scenario: Excluir um comentário sendo proprietário do comentário
    Given que o usuário "dos3@cin.ufpe.br" com senha "12345678" está autenticado no sistema
    And existe a review do usuário "ana@email.com" com senha "123456" com título "Título da Review", corpo "Conteúdo da Review", classificação 5 e conteúdo "67ad7e98d4b8624b167ce4a1"
    And existe o comentário "não gostei da sua review" do usuário "dos3@cin.ufpe.br" com senha "12345678"
    When uma requisição DELETE com um JSON com o comentário para a rota "http://localhost:5001/comment/delete"
    Then o JSON da resposta contém "Comentário excluído com sucesso"
    And o status da resposta é "201"