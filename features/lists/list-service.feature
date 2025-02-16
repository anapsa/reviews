Feature: Listas de filmes/séries assistidos e abandonados

Scenario: usuário quer criar lista de assistidos
Given que um usuário cadastrado quer criar uma  lista de assistidos
When uma requisição POST com JSON com type "watched", members "[]" de corpo for enviada para a rota "http://localhost:5001/api/lists/watched" 
Then o status da resposta da requisição deve ser "201" 
And o JSON da resposta deve conter name "Watched Movies", type "watched" e members "[]"

Scenario: usuário quer cadastrar filme na lista de assistidos
Given que um usuário cadastrado quer cadastrar um filme na lista de assistidos
When uma requisição POST com JSON com name "Interestelar", gender "Sci-Fi", description "Filme incrível", userAvaliation "3" de corpo for enviada para a rota "http://localhost:5001/api/lists/watched/members"
Then o status da resposta deve ser "200"
And o JSON da resposta deve ser a lista atualizada com name "Watched Movies", type "watched" e members '[{"name": "Interestelar", "gender": "Sci-Fi", "description": "Filme incrível", "userAvaliation": 3}]'

Scenario: usuário quer cadastrar já cadastrado filme na lista de assistidos
Given que um usuário cadastrado quer cadastrar novamente na lista de assistidos
When uma requisição POST para cadastro com JSON com name "Interestelar", gender "Sci-Fi", description "Filme incrível", userAvaliation "5" de corpo for enviada para a rota "http://localhost:5001/api/lists/watched/members"
Then o status da resposta para adicionar deve ser "404"
And o JSON da resposta de cadastro deve possuir a mensagem afirmando "Lista não encontrada ou membro já cadastrado"

Scenario: usuário quer obter informações de filme na lista de assistidos
Given que um usuário cadastrado quer obter informações de um filme da lista de assistidos
When uma requisição GET for enviada para a rota "http://localhost:5001/api/lists/watched/members/Interestelar"
Then o status da resposta encontrada deve ser "200"
And o JSON da resposta deve ser o membro encontrada com name "Interestelar", gender "Sci-Fi", description "Filme incrível", userAvaliation "3"

Scenario: usuário quer obter toda a lista de assistidos
Given que um usuário cadastrado quer obter todas informações da lista de assistidos
When uma requisição GET for requisitada para a rota "http://localhost:5001/api/lists/watched"
Then o status da resposta requisitada deve ser "200"
And o JSON da resposta deve ser a lista completa com name "Watched Movies", type "watched" e members '[{"name": "Interestelar", "gender": "Sci-Fi", "description": "Filme incrível", "userAvaliation": 3}]'

Scenario: usuário quer atualizar membro da lista de assistidos
Given que um usuário cadastrado quer atualizar um filme da lista de assistidos
When uma requisição PUT com JSON com name "Interestelar", gender "Sci-Fi", description "Filme do ano", userAvaliation "8" de corpo for enviada para a rota "http://localhost:5001/api/lists/watched/members/Interestelar"
Then o status da resposta para atualização deve ser "200"
And o JSON da resposta deve ser a lista atualizada com name "Watched Movies", type "watched" e members '[{"name": "Interestelar", "gender": "Sci-Fi", "description": "Filme do ano", "userAvaliation": 8}]'

Scenario: usuário quer deletar filme na lista de assistidos
Given que um usuário cadastrado quer deletar um filme da lista de assistidos
When uma requisição DELETE for enviada para a rota "http://localhost:5001/api/lists/watched/members/Interestelar"
Then o status da resposta para deleção deve ser "200"
And o JSON da resposta deve ser a lista atualizada da deleção com name "Watched Movies", type "watched" e members "[]" obtida pela rota "http://localhost:5001/api/lists/watched" 

Scenario: usuário quer informações de um filme que não está cadastrado na lista de assistidos
Given que um usuário cadastrado quer ver informações de um filme da lista de assistidos
When uma requisição do tipo GET for enviada para a rota "http://localhost:5001/api/lists/watched/members/Crespúsculo"
Then o status da resposta obtida deve ser "404"
And o JSON da resposta deve possuir a mensagem "Membro não encontrado"

Scenario: usuário quer deleter um filme que não está cadastrado na lista de assistidos
Given que um usuário cadastrado deseja deletar um filme da lista de assistidos
When uma requisição DELETE for direcionada para a rota "http://localhost:5001/api/lists/watched/members/Crespúsculo"
Then o status obtido para deleção deve ser "404"
And o JSON da resposta deve possuir a mensagem afirmando "Lista ou membro não encontrado"