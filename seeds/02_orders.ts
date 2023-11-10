import { Knex } from "knex";

const tableName = "orders";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();
  const cars = await knex("cars").select("*").limit(1);

  // Inserts seed entries
  await knex(tableName).insert({
    tanggal_sewa: new Date(),
    waktu_jemput_atau_antar: "15:00",
    jumlah_penumpang: 2,
    cars_id: cars[0].id,
  });
}
