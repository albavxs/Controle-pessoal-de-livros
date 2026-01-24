const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./livros");

app.use(express.json());
app.use(cors());

// No Vercel, as funções na pasta /api já são mapeadas para /api
// Redirecionamos as rotas para o arquivo de livros
app.use("/livros", routes);

// Rota base para teste
app.get("/", (req, res) => {
    res.json({ status: "API Online", message: "Controle de Livros API" });
});

module.exports = app;
