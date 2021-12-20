import { combineReducers } from 'redux';
import grid from './grid.js';
import stats from './stats.js';

export default combineReducers({ grid, stats });