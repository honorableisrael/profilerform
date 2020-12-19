import { CLEAR_REQUEST } from '../../constants';
import requestTypes from '../types/requestTypes';


const initialState = {
  budget: '',
  state_id: '',
  city_id: '',
  property_id: '',
  property_value: '',
  property_type_id: '',
  property_bedroom: '',
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestTypes.SET_BUDGET: return { ...state, budget: action.payload };
    case requestTypes.SET_PROPERTY_ID: return { ...state, property_id: action.payload };
    case requestTypes.SET_STATE_ID: return { ...state, state_id: action.payload };
    case requestTypes.SET_CITY_ID: return { ...state, city_id: action.payload };
    case requestTypes.SET_PROPERTY_VALUE: return { ...state, property_value: action.payload };
    case requestTypes.SET_PROPERTY_TYPE_ID: return { ...state, property_type_id: action.payload };
    case requestTypes.SET_PROPERTY_BEDROOM: return { ...state, property_bedroom: action.payload };
    case CLEAR_REQUEST: return initialState;
    default: return state;
  }
};

export default requestReducer;
