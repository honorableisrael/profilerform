import errorTypes from "../types/errorTypes";

export default (errors) => {
  return { type: errorTypes.SET_ERRORS, errors };
};