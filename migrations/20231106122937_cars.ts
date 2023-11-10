import { Knex } from "knex";

const tableName = "cars";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("plate", 10).notNullable();
    table.string("manufacture", 20).notNullable();
    table.text("image").notNullable();
    table.string("model", 20).notNullable();
    table.string("type", 100).notNullable();
    table.text("description").notNullable();
    table.string("transmission", 20).notNullable();
    table.integer("capacity").notNullable();
    table.bigint("rentPerDay").notNullable();
    table.datetime("availableAt").notNullable();
    table.boolean("available").notNullable().defaultTo(false);
    table.integer("year", 4).notNullable();
    table.jsonb("options").notNullable();
    table.jsonb("specs").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
