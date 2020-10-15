import propertyTypes from '../types/propertyTypes';


const propertyActions = {
  setProperties(payload) {
    return ({ type: propertyTypes.SET_PROPERTIES, payload });
  }
};

export default propertyActions;
