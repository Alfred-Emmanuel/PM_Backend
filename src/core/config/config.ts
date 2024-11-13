import * as dotenv from "dotenv";
import { ENVIRONMENT } from "../utils/environment";

dotenv.config();

export const config = Object.freeze({
  app: {
    environment: {
      mode: process.env.NODE_ENV,
      isInProduction: process.env.NODE_ENV === ENVIRONMENT.PROD,
      isInDevelopment: process.env.NODE_ENV === ENVIRONMENT.DEV,
      isInTesting: process.env.NODE_ENV === ENVIRONMENT.TEST,
    },
    port: parseInt(process.env.PORT!),
  },
});

export default config;
