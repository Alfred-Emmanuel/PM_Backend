import { KanbanBoard } from "../models";

export const deleteKanbanBoard = async (boardId: number, ownerId: number) => {
  const board = await KanbanBoard.findByPk(boardId);

  if (!board) {
    throw new Error("Kanban board not found");
  }

  if (board.ownerId !== ownerId) {
    throw new Error("You are not authorized to delete this Kanban board");
  }

  // Delete the board
  await board.destroy();

  return { message: "Kanban board deleted successfully", board };
};
