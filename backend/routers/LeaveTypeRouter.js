import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import LeaveType from '../models/LeaveTypeModel.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';

const LeaveTypeRouter = express.Router();

// GET ALL LEAVE TYPES
LeaveTypeRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveTypes = await LeaveType.findAll({});
      res.send(leaveTypes);
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE LEAVE TYPE
LeaveTypeRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (leaveType) {
        res.send(leaveType);
      } else {
        res.status(404).send({ message: 'Leave Type Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// STORE LEAVE TYPE
LeaveTypeRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveType = new LeaveType({
        leaveTypeCode: req.body.leaveTypeCode,
        leaveTypeName: req.body.leaveTypeName,
        leaveTypeDesc: req.body.leaveTypeDesc,
      });
      await leaveType.save();
      res
        .status(200)
        .send({ message: 'Leave Type is created successfully' });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// UPDATE LEAVE TYPE
LeaveTypeRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (leaveType) {
        leaveType.leaveTypeCode = req.body.leaveTypeCode;
        leaveType.leaveTypeName = req.body.leaveTypeName;
        leaveType.leaveTypeDesc = req.body.leaveTypeDesc;
        await leaveType.save();
        res
          .status(200)
          .send({ message: 'Leave Type is updated successfully' });
      } else {
        res.status(404).send({ message: 'Leave Type Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// DELETE LEAVE TYPE
LeaveTypeRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (leaveType) {
        await leaveType.destroy();
        res
          .status(200)
          .send({ message: 'Leave Type is deleted successfully' });
      } else {
        res.status(404).send({ message: 'Leave Type Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

export default LeaveTypeRouter;
