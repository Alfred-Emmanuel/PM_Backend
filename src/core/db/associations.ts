import { KanbanBoard } from "../../kanban_board";
import { List } from "../../lists";
import { User } from "../../users";

const defineAssociations = () => {
  // User <-> KanbanBoard
  User.hasMany(KanbanBoard, { foreignKey: "ownerId", as: "kanbanBoards" });
  KanbanBoard.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

  // KanbanBoard <-> List
  KanbanBoard.hasMany(List, { foreignKey: "kanbanBoardId", as: "lists" });
  List.belongsTo(KanbanBoard, {
    foreignKey: "kanbanBoardId",
    as: "kanbanBoard",
  });
};

export { defineAssociations };
