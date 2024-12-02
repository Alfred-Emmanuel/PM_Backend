import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../core";
import { AccessLevels } from "../types"
import { User } from "../../users";
import { KanbanBoard } from "../../kanban_board/models";

// Define the Permissions model
class Permissions extends Model {
  public id!: number;
  public userId!: number;
  public kanbanBoardId!: number;
  public accessLevel!: string;
}

Permissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // The table name of the User model
        key: "id",
      },
      onDelete: "CASCADE", // Optional: handle cascading delete
    },
    kanbanBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "KanbanBoards", // The table name of the KanbanBoard model
        key: "id",
      },
      onDelete: "CASCADE",
    },
    accessLevel: {
      type: DataTypes.ENUM(...Object.values(AccessLevels)),
      defaultValue: "viewer", // Set default access level
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Permissions", // Name of the model
    tableName: "Permissions", // Table name in the database
    timestamps: true, // Enable `createdAt` and `updatedAt` fields
  }
);


Permissions.belongsTo(User, { foreignKey: "userId", as: "user" });
Permissions.belongsTo(KanbanBoard, {
  foreignKey: "kanbanBoardId",
  as: "kanbanBoard",
});

User.hasMany(Permissions, { foreignKey: "userId", as: "permissions" });
KanbanBoard.hasMany(Permissions, {
  foreignKey: "kanbanBoardId",
  as: "permissions",
});

export default Permissions;
