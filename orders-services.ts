import { Express, Request, Response } from "express";
import { OrdersModel } from "./models/orders";

export class OrderService {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.get("/orders/:id", this.getOne);
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const order = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("cars");
    res.status(200).json(order);
  }
}
