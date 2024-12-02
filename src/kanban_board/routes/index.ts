// import * as express from "express"
import express, { Router, Request, Response } from "express";
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
import {
  createKanbanBoardSchema,
  sendKanbanBoardInvite,
  updateInvite,
} from "../../auth";
import { validateRequestBody, validateRequestParams } from "../../auth";

export const kanbanBoardRouter = express.Router();

kanbanBoardRouter
  .get("/get_boards", async (req: Request, res: Response) => {
    try {
      // Fetch all boards from the database
      const boards = await KanbanBoard.findAll(); // Use `findAll` for Sequelize or equivalent for your ORM/DB

      // Respond with the list of boards
      res.status(200).json({
        success: true,
        data: boards,
      });
    } catch (error) {
      console.error("Error fetching boards:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching boards.",
      });
    }
  })
  .post(
    "/create",
    validateRequestBody(createKanbanBoardSchema.inputSchema),
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
    validateRequestBody(sendKanbanBoardInvite.inputSchema),
    async (req: Request, res: Response) => {
      const { kanbanBoardId } = req.params;
      const { email } = req.body;
      const invitedBy = req.user?.id;

      try {
        // Assuming sendInvite is a function that interacts with the database
        const invite = await sendInvite(kanbanBoardId, email, invitedBy);
        res.status(201).json(invite);
      } catch (error) {
        res.status(500).json({ message: "Error sending invite", error });
      }
    }
  )
  .put(
    "/invite/:inviteId/:action",
    validateRequestParams(updateInvite.paramsSchema),
    async (
      req: Request<{ inviteId: string; action: string }>,
      res: Response
    ) => {
      const { inviteId, action } = req.params;

      let status: "accepted" | "rejected" | undefined;
      console.log(inviteId);

      try {
        // Determine the status based on the action
        if (action === "accept") {
          status = "accepted";
        } else if (action === "decline") {
          status = "rejected";
        } else {
          res.status(400).json({ message: "Invalid action" });
        }

        if (!status) {
          res.status(400).json({ message: "Invalid action" });
        }

        // Update invite status using the provided function
        const updatedInvite = await updateInviteStatus(inviteId, status!);

        // Check if an invite was updated
        if (!updatedInvite) {
          res.status(404).json({ message: "Invite not found", id: inviteId });
        }

        res.status(200).json(updatedInvite);
      } catch (error: any) {
        console.error("Error updating invite status:", error);
        res.status(500).json({
          message: "Error updating invite status",
          error: error.message,
        });
      }
    }
  )
  .post("/:kanbanBoardId/permissions", async (req, res) => {
    const { kanbanBoardId } = req.params;
    const { userId, accessLevel } = req.body;

    try {
      // Add permission using the addPermission service function
      const permission = await addPermission(
        parseInt(userId),
        parseInt(kanbanBoardId),
        accessLevel
      );

      // Respond with the newly created permission
      res.status(201).json(permission);
    } catch (error) {
      console.error("Error granting permission:", error);
      res.status(500).json({ message: "Error granting permission", error });
    }
  })
  .delete("/permissions/:permissionId", async (req, res) => {
    const { permissionId } = req.params;

    try {
      const result = await revokePermission(Number(permissionId)); // Using Number() to convert the permissionId to a number
      res.status(200).json({ message: "Permission revoked", result });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error revoking permission", error: error.message });
    }
  });
