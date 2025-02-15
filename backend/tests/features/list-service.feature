Feature: Listas de filmes/séries assistidos e abandonados

Scenario: usuário quer criar lista de assistidos
Given que existe um usuário cadastrado com username "pvsc"
When uma requisição "POST" for enviada para "/lists/watched"
And o corpo da requisição contém os seguintes dados:  
| Campo         | Valor  |  
|---------------|--------|
| type          | Watched
| members       | []     |
Then o status da resposta deve ser "200" 
And o corpo da a lista de assistidos deve conter os seguintes dados:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  
| members|      []          |

// se o type é "watched" o nome já é definido com "Watched Movies", o mesmo vale para caso seja "Abandoned", o qual será "Abandoned Movies"

Scenario: usuário quer criar lista de abandonados
Given que existe um usuário cadastrado com username "pvsc"
When uma requisição "POST" for enviada para "/lists/Abandoned"
And o corpo da requisição contém os seguintes dados:  
| Campo         | Valor  |  
|---------------|--------|
| type          |Abandoned |
| members       | []     |
Then o status da resposta deve ser "200" 
And o corpo da a lista de assistidos deve conter os seguintes dados:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Abandoned Movies |  
| type   | Abandoned        |  
| members|      []          |

Scenario: usuário quer cadastrar membro na lista de assistidos  
Given que existe um usuário cadastrado com username "pvsc"  
When uma requisição "POST" for enviada para "/lists/watched/members"  
And o corpo da requisição contém os seguintes dados:  

| Campo          | Valor                                          |  
|---------------|----------------------------------------------| 
| name         | Interestelar                                 |  
| gender       | Sci-Fi                                       |  
| description  | Um épico espacial dirigido por Christopher Nolan. |  
| userAvaliation | 10                                          |  

Then o status da resposta deve ser "200"  
And o array "Watched Movies" deve conter os seguintes dados:  

| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  

E a lista de membros deve conter:  
| name         | gender | description                                      | userAvaliation |  
|-------------|--------|------------------------------------------------|--------------|  
| Interestelar | Sci-Fi | Um épico espacial dirigido por Christopher Nolan. | 10           |  


Scenario: usuário quer cadastrar membro na lista de abandonados  
Given que existe um usuário cadastrado com ID "1" e username "pvsc"  
When uma requisição "POST" for enviada para "/lists/abandoned/members"  
And o corpo da requisição contém os seguintes dados:  

| Campo          | Valor                                           |  
|---------------|-----------------------------------------------|   
| name         | Crepúsculo                                    |  
| gender       | Romance                                      |  
| description  | Uma história de amor entre uma humana e um vampiro. |  
| userAvaliation | 3                                           |  

Then o status da resposta deve ser "200"  
And o array "Abandoned Movies" deve conter os seguintes dados:  

| Campo  | Valor            |  
|--------|----------------|  
| name   | Abandoned Movies  |  
| type   | abandoned        |  

E a lista de membros deve conter:  

| name       | gender  | description                                       | userAvaliation |  
|-----------|--------|------------------------------------------------- ---|----------------|  
| Crepúsculo | Romance | Uma história de amor entre uma humana e um vampiro|      3         | 


Scenario: usuário quer atualizar membro na lista de assistidos 
Given que existe um usuário cadastrado com username "pvsc"  
And o usuário "pvsc" assistiu o filme "Interestelar" que está na lista de assistidos com os seguintes campos:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  
|members | [{name:Interestelar, genre: Sci-Fi, description: Um épico espacial dirigido por Christopher Nolan., userAvaliation:10}] 
When uma requisição "PUT" for enviada para "/lists/watched/members/Interestelar"  
And o corpo da requisição contém os seguintes dados:  
| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  
|members | [{name:Interestelar, genre: Sci-Fi, description: Um épico espacial dirigido por Christopher Nolan., userAvaliation:9}]


Scenario: usuário quer Obter Informações de um filme cadastrado na lista de abandonados
Given que existe um usuário cadastrado com username "pvsc"  
When uma requisição "GET" for enviada para "/lists/watched/members/Interestelar"
Then o status da resposta deve ser "200"  
And deve retornar o membro com a seguintes Informações:
| name         | gender | description                                     | userAvaliation |  
|--------------|--------|------------------------------------------------ |----------------|  
| Interestelar | Sci-Fi | Um épico espacial dirigido por Christopher Nolan.| 10           |  

Scenario: usuário quer Obter Informações de um filme cadastrado na lista de abandonados
Given que existe um usuário cadastrado com username "pvsc"  
When uma requisição "GET" for enviada para "/lists/watched/members/Crepúsculo"
Then o status da resposta deve ser "200"  
And deve retornar o membro com a seguintes Informações:
| name       | gender  | description                                       | userAvaliation |  
|------------|---------|---------------------------------------------------|--------------|  
| Crepúsculo | Romance | Uma história de amor entre uma humana e um vampiro. | 3            | 


Scenario: usuário quer Obter remover um filme cadastrado na lista de assistidos
Given que existe um usuário cadastrado com username "pvsc"  
And o usuário "pvsc" assistiu o filme "Interestelar" que está na lista de assistidos com os seguintes campos:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  
|members | [{name:Interestelar, genre: Sci-Fi, description: Um épico espacial dirigido por Christopher Nolan., userAvaliation:10}] 
When uma requisição "DELETE" for enviada para "/lists/watched/members/Interestelar"
Then o status da resposta deve ser "200"  
And o corpo da a lista de assistidos deve conter os seguintes dados:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Watched Movies   |  
| type   | watched          |  
| members|      []          |

Scenario: usuário quer Obter remover um filme cadastrado na lista de abandonados
Given que existe um usuário cadastrado com username "pvsc"  
And o usuário "pvsc" assistiu o filme "Crepúsculo" que está na lista de abandonados com os seguintes campos:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Abandoned Movies   |  
| type   | Abandoned          |  
|members | [{name:Crepúsculo, genre: Romance, description: Uma história de amor entre uma humana e um vampiro., userAvaliation:3}] 
When uma requisição "DELETE" for enviada para "/lists/abandoned/members/Crepúsculo"
Then o status da resposta deve ser "200"  
And o corpo da a lista de assistidos deve conter os seguintes dados:
| Campo  | Valor            |  
|--------|------------------|  
| name   | Abandoned Movies   |  
| type   | Abandoned          |  
| members|      []            |