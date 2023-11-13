import { Express, Response, Request } from "express";
import { CarsModel, Cars } from "./models/cars";
import { ValidationError } from "objection";
import Redis from "ioredis";

const redis = new Redis();

export class CarsService {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.get("/", this.home);
    this.app.get("/cars", this.getMany);
    // this.app.post("cars/", this.create);
    this.app.get("/cars/:id", this.getOne);
    this.app.patch("/cars/:id", this.patch);
    this.app.delete("/cars/:id", this.delete);
  }

  async home(req: Request, res: Response) {
    // const { plate } = req.query;
    res.render("home");
  }

  async getMany(req: Request, res: Response) {
    // const { plate } = req.query;
    const { plate, transmission, capacity, availableAt } = req.query;
    const key = `cars:${JSON.stringify(req.query)}`;
    const carsCache = await redis.getex(key);
    if (carsCache) {
      res.render("index", { cars: JSON.parse(carsCache) });
    } else {
      const qCars = CarsModel.query();

      if (plate) {
        qCars.where("plate", "like", `%${plate}%`);
      }

      console.log(`TRANSMISSION ${transmission}`);
      if (transmission) {
        qCars.where("transmission", `${transmission}`);
      }
      // if (capacity) {
      //   qCars.where("capacity", parseInt(capacity, 10));
      // }

      // if (availableAt) {
      //   qCars.where("availableAt", ">=", new Date(availableAt).toISOString());
      // }

      const cars = await qCars;
      await redis.setex(key, 10, JSON.stringify(cars));
      res.render("index", { cars });
    }
  }

  async getOne(req: Request, res: Response) {
    const cars = await CarsModel.query().findById(req.params.id);
    res.send(cars);
  }

  async create(req: Request<{}, {}, Cars, {}>, res: Response) {
    try {
      const body = {
        ...req.body,
        specs: JSON.stringify(req.body.specs),
        options: JSON.stringify(req.body.specs),
      };
      const car = await CarsModel.query().insert(body).returning("*");
      res.send(car);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.send({
          message: error.message,
        });
      }
    }
  }

  async patch(req: Request, res: Response) {
    const body = {
      ...req.body,
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.specs),
    };
    const car = await CarsModel.query().findById(req.params.id).patch(body);
    res.send(car);
  }

  async delete(req: Request, res: Response) {
    const car = await CarsModel.query().deleteById(req.params.id);
    res.send(car);
  }
}
