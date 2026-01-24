exports.seed = function (knex) {
  return knex("livros")
    .del()
    .then(function () {
      return knex("livros").insert([
        {
          titulo: "Web Design Responsivo",
          autor: "Maurício Samy Silva",
          ano: 2024,
          preco: 73.0,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        },
        {
          titulo: "Proteção Moderna de Dados",
          autor: "W. Curtis Preston",
          ano: 2021,
          preco: 97.0,
          foto: "https://s3.novatec.com.br/capas/9786586057843.jpg"
        },
        {
          titulo: "SQL em 10 Minutos por Dia",
          autor: "Ben Forta",
          ano: 2021,
          preco: 79.0,
          foto: "https://s3.novatec.com.br/capas/9786586057447.jpg"
        },
        {
          titulo: "CSS Grid Layout",
          autor: "Maurício Samy Silva",
          ano: 2017,
          preco: 45.0,
          foto: "https://s3.novatec.com.br/capas/9788575226322.jpg"
        },
        {
          titulo: "Python para análise de dados",
          autor: "Wes McKinney",
          ano: 2018,
          preco: 132.0,
          foto: "https://s3.novatec.com.br/capas/9788575226476.jpg"
        },
        {
          titulo: "React: Aprenda Praticando",
          autor: "Maurício Samy Silva",
          ano: 2021,
          preco: 89.0,
          foto: "https://s3.novatec.com.br/capas/9786586057638.jpg"
        },
        {
          titulo: "Docker: Guia Prático",
          autor: "Jeferson Fernando",
          ano: 2020,
          preco: 65.0,
          foto: "https://s3.novatec.com.br/capas/9788575226124.jpg"
        },
        {
          titulo: "JavaScript: O Guia Definitivo",
          autor: "David Flanagan",
          ano: 2021,
          preco: 150.0,
          foto: "https://s3.novatec.com.br/capas/9788575222485.jpg"
        },
        {
          titulo: "Node.js: Guia Prático",
          autor: "Caio Ribeiro Pereira",
          ano: 2019,
          preco: 55.0,
          foto: "https://s3.novatec.com.br/capas/9788575223710.jpg"
        },
        {
          titulo: "HTML5: A Linguagem de Marcação",
          autor: "Maurício Samy Silva",
          ano: 2020,
          preco: 48.0,
          foto: "https://s3.novatec.com.br/capas/9788575222447.jpg"
        }
      ]);
    });
};
