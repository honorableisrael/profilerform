import earningsTypes from "../types/earningsTypes";


let earningActions = {};
Object.values(earningsTypes).forEach((type) => {
  earningActions[type] = (payload) => {
    return { type, payload };
  }
});

export default earningActions;
