Feature: Criar Reviews
    As a usuário comum
    I want to criar publicações sobre reviews de filme 
    So that eu posso divulgar minha avaliação sobre o filme

Scenario: Criar uma review válida
    Given que o usuário "polita@email.com" com a senha "12345678" está autenticado
    And escolheu o filme “Pokemon: The Movie 2000”
    When ele navega para a tela de "criação de post"
    And insere o título “Melhor filme de pokemon” no campo obrigatório
    And insere o conteúdo “Gostei muito do filme. Meu namorado me indicou” no post
    And insere a classificação "5" estrelas
    And confirma 
    Then o post do filme “Pokemon: The Movie 2000” de título “Melhor filme de pokemon" com conteúdo “Gostei muito do filme. Meu namorado me indicou” deve ser criado com sucesso
    And aparecer na tela de "timeline pública"