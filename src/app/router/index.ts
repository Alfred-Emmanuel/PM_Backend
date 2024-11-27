import { Router } from "express";
import { serveDocumentation, setupDocumentation } from "../../core";
import { authRouter } from "../../users/routes";
// import { protecte }

const appRouter = Router();

appRouter.use("/docs", serveDocumentation, setupDocumentation);

appRouter.use("/auth", authRouter);

export { appRouter };
