// import * as express from "express"
import express, { Request, Response } from "express";
import { KanbanBoard } from "../../kanban_board/models";
import { deleteKanbanBoard } from "../services/delete";
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
import { getListsForKanbanBoard } from "../../lists/services/getList";
import {
  createKanbanBoardSchema,
  sendKanbanBoardInvite,
  updateInvite,
} from "../../auth";
import { validateRequestBody, validateRequestParams } from "../../auth";

export const kanbanBoardRouter = express.Router();

kanbanBoardRouter
  .get("/:id/lists", async (req: Request, res: Response) => {
    const { id } = req.params; // Extract the kanbanBoardId from the URL params

    try {
      const kanbanBoardId = parseInt(id, 10); // Convert id to integer
      if (isNaN(kanbanBoardId)) {
        res.status(400).json({ message: "Invalid Kanban Board ID" });
        return;
      }

      // Call the function to fetch lists for the kanban board
      const lists = await getListsForKanbanBoard(kanbanBoardId);

      // Return the lists if found
      if (lists.length === 0) {
        res
          .status(404)
          .json({ message: "No lists found for this Kanban Board" });
        return;
      }

      res.status(200).json(lists);
      return;
    } catch (error) {
      console.error("Error fetching lists:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching lists" });
      return;
    }
  })
  .get("/get_boards", async (req: Request, res: Response) => {
    try {
      const ownerId = req.user?.id; // Get the current user's ID

      if (!ownerId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized. User ID is missing.",
        });
      }

      // Fetch boards where the ownerId matches the user's ID
      const boards = await KanbanBoard.findAll({
        where: { ownerId }, // Sequelize condition
      });

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
  .delete("/delete_board/:boardId", async (req, res) => {
    const { boardId } = req.params;
    const ownerId = req.user?.id;
    try {
      const result = await deleteKanbanBoard(Number(boardId), Number(ownerId));
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Kanban board not found") {
        res.status(404).json({ message: error.message });
        return;
      } else if (
        error.message === "You are not authorized to delete this Kanban board"
      ) {
        res.status(403).json({ message: error.message }); // Forbidden
        return;
      } else {
        res.status(500).json({
          message: "Error deleting Kanban board",
          error: error.message,
        });
        return;
      }
    }
  });
