import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js';

const LeaveType = sequelize.define(
  'LeaveType',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    leaveTypeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    leaveTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    leaveTypeDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default LeaveType;
