import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/dbconfig.js';
import UserRouter from './routers/UserRouter.js';
import EmployeeRouter from './routers/EmployeeRouter.js';
import LeaveRequestRouter from './routers/LeaveRequestRouter.js';
import LeaveTypeRouter from './routers/LeaveTypeRouter.js';
import DepartmentRouter from './routers/DepartmentRouter.js';
import Department from './models/DepartmentModel.js';
import Employee from './models/EmployeeModel.js';
import LeaveType from './models/LeaveTypeModel.js';
import LeaveRequest from './models/LeaveRequestModel.js';
import User from './models/UserModel.js';

// Load ENV Variables
dotenv.config();

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// DB Connection
sequelize
  .authenticate()
  .then(() =>
    console.log('Connection has been established successfully.')
  )
  .catch((err) =>
    console.error('Unable to connect to the database: ', err)
  );
sequelize.sync();

Employee.belongsTo(Department);
Department.hasMany(Employee);

LeaveRequest.belongsTo(LeaveType);
LeaveType.hasMany(LeaveRequest);

LeaveRequest.belongsTo(Employee);
Employee.hasMany(LeaveRequest);

Employee.hasOne(User);
User.belongsTo(Employee);

// Routing
app.use('/api/department', DepartmentRouter);
app.use('/api/employee', EmployeeRouter);
app.use('/api/leaveRequest', LeaveRequestRouter);
app.use('/api/leaveType', LeaveTypeRouter);
app.use('/api/user', UserRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Employee Leave Management System');
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
