import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../core";
import { List } from "../../lists/models";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public status!: string;
  public listId!: number;
  // public isDeleted?: boolean;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Title of the task
    },
    // description: {
    //   type: DataTypes.TEXT, // Optional detailed description of the task
    //   allowNull: true,
    // },
    status: {
      type: DataTypes.STRING, // Status (e.g., "In Progress", "Completed")
      allowNull: false,
      defaultValue: "Pending",
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Refers to the list this task belongs to
      references: {
        model: List,
        key: "id",
      },
      onDelete: "CASCADE", // Delete tasks if the list is deleted
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "Tasks",
    timestamps: true,
  }
);

List.hasMany(Task, { foreignKey: "listId", as: "tasks" });
Task.belongsTo(List, { foreignKey: "listId", as: "list" });
