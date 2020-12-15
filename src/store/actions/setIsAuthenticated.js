import authTypes from '../types/authTypes';


export default (isAuthenticated) => {
  return { type: authTypes.SET_IS_AUTHENTICATED, isAuthenticated };
};
