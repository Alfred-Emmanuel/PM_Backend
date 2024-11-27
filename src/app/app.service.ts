import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "../core";
import { appRouter } from "./router";

export const app = express();

if (
  config.app.environment.isInDevelopment ||
  config.app.environment.isInTesting
) {
  app.use(morgan("dev"));
}

export const exp = app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/v1", appRouter);
app.disable("x-powered-by");
app.use(compression());
