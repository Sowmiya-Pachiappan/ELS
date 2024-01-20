import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Employee from '../models/EmployeeModel.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';
import Department from '../models/DepartmentModel.js';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const EmployeeRouter = express.Router();

// GET ALL EMPLOYEES
EmployeeRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const employees = await Employee.findAll({
        include: {
          model: Department,
          required: true,
        },
      });
      res.send(employees);
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE EMPLOYEE
EmployeeRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        res.send(employee);
      } else {
        res.status(404).send({ message: 'Employee Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// STORE EMPLOYEE
EmployeeRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const employee = new Employee({
        empCode: req.body.empCode,
        empFirstName: req.body.empFirstName,
        empLastName: req.body.empLastName,
        empEmail: req.body.empEmail,
        DepartmentId: req.body.DepartmentId,
        empMobile: req.body.empMobile,
        empGender: req.body.empGender,
        empDOB: req.body.empDOB,
        empCountry: req.body.empCountry,
        empCity: req.body.empCity,
        empAddress: req.body.empAddress,
        empStatus: req.body.empStatus,
      });

      const createdEmployee = await employee.save();
      const user = new User({
        name: req.body.empFirstName,
        email: req.body.empEmail,
        password: bcrypt.hashSync(req.body.empCode, 8),
        isAdmin: req.body.isAdmin ? true : false,
        EmployeeId: createdEmployee.id,
      });
      await user.save();
      res
        .status(200)
        .send({ message: 'Employee is created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

// UPDATE EMPLOYEE
EmployeeRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        employee.empCode = req.body.empCode;
        employee.empFirstName = req.body.empFirstName;
        employee.empLastName = req.body.empLastName;
        employee.empEmail = req.body.empEmail;
        employee.DepartmentId = req.body.DepartmentId;
        employee.empMobile = req.body.empMobile;
        employee.empGender = req.body.empGender;
        employee.empDOB = req.body.empDOB;
        employee.empCountry = req.body.empCountry;
        employee.empCity = req.body.empCity;
        employee.empAddress = req.body.empAddress;
        employee.empStatus = req.body.empStatus;
        console.log(employee);
        await employee.save();
        res
          .status(200)
          .send({ message: 'Employee is updated successfully' });
      } else {
        res.status(404).send({ message: 'Employee Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// DELETE EMPLOYEE
EmployeeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await User.destroy({ where: { EmployeeId: employee.id } });
        await employee.destroy();
        res
          .status(200)
          .send({ message: 'Employee is deleted successfully' });
      } else {
        res.status(404).send({ message: 'Employee Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

export default EmployeeRouter;
