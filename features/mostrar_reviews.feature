Feature: Mostrar reviews
  As a usuário comum logado
  I want to visualizar as reviews de filmes 
  So that ver o que os outros usuários comentaram sobre os filmes 

Scenario: Usuário deseja visualizar todas as reviews do filme "Matrix"
  Given o usuário "Ekistoklecio" existe no sistema
  When é enviado ao sistema uma requisição GET para a rota "http://localhost:5001/movies/"
  And são buscadas as reviews do movie "Matrix"
  Then o status da answer deve ser "200"
  And o JSON da resposta deve ser conter "[{\"user\": \"IkruMelo\", \"review_title\": \"Excelente!!\", \"review\": \"Muito incrível.\", \"rate\": 10}]"


Scenario: Usuário deseja visualizar a review publicada pelo usuário "IkruMelo" do filme "Matrix"
  Given o usuário "Ekistoklecio" existe no sistema
  When é enviado ao sistema uma requisição GET para a rota "http://localhost:5001/movies/"
  And são buscadas as reviews do movie "Matrix"
  And é buscada a review publicada pelo usuário "IkruMelo"
  Then o status da answer deve ser "200"
  And o JSON da resposta deve ser "{\"user\": \"IkruMelo\", \"review_title\": \"Excelente!!\", \"review\": \"Muito incrível.\", \"rate\": 10}"