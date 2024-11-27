import { Options } from "swagger-jsdoc"
import swaggerJSDoc from "swagger-jsdoc"
import * as swaggerUi from "swagger-ui-express"
import config from "./config"

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PM API documentation",
      version: "1.0.0",
      description: "API documentation for PM backend",
    },
    servers: [
      {
        url: config.app.host,
        description: `Server in ${config.app.environment.mode}.`,
      },
    ],
  },

  apis: ["./src/**/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export const serveDocumentation = swaggerUi.serve;
export const setupDocumentation = swaggerUi.setup(swaggerDocs);