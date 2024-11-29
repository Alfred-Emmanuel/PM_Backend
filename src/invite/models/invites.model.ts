// models/Invite.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../core";
import { KanbanBoard } from "../../kanban_board";
import { User } from "../../users";

// // Define the interface for the Invite model
// interface InviteAttributes {
//   id: number;
//   kandBoardId: number; // Foreign key to Kanban board
//   userId: number; // The user being invited
//   inviteToken: string; // Unique token for invite verification
//   status: string; // 'pending', 'accepted', 'expired', etc.
//   expirationDate: Date; // Date when the invite expires
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Optional attributes for create, which exclude the 'id' field as it auto-generates
// interface InviteCreationAttributes extends Optional<InviteAttributes, "id"> {}

class Invite extends Model {
  public id!: number;
  public kanban_board_id!: number;
  public user_id!: number;
  public inviteToken!: string;
  public status!: string;
  public expirationDate!: Date;

  // Timestamps for create and update
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Invite model
Invite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kandBoardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: KanbanBoard, // The name of the kanban_board table
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // The name of the users table
        key: "id",
      },
    },
    inviteToken: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID for each invite
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // default status when invite is created
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "invites", // Table name in the database
    underscored: true, // Convert camelCase to snake_case in the database
    timestamps: true, // Enable automatic timestamps
  }
);

Invite.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Invite belongs to a KanbanBoard
Invite.belongsTo(KanbanBoard, {
  foreignKey: "kandBoardId",
  as: "kanbanBoard",
});

export { Invite };
