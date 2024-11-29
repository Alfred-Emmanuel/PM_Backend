import { Invite } from "../models";
import { KanbanBoard } from "../../kanban_board";

export const getPendingInvitesForKanbanBoard = async (
  kanbanBoardId: number // ID of the Kanban board
) => {
  try {
    // Fetch all pending invites for a specific Kanban board
    const pendingInvites = await Invite.findAll({
      where: {
        kanban_board_id: kanbanBoardId,
        status: "pending",
      },
      include: [
        {
          model: KanbanBoard,
          as: "kanbanBoard", // Alias defined in your associations
        },
      ],
    });

    return pendingInvites;
  } catch (error) {
    console.error("Error fetching pending invites:", error);
    throw error;
  }
};
