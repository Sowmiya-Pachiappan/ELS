import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js';
import Employee from './EmployeeModel.js';

const Department = sequelize.define(
  'Department',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    deptCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deptShortName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Department;
