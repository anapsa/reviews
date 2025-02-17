require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const userRoutes = require("./routes/userRoutes");
<<<<<<< HEAD
const listRoutes = require('./routes/listRoutes');
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
const commentRoutes = require("./routes/commentRoutes");
=======
const movieRoutes = require("./routes/movieRoutes")
>>>>>>> crudMovie

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors())
app.use(express.json());

// Rota para efetuar procedimentos com os usuários do banco
app.use("/users", userRoutes);
<<<<<<< HEAD
app.use("/api",listRoutes)
app.use("/reviews", reviewRoutes);
app.use("/comment", commentRoutes)
=======
//Rota para efetuar procedimentos com os filmes do banco
app.use("/movies", movieRoutes)
>>>>>>> crudMovie
// Inicia o servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
