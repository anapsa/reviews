Feature: Listas de filmes/séries assistidos e abandonados

Scenario: usuário quer cadastrar membro na lista de assistidos  
Given que existe um usuário cadastrado com username "pvsc"  
When uma requisição "POST" for enviada para "/lists/watched/members"  
And o corpo da requisição contém os seguintes dados:  

| Campo          | Valor                                          |  
|---------------|----------------------------------------------|  
| id           | 1                                            |  
| name         | Interestelar                                 |  
| gender       | Sci-Fi                                       |  
| description  | Um épico espacial dirigido por Christopher Nolan. |  
| userAvaliation | 10                                          |  

Then o status da resposta deve ser "200"  
And o array "Watched Movies" deve conter os seguintes dados:  

| Campo  | Valor            |  
|--------|----------------|  
| name   | Watched Movies  |  
| type   | watched        |  

E a lista de membros deve conter:  

| id  | name         | gender | description                                      | userAvaliation |  
|----|-------------|--------|------------------------------------------------|--------------|  
| 1  | Interestelar | Sci-Fi | Um épico espacial dirigido por Christopher Nolan. | 10           |  


Scenario: usuário quer cadastrar membro na lista de abandonados  
Given que existe um usuário cadastrado com ID "1" e username "pvsc"  
When uma requisição "POST" for enviada para "/lists/abandoned/members"  
And o corpo da requisição contém os seguintes dados:  

| Campo          | Valor                                           |  
|---------------|-----------------------------------------------|  
| id           | 1                                             |  
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

| id  | name       | gender  | description                                       | userAvaliation |  
|----|-----------|--------|-------------------------------------------------|--------------|  
| 1  | Crepúsculo | Romance | Uma história de amor entre uma humana e um vampiro. | 3            | 


Scenario: usuário quer cadastrar membro na lista de abandonados 