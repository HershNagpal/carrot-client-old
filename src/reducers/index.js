import { combineReducers } from 'redux';
import grid from './grid';
import stats from './stats';
import wolf from './wolf'

export default combineReducers({ grid, stats, wolf });