
Feature: Conteudo

    Scenario: Exibir onde os filmes|séries estão disponíveis
        Given os seguintes filmes|séries existem:
            | Título                 | Nota | Ano  | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | link |
            | O Poderoso Chefão      | 8.1  | 1972 | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | link |
        When exibe a disponibilidade dos filmes|séries
        Then devo ver a seguinte disponibilidade:
            | Título                 | Nota | Ano  | Plataforma   | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | Netflix      | link |
            | O Poderoso Chefão      | 8.1  | 1972 | Amazon Prime | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | HBO Max      | link |

    Scenario: Adicionar um novo filme|série
        Given os seguintes filmes|séries existem:
            | Título                 | Nota | Ano  | Plataforma   | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | Netflix      | link |
            | O Poderoso Chefão      | 8.1  | 1972 | Amazon Prime | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | HBO Max      | link |
        When adiciono um novo filme|série com título "A Origem", ano "2010", nota "7.1", capa "link" e plataforma "Netflix"
        Then os seguintes filmes|séries devem existir:
            | Título                 | Nota | Ano  | Plataforma   | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | Netflix      | link |
            | O Poderoso Chefão      | 8.1  | 1972 | Amazon Prime | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | HBO Max      | link |
            | A Origem               | 7.1  | 2010 | Netflix      | link |

    Scenario: Editar um filme|série existente
        Given os seguintes filmes|séries existem:
            | Título                 | Nota | Ano  | Plataforma   | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | Netflix      | link |
            | O Poderoso Chefão      | 8.1  | 1972 | Amazon Prime | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | HBO Max      | link |
            | A Origem               | 7.1  | 2010 | Netflix      | link |
        When edito o filme|série com título "O Cavaleiro das Trevas" para ter a plataforma "Disney+"
        Then os seguintes filmes|séries devem existir:
            | Título                 | Nota | Ano  | Plataforma      | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | Netflix         | link |
            | O Poderoso Chefão      | 8.1  | 1972 | Amazon Prime    | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | HBO Max,Disney+ | link |
            | A Origem               | 7.1  | 2010 | Netflix         | link |

    Scenario: Remover um filme|série
        Given os seguintes filmes|séries existem:
            | Título                 | Nota | Ano  | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | link |
            | O Poderoso Chefão      | 8.1  | 1972 | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | link |
        When remover o filme|série com título "O Poderoso Chefão"
        Then os seguintes filmes|séries devem existir:
            | Título                 | Nota | Ano  | Capa |
            | Um Sonho de Liberdade  | 7.1  | 1994 | link |
            | O Cavaleiro das Trevas | 7.5  | 2008 | link |

    Scenario: Editar um review existente
        Given os seguintes reviews criadas pelo usuário existem:
            | Título                | Avaliação | Comentário               |
            | Um Sonho de Liberdade | 5         | Um filme extraordinário! |
            | O Poderoso Chefão     | 5         | extraordinário           |
        When editar o review de "Um Sonho de Liberdade" para ter avaliação "4" e comentário "Ótimo filme, mas um pouco longo."
        Then os seguintes reviews devem existir:
            | Título                | Avaliação | Comentário                       |
            | Um Sonho de Liberdade | 4         | Ótimo filme, mas um pouco longo. |
            | O Poderoso Chefão     | 5         | extraordinário                   |

    Scenario: Criar um novo review
        Given os seguintes filmes|séries existem:
            | Título                         | Ano  | Plataforma   |
            | Um Sonho de Liberdade          | 1994 | Netflix      |
            | O Poderoso Chefão              | 1972 | Amazon Prime |
            | Batman: O Cavaleiro das Trevas | 2008 | HBO Max      |
        When adicionar um novo review para "Um Sonho de Liberdade" com avaliação "5" e comentário "Um filme extraordinário!"
        Then os seguintes reviews devem existir:
            | Título                | Avaliação | Comentário               |
            | Um Sonho de Liberdade | 5         | Um filme extraordinário! |
            | O Poderoso Chefão     | 5         | extraordinário           |

    Scenario: Remover um review
        Given os seguintes reviews existem:
            | Título                | Avaliação | Comentário                       |
            | Um Sonho de Liberdade | 4         | Ótimo filme, mas um pouco longo. |
            | O Poderoso Chefão     | 5         | extraordinário                   |
        When remover o review "Um Sonho de Liberdade"
        Then os seguintes reviews devem existir:
            | Título            | Avaliação | Comentário     |
            | O Poderoso Chefão | 5         | extraordinário |
