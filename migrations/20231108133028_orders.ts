import { Knex } from "knex";

const tableName = "orders";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("tipe_driver", 20).notNullable().defaultTo("non_driver");
    table.date("tanggal_sewa").notNullable(); // 2023-10-11
    table.time("waktu_jemput_atau_antar").notNullable(); // 17:00
    table.integer("jumlah_penumpang");
    table
      .integer("cars_id")
      .notNullable()
      .references("cars.id")
      .onDelete("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
