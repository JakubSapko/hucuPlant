import express from "express";

import cors from "cors";
import * as bodyParser from "body-parser";

import * as dotenv from "dotenv";

import { auth as AuthRoute } from "./routes/Auth";
import { plant as PlantsRoute } from "./routes/PlantAPI/getPlants";

export class Server {
  public app: express.Application;

  public constructor() {
    this.app = express();
  }

  public start() {
    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();

    this.app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  }

  private setConfig() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());

    dotenv.config();
  }

  private setRequestLogger() {
    this.app.use(async (req, res, next) => {
      console.log(`${req.method} - ${req.path}`);
      
      next();
    });
  }

  private setRoutes() {
    this.app.use('/api/auth', AuthRoute);
    this.app.use('/api/data', PlantsRoute);
  }
}
