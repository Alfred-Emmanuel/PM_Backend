import { User } from "../../users";
import Permissions from "../models/permissions.model";

export const getPermissionsForKanbanBoard = async (kanbanBoardId: number) => {
  const permissions = await Permissions.findAll({
    where: { kanbanBoardId },
    include: [
      {
        model: User,
        attributes: ["id", "displayName", "email"], // Select only required fields from the User model
      },
    ],
  });

  return permissions;
};
