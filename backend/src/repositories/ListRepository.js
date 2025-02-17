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


  async removeMemberFromList(type, memberName) {
    const list = await this.getListByType(type);
    if (list) {
      list.members = list.members.filter((member) => member.name !== memberName);
      return await list.save();
    }
    return null;
  }

  async getListMember(type, memberName) {
    const list = await this.getListByType(type);
    if (list) {
      const member = list.members.find(member => member.name === memberName); 
      return member || null; 
    }
    return null;
}

async updateListMember(type, memberName, newMember) {
  const list = await this.getListByType(type);
  if (list) {
    const memberIndex = list.members.findIndex(member => member.name === memberName);
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
