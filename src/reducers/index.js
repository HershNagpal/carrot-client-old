// combineReducers is a Redux helper function.
// It will turn all our organized reducers into one big reducer.
// Then we can use that big reducer as our store's reducer, called by dispatch.
import { combineReducers } from 'redux';

// First import all the reducers.
// Make sure it's named the same as the states they represent.
import grid from './grid.js';

// Finally combine the reducers and export.
// If named the same, you can simply write 'papers' instead of 'papers: papersReducer'.
// If more than one, just separate with commas.
export default combineReducers({ grid });