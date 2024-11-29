import { Router } from "express";
import { serveDocumentation, setupDocumentation } from "../../core";
import { authRouter } from "../../users/routes";
import { protectedRouter } from "./protected";

const appRouter = Router();

appRouter.use("/docs", serveDocumentation, setupDocumentation);

appRouter.use("/auth", authRouter);
appRouter.use("/protected", protectedRouter);

export { appRouter };
