module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: require('path').resolve(__dirname, './data/editora.db3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
