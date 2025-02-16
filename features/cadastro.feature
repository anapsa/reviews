Feature: Realizar cadastro
    As a indivíduo
    I Want to cadastrar um usuário em Opinei
    So that eu posso acessar os serviços de Opinei

Scenario: Cadastro realizado com sucesso
    Given o usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "Dudu", email "dudu@email.com", password "dudu1234" de corpo for enviada para route "http://localhost:5001/users/add"
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter "Usuário criado com sucesso"

Scenario: Cadastro com email já cadastrado
    Given o usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "Danerd", email "dudu@email.com", password "dan12345" de corpo for enviada para route "http://localhost:5001/users/add"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter "Email já cadastrado"

Scenario: Cadastro com algum campo não preenchido
    Given o usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "Ruy", email "ruy@email.com", password "" de corpo for enviada para route "http://localhost:5001/users/add"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter "Preencha todos os campos"

Scenario: Cadastro com senha com menos de oito caracteres
    Given o usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "Edna", email "edna@email.com", password "edna123" de corpo for enviada para route "http://localhost:5001/users/add"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter "A senha deve ter pelo menos 8 caracteres"

Scenario: Cadastro com username já cadastrado
    Given o usuário quer realizar um cadastro no sistema
    When uma requisição POST com um JSON com name "Dudu", email "edu@email.com", password "ISMeuAmor" de corpo for enviada para route "http://localhost:5001/users/add"
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter "Username já cadastrado"
