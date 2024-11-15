import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { config } from "../../core";
import { DATE } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.app.host,
  username: config.db.postgresql.USER,
  password: config.db.postgresql.USER_PASSWORD,
  database: config.db.postgresql.DATABASE,
});

class User extends Model {
  public id!: number;
  public googleId?: string;
  public githubId?: string;
  public displayName!: string;
  public email?: string;
  public password?: string;
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
    displayName: {
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
    hooks: {
      beforeCreate: (user: User) => {
        // Hash password or other transformations can be done here
      },
    },
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
});

export { User };
