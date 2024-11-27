import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../core";

class User extends Model {
  public id!: number;
  public googleId?: string;
  public githubId?: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    // hooks: {
    //   beforeCreate: (user: User) => {
    //     // Hash password or other transformations can be done here
    //   },
    // },
  }
);

// if (process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production") {
//   sequelize.sync({ force: false }).then(() => {
//     console.log("Database synchronized");
//   });
// }

export { User };
