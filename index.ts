import express, { Express } from "express";
import knex from "knex";
import { Model } from "objection";
import { CarsService } from "./cars-services";
import { OrderService } from "./orders-services";
import * as config from "./knexfile";

const PORT = 3000;
const ENV = "development";
// @ts-expect-error
const knexInstance = knex(config[ENV]);

// Connect ORM to Database
Model.knex(knexInstance);

const app: Express = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/favicon.ico", (_, res) => {
  res.status(404).json({ message: "Not right now" });
});

// Register Cars Service
new CarsService(app).init();
new OrderService(app).init();

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
