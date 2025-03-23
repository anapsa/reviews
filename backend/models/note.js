const mongoose = require("mongoose");

// Estabelece as informações que cada usuário precisa ter para ser registrado
const NoteSchema = new mongoose.Schema({
    id: { type: String, ref: 'User', required: true },
    notes: [{
        title: { type: String, required: true },
        note: { type: String, required: true },
    }]

}, { timestamps: true });

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
module.exports = Note;