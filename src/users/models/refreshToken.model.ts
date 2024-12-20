import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
import { sequelize } from "../../core";

class RefreshToken extends Model {
  public id!: number;
  public userId!: number;
  public token!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER, // Use INTEGER for auto-increment
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "RefreshToken",
    tableName: "refresh_token",
    timestamps: true,
    underscored: true,
  }
);

User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

export { RefreshToken };
