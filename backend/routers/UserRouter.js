import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';
import bcrypt from 'bcryptjs';
import generateToken from '../middlewares/generateToken.js';

const UserRouter = express.Router();

// GET ALL USERS
UserRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// GET SINGLE USER
UserRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// STORE USER
UserRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: req.body.isAdmin ? true : false,
      });
      const CreatedUser = await user.save();
      res.send({
        _id: CreatedUser._id,
        name: CreatedUser.name,
        email: CreatedUser.email,
        isAdmin: CreatedUser.isAdmin,
        token: generateToken(CreatedUser),
      });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// SIGNIN USER
UserRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
          isAdmin: req.body.isAdmin,
        },
      });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            employeeId: user.EmployeeId,
            token: generateToken(user),
          });
        }
      }
      res.status(401).send({
        message: 'Invalid username or password',
      });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// UPDATE USER
UserRouter.post(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (user) {
        user.password = bcrypt.hashSync(req.body.password);
      }
      const updatedUser = await user.save();
      res.send({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        employeeId: updatedUser.EmployeeId,
        token: generateToken(updatedUser),
      });
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

// DELETE USER
UserRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
    } catch (error) {
      res.status(500).send({ message: error.name });
    }
  })
);

export default UserRouter;
