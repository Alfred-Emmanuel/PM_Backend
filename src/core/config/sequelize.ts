import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.app.host,
  database: config.db.postgresql.DATABASE,
  username: config.db.postgresql.USER,
  password: config.db.postgresql.USER_PASSWORD,
});
