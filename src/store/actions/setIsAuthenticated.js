import { SET_IS_AUTHENTICATED } from '../../constants';


export default (isAuthenticated) => {
  return { type: SET_IS_AUTHENTICATED, isAuthenticated };
};
