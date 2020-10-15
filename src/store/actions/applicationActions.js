import applicationTypes from "../types/applicationTypes";


let applicationActions = {};
Object.values(applicationTypes).forEach((type) => {
  applicationActions[type] = (payload) => {
    return { type, payload };
  }
});

export default applicationActions;
