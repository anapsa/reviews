const express = require('express');
const router = express.Router(); // Cria um roteador para gerenciar as rotas
const ListController = require('../controllers/ListController'); // Importa o ListController

// Rota para criar uma nova lista (watched ou abandoned)
router.post('/lists/:type', ListController.createList);

// Rota para obter uma lista pelo tipo (watched ou abandoned)
router.get('/lists/:type', ListController.getList);

// Rota para obter todas as listas do usuário 
router.get('/lists', ListController.getAllLists);

// Rota para obter um membro de uma lista pelo ID
router.get('/lists/:type/members/:memberName', ListController.getMember);

// Rota para adicionar um membro à lista (watched ou abandoned)
router.post('/lists/:type/members', ListController.addMember);

// Rota para remover um membro da lista (watched ou abandoned)
router.delete('/lists/:type/members/:memberName', ListController.removeMember);

// Rota para atualizar a lista de membros (watched ou abandoned)
router.put('/lists/:type/members/:memberName', ListController.updateListMember);

// Rota para deletar a lista (watched ou abandoned)
router.delete('/lists/:type', ListController.deleteList);

module.exports = router;
