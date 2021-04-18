import { combineReducers, createStore } from 'redux';
import rootReducer from './main-reducer';

const combine = combineReducers({
    root: rootReducer
}) 

export const store = createStore(combine);

