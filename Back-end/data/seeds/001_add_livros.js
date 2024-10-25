exports.seed = function (knex) {
  return knex("livros")
    .del()
    .then(function () {
      return knex("livros").insert([
        {
          titulo: "Web Design Responsivo",
          autor: "Maurício Samy Silva",
          ano: 2014,
          preco: 73.0,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg",
        },
        {
          titulo: "Proteção Moderna de Dados",
          autor: "W. Curtis Preston",
          ano: 2021,
          preco: 97.0,
          foto: "https://s3.novatec.com.br/capas/9786586057843.jpg",
        },
        {
          titulo: "SQL em 10 Minutos por Dia",
          autor: "Ben Forta",
          ano: 2021,
          preco: 79.0,
          foto: "https://s3.novatec.com.br/capas/9786586057447.jpg",
        },
        {
          titulo: "CSS Grid Layout",
          autor: "Maurício Samy Silva",
          ano: 2017,
          preco: 45.0,
          foto: "https://s3.novatec.com.br/capas/9788575226322.jpg",
        },
        {
          titulo: "Python para análise de dados",
          autor: "Wes McKinney",
          ano: 2018,
          preco: 132.0,
          foto: "https://s3.novatec.com.br/capas/9788575226476.jpg",
        },
      ]);
    });
};
