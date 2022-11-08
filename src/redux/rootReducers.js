import { combineReducers } from 'redux'
import CommonReducer from './common/commonReducer';
import EngineerReducer from './engineer/engineerReducer';
import UserReducer from './user/userReducer';
import AppointmentReducer from './appointment/appointmentReducer'


const RootReducer = combineReducers({
    user: UserReducer,
    engineer: EngineerReducer,
    common: CommonReducer,
    appointment: AppointmentReducer
})

export default RootReducer;