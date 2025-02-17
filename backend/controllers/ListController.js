const ListRepository = require("../src/repositories/ListRepository");

class ListController {
    // Criar uma nova lista (watched ou abandoned)
    async createList(req, res) {
      const { type, members } = req.body;
      
      // Valida o tipo
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
  
      try {
        const list = await ListRepository.createList(type, members);
        res.status(201).json(list);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar lista', error: error.message });
      }
    }
  
    // Obter uma lista pelo tipo (watched ou abandoned)
    async getList(req, res) {
      const { type } = req.params;
      
      // Valida o tipo
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
  
      try {
        const list = await ListRepository.getListByType(type);
        if (list) {
          res.status(200).json(list);
        } else {
          res.status(404).json({ message: 'Lista não encontrada' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter lista', error: error.message });
      }
    }

    async getAllLists(req,res){
         try{
           const lists = await ListRepository.getAllLists();
           res.status(200).json(lists);
         }  catch(error){
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter todas as listas', error: error.message });
         }
    }
  
    // Adicionar um membro à lista (watched ou abandoned)
    async addMember(req, res) {
      const { type } = req.params;
      const member = req.body;
  
      // Valida o tipo
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
  
      try {
        const updatedList = await ListRepository.addMemberToList(type, member);
        if (updatedList) {
          res.status(200).json(updatedList);
        } else {
          res.status(404).json({ message: 'Lista não encontrada ou membro já cadastrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar membro', error: error.message });
      }
    }
  
    // Remover um membro da lista (watched ou abandoned)
    async removeMember(req, res) {
      const { type, memberName } = req.params;
  
      // Valida o tipo
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
  
      try {
        const updatedList = await ListRepository.removeMemberFromList(type, memberName);
        if (updatedList) {
          res.status(200).json(updatedList);
        } else {
          res.status(404).json({ message: 'Lista ou membro não encontrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover membro', error: error.message });
      }
    }

    async getMember(req, res){
  
        const {type, memberName} = req.params;
        
        if (!['watched', 'abandoned'].includes(type)) {
          return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
        }

        try{
           const selectedMember = await ListRepository.getListMember(type,memberName);
           if (selectedMember) {
            res.status(200).json(selectedMember);
          } else {
            res.status(404).json({ message: 'Membro não encontrado' });
          }
        } catch(error){
          console.error(error);
          res.status(500).json({ message: 'Erro ao obter membro', error: error.message });
        }

    }
  
    // Atualizar a lista de membros (watched ou abandoned)
    async updateListMember(req, res) {
      const { type, memberName } = req.params; // Obtém o tipo da lista e o ID do membro da URL
      const newMember = req.body; // Obtém o novo membro a partir do corpo da requisição
    
      // Valida o tipo da lista
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
    
      try {
        const updatedList = await ListRepository.updateListMember(type, memberName, newMember);
        if (updatedList) {
          res.status(200).json(updatedList); // Retorna a lista atualizada
        } else {
          res.status(404).json({ message: 'Membro ou lista não encontrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar membro', error: error.message });
      }
    }
    
    // Deletar a lista (watched ou abandoned)
    async deleteList(req, res) {
      const { type } = req.params;
  
      // Valida o tipo
      if (!['watched', 'abandoned'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de lista inválido. Use "watched" ou "abandoned".' });
      }
  
      try {
        const deletedList = await ListRepository.deleteList(type);
        if (deletedList) {
          res.status(200).json({ message: 'Lista deletada com sucesso' });
        } else {
          res.status(404).json({ message: 'Lista não encontrada' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar lista', error: error.message });
      }
    }
  }
  
  module.exports = new ListController();
  