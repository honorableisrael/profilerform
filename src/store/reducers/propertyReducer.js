import propertyTypes from '../types/propertyTypes';


const initialState = {
  data: {
    properties: []
  }
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case propertyTypes.SET_PROPERTIES: return { ...state, data: action.payload };
    default: return state;
  }
}

export default propertyReducer;