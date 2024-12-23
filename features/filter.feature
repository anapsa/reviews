Categorizar/buscar posts por tópicos

 Scenario: Filtrar posts por gênero
    Given que o usuário “Polita” está autenticado no sistema
    And está na página “Fórum”
    When o usuário “Polita” filtra pela opção “Gênero” 
    And escolhe “Comédia”
    Then o usuário “Polita” é redirecionado para página “Resultados do Filtro”
    And são mostrados os posts em ordem cronológica “Não sei sei só sei que foi assim, Filme Sessão da Tarde”



