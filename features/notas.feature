Feature: notas

  Scenario: Adicionar uma nota
    Given as seguintes notas do usuario "joão" existem:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  2 | O Poderoso Chefão      | uma obra de primeira qualidade |
      |  3 | O Cavaleiro das Trevas | um ótimo filme                 |
    When adiciono uma nova nota para o title "A Origem", com o seguinte texto "muito complexo"
    Then as seguintes notas devem existir:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  2 | O Poderoso Chefão      | uma obra de primeira qualidade |
      |  3 | O Cavaleiro das Trevas | um ótimo filme                 |
      |  4 | A Origem               | muito complexo                 |

  Scenario: Editar uma notas existente:
    Given as seguintes notas do usuario "joão" existem:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  2 | O Poderoso Chefão      | uma obra de primeira qualidade |
      |  3 | O Cavaleiro das Trevas | um ótimo filme                 |
    When edito a nota do title "O Cavaleiro das Trevas" para "Meu favorito"
    Then as seguintes notas devem existir:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  2 | O Poderoso Chefão      | uma obra de primeira qualidade |
      |  3 | O Cavaleiro das Trevas | Meu favorito                 |

  Scenario: Remover uma nota existente:
    Given as seguintes notas do usuario "joão" existem:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  2 | O Poderoso Chefão      | uma obra de primeira qualidade |
      |  3 | O Cavaleiro das Trevas | um ótimo filme                 |
    When remover a nota do title "O Poderoso Chefão"
    Then as seguintes notas devem existir:
      | id | title                  | note                           |
      |  1 | Um Sonho de Liberdade  | muito emocionantes             |
      |  3 | O Cavaleiro das Trevas | um ótimo filme                 |
