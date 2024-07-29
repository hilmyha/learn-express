import { DataTypes } from "sequelize";
import db from "../config/database";

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "users",
  timestamps: true,
  freezeTableName: true,
}

);

export default User;

const syncDatabase = async () => {
  try {
    await db.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database: ", error);
  }
};

syncDatabase();