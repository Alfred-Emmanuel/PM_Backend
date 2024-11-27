import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../core";
import { KanbanBoard } from "../../kanban_board/models";

export class List extends Model {
  public id!: number;
  public title!: string;
  public kanbanBoardId!: number;
  // public isDeleted?: boolean;
}

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title of the list (e.g., "To-Do", "Pending")
    },
    kanbanBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Refers to the Kanban board this list belongs to
      references: {
        model: KanbanBoard,
        key: "id",
      },
      onDelete: "CASCADE", // Delete lists if the Kanban board is deleted
    },
  },
  {
    sequelize,
    modelName: "List",
    tableName: "Lists",
    timestamps: true,
  }
);

KanbanBoard.hasMany(List, { foreignKey: "kanbanBoardId", as: "lists" });
List.belongsTo(KanbanBoard, { foreignKey: "kanbanBoardId", as: "kanbanBoard" });

