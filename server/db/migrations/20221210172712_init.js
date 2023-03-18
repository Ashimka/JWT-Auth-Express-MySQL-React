exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("refreshToken");
      table.timestamps(false, true);
    })
    .createTable("roles", (table) => {
      table.increments("id").primary();
      table.integer("user").default(333);
      table.integer("admin");
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
