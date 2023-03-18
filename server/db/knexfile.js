// Update with your config settings.

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: "auth_db",
      user: "root",
      password: "460050",
    },
  },

  pool: {
    min: 2,
    max: 10,
  },

  migrations: {
    tableName: "knex_migrations",
  },
};
