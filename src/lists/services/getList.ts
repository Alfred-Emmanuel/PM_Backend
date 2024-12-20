import { List } from "../models";

export const getListsForKanbanBoard = async (kanbanBoardId: number) => {
  const lists = await List.findAll({
    where: { kanbanBoardId },
    order: [["createdAt", "ASC"]], // Optional: order lists by creation time
    attributes: ["id", "title", "createdAt", "updatedAt"], // Select specific attributes you need
  });

  return lists;
};
