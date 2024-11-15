import { startApp } from "./app";
import { initializeDBConnection, shutDown } from "./core";

initializeDBConnection().then(startApp).catch(shutDown);
