Feature: Criar Posts
    As a usuário comum
    I want to criar publicações sobre reviews de filme 
    So that eu posso divulgar minha avaliação sobre o filme

Scenario: Criar um post válido
    Given que o usuário "Lucas" está autenticado
    When ele navega para a tela de "criação de post"
    And escolhe o filme “Legalmente Loira”
    And insere o título “Melhor filme de comédia” no campo obrigatório
    And insere o conteúdo “gostei muito do filme” no post
    And insere a classificação "5" estrelas
    And confirma 
    Then o post do filme “Legalmente Loira” de título “Melhor filme de comédia” com conteúdo “gostei muito do filme” deve ser criado com sucesso
    And aparecer na tela de "timeline pública"

Scenario: Criar um post sem título
    Given que o usuário "Lucas" está autenticado
    When ele navega para a tela de "criação de post"
    And escolhe o filme “Legalmente Loira”
    And insere o conteúdo “gostei muito do filme” no post
    And insere a classificação "5" estrelas
    And tenta confirmar 
    Then uma mensagem é exibida indicando "o título do post não foi preenchido"
    And o usuário "Lucas" continua na tela de "criação de post"

Scenario: Excluir um post existente
    Given que o usuário "apsbpc" está autenticado 
    And o usuário é proprietário do post sobre o filme “Legalmente Loira”
    When o usuário “apsbpc” acessa o post sobre o filme “Legalmente Loira”
    And seleciona a opção “excluir post”
    And confirma 
    Then o post do usuário “apsbpc” sobre o filme “Legalmente Loira” é removido da tela de "timeline pública"

Scenario: Editar um post existente
    Given que o usuário "apsbpc" está autenticado 
    And o usuário é proprietário do post sobre o filme “Legalmente Loira”
    When o usuário “apsbpc” acessa o post sobre o filme “Legalmente Loira”
    And seleciona a opção “editar post”
    And modifica o título para “novo título” 
    And modifica o conteúdo para “novo conteúdo”
    And confirma 
    Then o post do usuário “apsbpc” sobre o filme “Legalmente Loira” é atualizado com as modificações

Scenario: Erro na edição de um post existente
    Given que o usuário "apsbpc" está autenticado 
    And o usuário "apsbpc" é proprietário do post sobre o filme “Legalmente Loira”
    And o usuário "apsbpc" está na página "edição de post" do post sobre o filme “Legalmente Loira”
    When o usuário “apsbpc” modifica o título para “” 
    And modifica o conteúdo para “novo conteúdo”
    And confirma 
    Then uma mensagem é exibida indicando "o título do post não foi preenchido"
    And o usuário "apsbpc" continua na página "edição de post"

Scenario: Curtir um post existente
    Given que o usuário "Lucas" está autenticado
    And existe o post do usuário “Luan” sobre o filme “Se7en” na timeline com “0” curtidas
    When o usuário “Lucas” seleciona a opção “curtir” no post do usuário “Luan” sobre o filme “Se7en” na tela de "timeline"
    Then o post do usuário “Luan” sobre o filme “Se7en” é atualizado com “1” curtidas

