import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

type dbConfig = {
  host: string | undefined;
  database: string;
  username: string;
  password: string;
};

const dbConfig: dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
};

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
  }
);

export default db;