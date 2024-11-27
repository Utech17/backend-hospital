import express from "express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import {
  roleRoute,
  serviceRoute,
  userRoute,
} from "../routes/index.route";
import { db } from "../config/sequelize.config";
import { swaggerOptions } from "../config";
export class Server {
  private app: any;
  private port: string | number;
  private pre: string;
  private paths: any;
  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3880;
    this.pre = "/api";
    this.paths = {
      roles: this.pre + "/roles",
      services: this.pre + "/services",
      users: this.pre + "/users",
    };
    this.connectDB();
    this.middlewares();
    this.routes();
    this.swaggerSetup();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("src/public"));
  }

  routes() {
    this.app.use(this.paths.roles, roleRoute);
    this.app.use(this.paths.services,serviceRoute);
    this.app.use(this.paths.users, userRoute);
  }
  async connectDB() {
    await db
      .authenticate()
      .then(() => {
        console.log("Conexión exitosa a la base de datos");
      })
      .catch((error: any) => {
        console.log("No se pudo conectar a la base de datos");
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en localhost:${this.port}`);
    });
  }
  swaggerSetup() {
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}
