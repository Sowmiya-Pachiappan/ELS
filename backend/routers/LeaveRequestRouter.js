import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import LeaveRequest from '../models/LeaveRequestModel.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';
import LeaveType from '../models/LeaveTypeModel.js';
import Employee from '../models/EmployeeModel.js';
import User from '../models/UserModel.js';

const LeaveRequestRouter = express.Router();

// GET ALL LEAVE REQUESTS
LeaveRequestRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequests = await LeaveRequest.findAll({
        include: [
          { model: LeaveType, required: true },
          { model: Employee, required: true },
        ],
      });
      res.status(200).send(leaveRequests);
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE EMPLOYEE LEAVE REQUESTS
LeaveRequestRouter.get(
  '/mine/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log(req.params.id);
      const leaveRequests = await LeaveRequest.findAll({
        where: {
          EmployeeId: req.params.id,
        },
        include: [
          { model: LeaveType, required: true },
          { model: Employee, required: true },
        ],
        logging: console.log,
      });
      console.log(leaveRequests);
      res.status(200).send(leaveRequests);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE LEAVE REQUEST
LeaveRequestRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequest = await LeaveRequest.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: LeaveType, required: true },
          { model: Employee, required: true },
        ],
      });
      const user = await User.findByPk(req.user.id);
      if (leaveRequest) {
        if (Boolean(Number(req.user.isAdmin))) {
          res.status(200).send(leaveRequest);
        } else if (user.EmployeeId === leaveRequest.EmployeeId) {
          res.status(200).send(leaveRequest);
        } else {
          res
            .status(404)
            .send({ message: 'Leave Request Not Found' });
        }
      } else {
        res.status(404).send({ message: 'Leave Request Not Found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

// STORE LEAVE REQUEST
LeaveRequestRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequest = new LeaveRequest({
        EmployeeId: req.body.EmployeeId,
        LeaveTypeId: req.body.LeaveTypeId,
        leaveRequestDesc: req.body.leaveRequestDesc,
        leaveFrom: req.body.leaveFrom,
        leaveTo: req.body.leaveTo,
        status: 'waiting for approval',
      });
      await leaveRequest.save();
      res
        .status(200)
        .send({ message: 'Leave Request is created successfully' });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// UPDATE LEAVE REQUEST
LeaveRequestRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(req.params.id);
      if (
        leaveRequest &&
        leaveRequest.EmployeeId === req.body.EmployeeId
      ) {
        if (leaveRequest.status === 'waiting for approval') {
          leaveRequest.LeaveTypeId = req.body.LeaveTypeId;
          leaveRequest.leaveRequestDesc = req.body.leaveRequestDesc;
          leaveRequest.leaveFrom = req.body.leaveFrom;
          leaveRequest.leaveTo = req.body.leaveTo;
          await leaveRequest.save();
          res.status(200).send({
            message: 'Leave Request is updated successfully',
          });
        } else {
          res.status(500).send({
            message:
              'Since Leave Request is moved to next level, you can not edit. ',
          });
        }
      } else {
        res.status(404).send({ message: 'Leave Request Not Found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.name });
    }
  })
);

// APPROVE LEAVE REQUEST
LeaveRequestRouter.put(
  '/approve/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(req.params.id);
      if (leaveRequest) {
        if (leaveRequest.status === 'waiting for approval') {
          leaveRequest.status = req.body.status;
          await leaveRequest.save();
          res.status(200).send({
            message: 'Leave Approval is updated successfully',
          });
        }
      } else {
        res.status(404).send({ message: 'Leave Request Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// DELETE LEAVE REQUEST
LeaveRequestRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(req.params.id);
      if (leaveRequest) {
        if (leaveRequest.status === 'waiting for approval') {
          await leaveRequest.destroy();
          res.status(200).send({
            message: 'Leave Request is deleted successfully',
          });
        } else {
          res.status(500).send({
            message:
              'Since Leave Request is moved to next level, you can not delete. ',
          });
        }
      } else {
        res.status(404).send({ message: 'Leave Request Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

export default LeaveRequestRouter;
