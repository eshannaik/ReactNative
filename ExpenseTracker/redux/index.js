import {combineReducers} from 'redux';
import expenseReducer from './reducer';

export default combineReducers({
        expense: expenseReducer,
})