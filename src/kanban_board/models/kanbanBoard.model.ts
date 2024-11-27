import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../core"; // Adjust the path to match your project structure
import { User } from "../../users";

export class KanbanBoard extends Model {
  public id!: number;
  public title!: string;
  public ownerId!: number;
  public isDeleted?: boolean;
}

KanbanBoard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically incrementing ID
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title of the Kanban board
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Refers to the owner of the board
      references: {
        model: User, // Refers to the User model
        key: "id",
      },
      onDelete: "CASCADE", // Deletes the board if the owner is deleted
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Soft delete flag
    },
  },
  {
    sequelize,
    modelName: "KanbanBoard",
    tableName: "KanbanBoards", // Use a table name like "KanbanBoards" to avoid confusion
    timestamps: true, // Automatically add createdAt and updatedAt columns
  }
);

User.hasMany(KanbanBoard, { foreignKey: "ownerId", as: "kanbanBoards" });
KanbanBoard.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
