import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js';

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    empCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    empFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    empLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    empEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    empMobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empGender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'transgender'],
      allowNull: false,
    },
    empDOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    empCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Employee;
