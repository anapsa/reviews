
const Note = require("../models/note");
const User = require("../models/user");

const createNote = async (req, res) => {

  const { email, title, note } = req.body;

  if (!email || !title || !note) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const newNotes = {
    title: title,
    note: note
  }

  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.status(400).json({ message: "Email Invalido" });
  }

  if (note.length > 500) {
    return res.status(400).json({ message: "Notas devem ter o limite de 500 caracteres" });
  }

  const notesExists = await Note.findOne({ id: email });

  if (!notesExists) {
    const newNote = new Note({ id: email, notes: newNotes });
    await newNote.save();
    return res.status(201).json({ message: "Nota criado com sucesso" });
  } else {
    
    try {
      await Note.updateOne(
        { id: email },
        { $push: { notes: newNotes } }
      );
      return res.status(201).json({ message: "Nota criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar Nota", error });
    }
  }
};

const getNotes = async (req, res) => {

  const userExists = await User.findOne({ email: req.params.email });
  if (!userExists) {
    return res.status(400).json({ message: "Email Invalido" });
  }
  try {
    const result = await Note.findOne({ id: req.params.email });
    if (!result) {
      return res.status(404).json({ message: 'Notas não encontrado' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar Nota' });
  }
};

const findNote = async (req, res) => {

  const { email, title } = req.body;

  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.status(400).json({ message: "Email Invalido" });
  }
 
  try {
    const result = await Note.findOne(
      { id: email, notes: { $elemMatch: { title: title } } }, // Filtro combinado
      { "notes.$": 1 } // Retorna apenas a nota correspondente ao título
    );
    if (!result) {
      return res.status(404).json({ message: 'Nota não encontrado' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar Nota' });
  }
};

const deleteNote = async (req, res) => {
  const { email, title } = req.body;
 
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.status(400).json({ message: "Email Invalido" });
  }
  try {
    const result = await Note.findOne({ id: email });
    if (result) {
      await Note.updateOne(
        { id: email },
        {
          $pull: { notes: { title: title } }
        });
      return res.status(200).json({ message: "nota deletada com sucesso" });
    } else {
      return res.status(400).json({ message: "nota não existe" });
    }
  } catch (error) {
    console.error("Erro ao deletar Nota:", error);
    return res.status(500).json({ message: "Erro ao deletar Nota", error });
  }
};

const updateNote = async (req, res) => {

  const { email, title, note } = req.body;
  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.status(400).json({ message: "Email Invalido" });
  }
  try {
    const result = await Note.findOneAndUpdate(
      { id: email, "notes.title": title }, // Filtro: encontra o usuário e a nota com o título específico
      { $set: { "notes.$[elem].note": note } }, // Atualização: modifica os campos da nota
      {
        arrayFilters: [{ "elem.title": title }], // Condição para identificar a nota correta no array
        new: true // Retorna o documento atualizado
      }
    );
    if (!result) {
      return res.status(400).json({ message: "Nota não encontrado" });
    }
    return res.status(200).json({ message: "Nota atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar Nota:", error);
    return res.status(500).json({ message: "Erro ao atualizar Nota", error });
  }
};

module.exports = { createNote, getNotes, findNote, deleteNote, updateNote };