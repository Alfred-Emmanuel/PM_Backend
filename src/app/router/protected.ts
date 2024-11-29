import { Router } from "express";
import { kanbanBoardRouter } from "../../kanban_board";
import { CurrentUser } from "../../auth";
import { TokenService } from "../../auth";
import { Encryptor } from "../providers";

export const protectedRouter = Router();

const encryptor = new Encryptor();
const tokenService = new TokenService(encryptor);
const currentUserMiddleware = new CurrentUser(tokenService);

protectedRouter.use(currentUserMiddleware.handle);
protectedRouter.use("/kanban_board", kanbanBoardRouter);
