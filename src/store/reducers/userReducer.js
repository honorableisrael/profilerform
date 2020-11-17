import userTypes from '../types/userTypes';
// import isEmpty from '../../validation/is_Empty';



const initialState = {
  email: '',
  lastname: '',
  firstname: '',
  middlename: '',
  sex: "",
  state_of_origin: '',
  address: "",
  phone: '',
  dob: '',
  whatapp: '',
  work_experience: "",
  year_to_retirement: "",
  mode_of_contact: '',
  no_of_dependents: '',
  password: '',
  nhf_number: '',
  current_apartment_status: "owned",
  marital_status: "single",
  employment_id: '',
  employment_present_position: '',
  // command: '',
  profession: 'Police',
  employer_address: '',
  employment_state: '',
  // isAuthenticated: false,
};
/**
 * 
employment_id
employment_present_position
command
work_experience
employment_state
employment_address
year_to_retirement
 */

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case userTypes.SET_EMAIL: return { ...state, email: action.payload };
  case userTypes.SET_LASTNAME: return { ...state, lastname: action.payload };
  case userTypes.SET_FIRSTNAME: return { ...state, firstname: action.payload };
  case userTypes.SET_MIDDLENAME: return { ...state, middlename: action.payload }
  case userTypes.SET_SEX: return { ...state, sex: action.payload };
  case userTypes.SET_STATE_OF_ORIGIN: return { ...state, state_of_origin: action.payload };
  case userTypes.SET_ADDRESS: return { ...state, address: action.payload };
  case userTypes.SET_PHONE: return { ...state, phone: action.payload };
  case userTypes.SET_DOB: return { ...state, dob: action.payload };
  case userTypes.SET_WHATAPP: return { ...state, whatapp: action.payload };
  case userTypes.SET_WORK_EXPERIENCE: return { ...state, work_experience: action.payload };
  case userTypes.SET_YEAR_TO_RETIREMENT: return { ...state, year_to_retirement: action.payload };
  case userTypes.SET_MODE_OF_CONTACT: return { ...state, mode_of_contact: action.payload };
  case userTypes.SET_NO_OF_DEPENDENTS: return { ...state, no_of_dependents: action.payload };
  case userTypes.SET_PASSWORD: return { ...state, password: action.payload };
  case userTypes.SET_CURRENT_APARTMENT_STATUS: return { ...state, current_apartment_status: action.payload };
  case userTypes.SET_MARITAL_STATUS: return { ...state, marital_status: action.payload };
  case userTypes.SET_EMPLOYMENT_ID: return { ...state, employment_id: action.payload };
  case userTypes.SET_EMPLOYMENT_STATE: return { ...state, employment_state: action.payload };
  case userTypes.SET_EMPLOYER_ADDRESS: return { ...state, employer_address: action.payload };
  // case userTypes.SET_COMMAND: return { ...state, command: action.payload };
  case userTypes.SET_NHF_NUMBER: return { ...state, nhf_number: action.payload };
  case userTypes.SET_EMPLOYMENT_PRESENT_POSITION: return { ...state, employment_present_position: action.payload };
  // case userTypes.SET_IS_AUTHENTICATED: return { ...state, isAuthenticated: !isEmpty(action.payload)};
  default: return state;
  }
};

export default userReducer;