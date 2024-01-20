import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Department from '../models/DepartmentModel.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';

const DepartmentRouter = express.Router();

// GET ALL DEPARTMENTS
DepartmentRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const departments = await Department.findAll({});
      res.send(departments);
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE DEPARTMENT
DepartmentRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);
      if (department) {
        res.send(department);
      } else {
        res.status(404).send({ message: 'Department Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// STORE DEPARTMENT
DepartmentRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const department = new Department({
        deptCode: req.body.deptCode,
        deptName: req.body.deptName,
        deptShortName: req.body.deptShortName,
      });
      await department.save();
      res
        .status(200)
        .send({ message: 'Department is created successfully' });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// UPDATE DEPARTMENT
DepartmentRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);
      if (department) {
        department.deptCode = req.body.deptCode;
        department.deptName = req.body.deptName;
        department.deptShortName = req.body.deptShortName;
        console.log(department);
        await department.save();
        res
          .status(200)
          .send({ message: 'Department is updated successfully' });
      } else {
        res.status(404).send({ message: 'Department Not Found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

// DELETE DEPARTMENT
DepartmentRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (department) {
        await department.destroy({});
        res
          .status(200)
          .send({ message: 'Department is deleted successfully' });
      } else {
        res.status(404).send({ message: 'Department Not Found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

export default DepartmentRouter;
