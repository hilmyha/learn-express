import { DataTypes, Model } from "sequelize";
import db from "../config/database";

interface RefreshTokenAttributes {
  id?: number;
  token: string;
  userId : number;
  expiresAt: Date;
}

class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public token!: string;
  public userId!: number;
  public expiresAt!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RefreshToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: "refresh_tokens",
  timestamps: true,
  freezeTableName: true,
});

export default RefreshToken;

const syncDatabase = async () => {
  try {
    await db.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database: ", error);
  }
};

syncDatabase();
