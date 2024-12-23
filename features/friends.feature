Scenario: Usuário encontrado com sucesso
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Menu”
 When  o usuário “Luan_Thiers” pesquisa por “Quinhas_Ab” na barra de pesquisa
 And seleciona “Pesquisar”
 Then o usuário “Luan_Thiers” é redirecionado para a página   “Resultado_da_Busca”
 And o perfil do usuário “Quinhas_Ab” é exibido no sistema

Scenario: Usuário não foi encontrado
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Menu”
 When ele pesquisa por “Ikru_21” na barra de pesquisa
 And seleciona “Pesquisar”
 Then o usuário “Luan_Thiers” é redirecionado para a página   “Resultado_da_Busca”
 And uma mensagem de erro é exibida indicando que “Nenhum usuário encontrado :(”

Scenario: Entrando no perfil do usuário buscado
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Resultado_da_Busca”
 And o perfil do usuário “Quinhas_Ab” está sendo exibido na página “Resultado_da_Busca”
 When o usuário “Luan_Thiers” seleciona o perfil do usuário “Quinhas_Ab”
 Then o usuário “Luan_Thiers” é redirecionado para a página   “Perfil_Quinhas_Ab”

Scenario: Adicionando um usuário como amigo
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Perfil_Quinhas_Ab”
 When o usuário “Luan_Thiers” seleciona a opção “Seguir”
 Then o usuário “Luan_Thiers” recebe uma mensagem de confirmação indicando “O usuário foi seguido com sucesso”
 And o usuário “Quinhas_Ab” recebe uma notificação indicando “O usuário Luan_Thiers lhe seguiu”

Scenario: Visualizando a lista de usuários seguidos
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Meu_Perfil”
 When o usuário “Luan_Thiers” seleciona a opção “Seguindo”
 Then o usuário “Luan_Thiers” ainda está na página “Meu_Perfil”
 And ele visualiza uma lista com todos os usuários que ele segue

Scenario: Visualizando a lista de seguidores
 Given que o usuário “Luan_Thiers” está logado no sistema
 And está na página “Meu_Perfil”
 When o usuário “Luan_Thiers” seleciona a opção “Seguidores”
 Then o usuário “Luan_Thiers” ainda está na página “Meu_Perfil”
 And ele visualiza uma lista com todos os seus seguidores

roteiro_atividade1
roteiro_atividade3
