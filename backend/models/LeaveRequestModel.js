import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js';

const LeaveRequest = sequelize.define(
  'LeaveRequest',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    leaveRequestDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    leaveFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    leaveTo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'waiting for approval',
        'approved',
        'rejected'
      ),
      allowNull: false,
    },
    adminRemark: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default LeaveRequest;
