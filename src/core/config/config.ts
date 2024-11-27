import * as dotenv from "dotenv";
import { ENVIRONMENT } from "../utils/environment";

dotenv.config();

export const config = Object.freeze({
  app: {
    host: process.env.ServerHost as string,
    port: parseInt(process.env.PORT!),
    environment: {
      mode: process.env.NODE_ENV,
      isInProduction: process.env.NODE_ENV === ENVIRONMENT.PROD,
      isInDevelopment: process.env.NODE_ENV === ENVIRONMENT.DEV,
      isInTesting: process.env.NODE_ENV === ENVIRONMENT.TEST,
    },
    encryption: {
      key: process.env.ENCRYPTION_KEY || "",
    },
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET_LIFESPAN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_SECRET_LIFESPAN as string,
  },
  db: {
    postgresql: {
      USER: process.env.POSTGRESQL_USER as string,
      USER_PASSWORD: process.env.POSTGRESQL_USER_PASSWORD as string,
      DATABASE: process.env.POSTGRESQL_DATABASE as string,
      PORT: parseInt(process.env.POSTGRESQL_PORT!),
    },
  },
});

export default config;
