const mongoose = require("mongoose");
const User = require("./models/User");  // Supondo que o arquivo onde o modelo User está seja models/User.js

// Função para adicionar um seguidor
async function addFollower(userId, followerId) {
  try {
    // Encontra o usuário que vai ser seguido
    const user = await User.findById(userId);

    if (!user) {
      console.log("Usuário não encontrado");
      return;
    }

    // Verifica se o seguidor já está na lista de seguidores
    if (user.followers.includes(followerId)) {
      console.log("Este usuário já está na lista de seguidores.");
      return;
    }

    // Adiciona o novo seguidor ao array followers
    user.followers.push(followerId);

    // Salva as alterações no banco de dados
    await user.save();

    console.log("Seguidor adicionado com sucesso!");
  } catch (error) {
    console.error("Erro ao adicionar seguidor:", error);
  }
}

// Chamada de exemplo
addFollower("id_do_usuario", "id_do_novo_seguidor");