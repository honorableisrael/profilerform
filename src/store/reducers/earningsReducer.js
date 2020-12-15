import { CLEAR_EARNINGS } from '../../constants';
import earningsTypes from '../types/earningsTypes';
import { composeNewState } from './composeNewState';

const initialState = {
  monthly_income: 30000,
  additional_income: "",
  have_additional_income: "no",
  total_annual_salary: '',
  monthly_gross_pay: 30000
};


const earningsReducer = (state = initialState, action) => {
  switch (action.type) {
    case earningsTypes.SET_MONTHLY_INCOME: return composeNewState(state, 'monthly_income', action);
    case earningsTypes.SET_ADDITIONAL_INCOME: return composeNewState(state, 'additional_income', action);
    case earningsTypes.SET_HAVE_ADDITIONAL_INCOME: return composeNewState(state, 'have_additional_income', action);
    case earningsTypes.SET_TOTAL_ANNUAL_SALARY: return { ...state, total_annual_salary: action.payload };
    case earningsTypes.SET_MONTHLY_GROSS_PAY: return { ...state, monthly_gross_pay: action.payload };
    case CLEAR_EARNINGS: return initialState;
    default: return state;
  }
};

export default earningsReducer;