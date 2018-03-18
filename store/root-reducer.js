import { combineReducers } from 'redux';
import taskData from '../src/Task/redux/reducer';

const reducers = combineReducers({
    taskData: taskData,
});

export default reducers;
