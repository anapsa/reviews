import List from "../models/List";

class ListRepository {
    static async create(data: any) {
        return await List.create(data);
    }

    static async findById(id: string) {
        return await List.findOne({ id });
    }

    static async getAll() {
        return await List.find();
    }

    static async delete(id: string) {
        return await List.findOneAndDelete({ id });
    }

    static async addMember(id: string, memberData: any) {
        return await List.findOneAndUpdate(
            { id },
            { $push: { members: memberData } },
            { new: true }
        );
    }

    static async update(id: string, updateData: any) {
        return await List.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
    }
}

export default ListRepository;
