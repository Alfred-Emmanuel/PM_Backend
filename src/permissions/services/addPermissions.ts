import Permissions from "../models/permissions.model";
import { AccessLevels } from "../types";
// import { User } from "../../users";
// import { KanbanBoard } from "../../kanban_board";

export const addPermission = async (
  userId: number,
  kanbanBoardId: number,
  accessLevel: AccessLevels
) => {
  const permission = await Permissions.create({
    userId,
    kanbanBoardId,
    accessLevel,
  });
  return permission;
};
