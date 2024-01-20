import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
  profileUpdateReducer,
  userSignupReducer,
  userSigninReducer,
  userSignoutReducer,
} from './reducers/userReducers';
import {
  departmentCreateReducer,
  departmentDeleteReducer,
  departmentDetailReducer,
  departmentListReducer,
  departmentUpdateReducer,
} from './reducers/departmentReducers';
import {
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeDetailReducer,
  employeeListReducer,
  employeeUpdateReducer,
} from './reducers/employeeReducers';
import {
  leaveTypeCreateReducer,
  leaveTypeDeleteReducer,
  leaveTypeDetailReducer,
  leaveTypeListReducer,
  leaveTypeUpdateReducer,
} from './reducers/leaveTypeReducers';
import {
  leaveRequestApproveReducer,
  leaveRequestCreateReducer,
  leaveRequestDeleteReducer,
  leaveRequestDetailReducer,
  leaveRequestListReducer,
  leaveRequestUpdateReducer,
  myLeaveRequestListReducer,
} from './reducers/leaveRequestReducers';

const reducers = combineReducers({
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  profileUpdate: profileUpdateReducer,
  departmentCreate: departmentCreateReducer,
  departmentList: departmentListReducer,
  departmentDetail: departmentDetailReducer,
  departmentUpdate: departmentUpdateReducer,
  departmentDelete: departmentDeleteReducer,
  employeeCreate: employeeCreateReducer,
  employeeList: employeeListReducer,
  employeeDetail: employeeDetailReducer,
  employeeUpdate: employeeUpdateReducer,
  employeeDelete: employeeDeleteReducer,
  leaveTypeCreate: leaveTypeCreateReducer,
  leaveTypeList: leaveTypeListReducer,
  leaveTypeDetail: leaveTypeDetailReducer,
  leaveTypeUpdate: leaveTypeUpdateReducer,
  leaveTypeDelete: leaveTypeDeleteReducer,
  userSignout: userSignoutReducer,
  leaveRequestCreate: leaveRequestCreateReducer,
  leaveRequestList: leaveRequestListReducer,
  leaveRequestDetail: leaveRequestDetailReducer,
  leaveRequestUpdate: leaveRequestUpdateReducer,
  leaveRequestDelete: leaveRequestDeleteReducer,
  myleaveRequestList: myLeaveRequestListReducer,
  leaveRequestApprove: leaveRequestApproveReducer,
});

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};

const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
