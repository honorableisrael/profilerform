import requestTypes from '../types/requestTypes';


let requestActions = {};
Object.values(requestTypes).forEach((type) => {
  requestActions[type] = (payload) => {
    return { type, payload };
  }
});

export default requestActions;
