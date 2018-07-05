import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import nounReducer from './nounReducer';

export default combineReducers({
    users: usersReducer,
    noun: nounReducer
});