const List = require("../../models/List"); 

class ListRepository {
  async createList(type, members = []) {
    const existingList = await List.findOne({ type });  
    if (existingList) {
      throw new Error("Uma lista desse tipo já existe"); 
    }
  
    const list = new List({
      name: type === 'watched' ? 'Watched Movies' : 'Abandoned Movies',
      type,
      members,
    });
    return await list.save();
  }
  

  async getListByType(type) {
    return await List.findOne({ type });
  }

  async getAllLists(){
    return await List.find();
  }

  async addMemberToList(type, member) {
    const list = await this.getListByType(type);
    if (list) {
      list.members.push(member);
      return await list.save();
    }
    return null;
  }


  async removeMemberFromList(type, memberId) {
    const list = await this.getListByType(type);
    if (list) {
      list.members = list.members.filter((member) => member.id !== memberId);
      return await list.save();
    }
    return null;
  }

  async getListMember(type, memberId) {
    const list = await this.getListByType(type);
    if (list) {
      const member = list.members.find(member => member.id === memberId); 
      return member || null; 
    }
    return null;
}

async updateListMember(type, memberId, newMember) {
  const list = await this.getListByType(type);
  if (list) {
    const memberIndex = list.members.findIndex(member => member.id === memberId);
    if (memberIndex !== -1) {
      list.members[memberIndex] = { ...list.members[memberIndex], ...newMember };
      await list.save();  
      return list;  
    }
  }
  return null;
}

  
  async deleteList(type) {
    return await List.findOneAndDelete({ type });
  }
}

module.exports = new ListRepository();
