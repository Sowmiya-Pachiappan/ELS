import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialect: 'mysql',
  }
);
export default sequelize;
