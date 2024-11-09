import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    userReducer: userReducer,
    loadingReducer: loadingReducer
});

export default rootReducer;