import { Invite } from "../models";

export const sendInvite = async (
  kanbanBoardId: string, // ID of the Kanban board
  email: string, // Email of the invitee
  invitedBy: string | undefined // ID of the user sending the invite
) => {
  try {
    // Create a new invite
    const invite = await Invite.create({
      kanban_board_id: kanbanBoardId,
      email,
      invited_by: invitedBy,
      status: "pending", // Default status for a new invite
    });

    return invite;
  } catch (error) {
    console.error("Error creating invite:", error);
    throw error;
  }
};