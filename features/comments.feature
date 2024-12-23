Feature: Comentar em um post
    As a usuário comum
    I want to comentar em um post já existente
    So that eu posso colocar minhas impressões sobre as reviews feitas por outros usuários

Scenario: Comentar em um post
    Given que o usuário "Lucas" está logado no sistema
    And existe o post do usuário “Luan” sobre o filme “Se7en” na página "timeline"
    When o usuário “Lucas” navega até o post do usuário “Luan” sobre o filme “Se7en” 
    And insere o comentário “discordo mano” no campo de comentários
    And confirma o envio
    Then o comentário “discordo mano” deve ser exibido publicamente no post

