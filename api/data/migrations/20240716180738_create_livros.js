exports.up = function (knex) {
  return knex.schema.createTable("livros", (table) => {
    table.increments();
    table.string("titulo", 80).notNullable();
    table.string("autor", 60).notNullable();
    table.integer("ano", 4).notNullable();
    table.decimal("preco", 9.2).notNullable();
    table.string("foto", 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("livros");
};
