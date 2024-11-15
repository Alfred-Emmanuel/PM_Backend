import { Client } from "pg";
import config from "./config";

const initializeDBConnection = async () => {
  const client = new Client({
    host: config.app.host,
    port: config.db.postgresql.PORT,
    user: config.db.postgresql.USER,
    password: config.db.postgresql.USER_PASSWORD,
    database: config.db.postgresql.DATABASE,
  });

  try {
    await client.connect();
    console.log("Database Connected");

    return client;
  } catch (error) {
    console.log("Error occured while connecting to the database: ", error);
    throw new Error();
  }
};

export { initializeDBConnection };
