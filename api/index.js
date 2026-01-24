const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./livros");

app.use(express.json());
app.use(cors());

// No Vercel, as requisições para /api/livros serão direcionadas para cá
// O Express verá o caminho completo, então mantemos o prefixo /api
app.use("/api/livros", routes);

// Rota base para teste em /api
app.get("/api", (req, res) => {
    res.json({ status: "API Online", message: "Controle de Livros API" });
});

module.exports = app;
