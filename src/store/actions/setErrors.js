import { SET_ERRORS } from "../../constants";

export default (errors) => {
  return { type: SET_ERRORS, errors };
};