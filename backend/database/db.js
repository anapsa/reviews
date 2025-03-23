// Estabelecendo conexão com o banco de dados através do MONGO_URI no arquivo .env, que contem o url do banco.
// habilitando variavel de ambiete DEV = true para rodar mongo em memoria
// Carrega variáveis de ambiente
require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

//process.env.MONGOMS_DEBUG = "1"; para debug
let mongoServer;

const connectDB = async () => {
  try {
    // Verifica se estamos usando o banco em memória
    const useInMemoryDB = process.env.DEV === 'true';

    if (useInMemoryDB) {
      // Inicia o MongoDB em memória
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Conectado ao MongoDB em memória.');
    } else {
      // Conecta ao MongoDB real (local ou remoto)
      const uri = process.env.MONGO_URI;
      await mongoose.connect(uri);
      console.log('Conectado ao MongoDB.');
    }
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
      console.log('MongoDB em memória desconectado.');
    } else {
      console.log('MongoDB real desconectado.');
    }
  } catch (error) {
    console.error('Erro ao desconectar do MongoDB:', error);
  }
};

module.exports = { connectDB, disconnectDB };
