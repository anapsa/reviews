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
