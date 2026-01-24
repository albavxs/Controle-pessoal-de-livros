const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./livros");

app.use(express.json());
app.use(cors());

// No Vercel, as requisições para /api/livros são direcionadas para este arquivo.
// O Express recebe a requisição e precisa mapear a rota.
// Se o rewrite no vercel.json aponta para /api/index.js, o Express vê a rota original.
app.use("/api/livros", routes);

// Rota base para teste
app.get("/api", (req, res) => {
    res.json({ status: "API Online", message: "Controle de Livros API" });
});

module.exports = app;
