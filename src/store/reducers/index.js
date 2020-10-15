import { combineReducers } from 'redux';

import earningsReducer from './earningsReducer';
import userReducer from './userReducer';
import affordabilityReducer from './affordabilityReducer';
import propertyReducer from './propertyReducer';
import requestReducer from './requestReducer';


export default combineReducers({
  request: requestReducer,
  earnings: earningsReducer,
  properties: propertyReducer,
  currentUser: userReducer,
  affordability: affordabilityReducer,
});