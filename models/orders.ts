import { ModelWithValidator } from "./base";
import { Model, ModelObject } from "objection";
import { CarsModel } from "./cars";

export class OrdersModel extends ModelWithValidator {
  static get tableName() {
    return "orders";
  }

  static relationMappings = {
    cars: {
      relation: Model.BelongsToOneRelation,
      modelClass: CarsModel,
      join: {
        from: "cars.id",
        to: "orders.cars_id",
      },
    },
  };
}

export type Orders = ModelObject<OrdersModel>;
