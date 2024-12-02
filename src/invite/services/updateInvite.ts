import { Invite } from "../models";

export const updateInviteStatus = async (
  inviteId: string, // ID of the invite to update
  status: "accepted" | "rejected" // New status
) => {
  try {
    // Update the invite's status
    const updatedInvite = await Invite.update(
      { status },
      {
        where: { id: inviteId },
        returning: true, // Return the updated invite
      }
    );

    // Return the updated invite details
    return updatedInvite[1][0]; // Sequelize returns [affectedCount, rows]
  } catch (error) {
    console.error("Error updating invite status:", error);
    throw error;
  }
};
