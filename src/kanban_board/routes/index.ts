import { Router, Request, Response } from "express";
import { KanbanBoard } from "../models";
import {
  addPermission,
  revokePermission,
  updatePermission,
  getPermissionsForKanbanBoard,
} from "../../permissions";
import {
  sendInvite,
  updateInviteStatus,
  getPendingInvitesForKanbanBoard,
} from "../../invite/services";
import { createKanbanBoardSchema, sendKanbanBoardInvite } from "../../auth";
import { validateRequest } from "../../auth";
import { number } from "joi";

export const kanbanBoardRouter = Router();

kanbanBoardRouter
  .post(
    "/create",
    validateRequest(createKanbanBoardSchema.inputSchema),
    async (req: Request, res: Response) => {
      const { title } = req.body;
      const ownerId = req.user?.id;

      try {
        const kanbanBoard = await KanbanBoard.create({
          title,
          ownerId,
        });
        res.status(201).json(kanbanBoard);
      } catch (error) {
        console.error("Error creating project: ", error);
        res.status(500).json({ message: "Error creating kanban board", error });
      }
    }
  )
  .post(
    "/invite/:kanbanBoardId",
    validateRequest(sendKanbanBoardInvite.inputSchema),
    async (req: Request, res: Response) => {
      const { kanbanBoardId } = req.params;
      const { email } = req.body;
      const invitedBy = req.user?.id; // User ID from the authentication middleware

      try {
        // Assuming sendInvite is a function that interacts with the database
        const invite = await sendInvite(kanbanBoardId, email, invitedBy);
        res.status(201).json(invite);
      } catch (error) {
        res.status(500).json({ message: "Error sending invite", error });
      }
    }
  );
