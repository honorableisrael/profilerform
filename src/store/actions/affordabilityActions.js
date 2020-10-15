import affordabilityTypes from "../types/affordabilityTypes";


let actions = {};
Object.values(affordabilityTypes).forEach((type) => {
  actions[type] = (payload) => {
    return { type, payload };
  }
});

export default actions;
