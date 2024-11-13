import { createServer } from "http";

import { config } from "../core";
import { app } from "./app.service";

export const startApp = async() => {
    const server = createServer(app)
    server.listen(config.app.port, () => {console.log(`Server is running at ${config.app.port}`)})
}