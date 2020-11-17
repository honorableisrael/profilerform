import userTypes from "../types/userTypes";


let userActions = {};

Object.values(userTypes).forEach((type) => {
  userActions[type] = (payload) => {
    return { type, payload };
  }
});


export default userActions;
