import types from '../types/affordabilityTypes';
import { composeNewState } from './composeNewState';


const initialState = {
  age: 20,
  rate: 18,
  tenure: 20,
  budget: '',
  isNhf: false,
  maxTenure: 30,
  loan_amount: 0,
  property_value: '',
  payment_option: '',
  monthly_payment: "",
  monthly_repayment: 0,
  other_obligations: "",
  equity_contribution: '',
  loanable_amount: "",
  have_other_obligations: "no",
  outstanding_loans: '',
  monthly_expenses: '',
  have_equity: 'no'
  // co_borrower: "",
  // co_borrower_gross_income: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AGE: return composeNewState(state, 'age', action);
    case types.SET_RATE: return composeNewState(state, 'rate', action);
    case types.SET_IS_NHF: return composeNewState(state, 'isNhf', action);
    case types.SET_TENURE: return composeNewState(state, 'tenure', action);
    case types.SET_MAX_TENURE: return composeNewState(state, 'maxTenure', action);
    case types.SET_LOAN_AMOUNT: return composeNewState(state, 'loan_amount', action);
    case types.SET_PROPERTY_VALUE: return composeNewState(state, 'property_value', action);
    case types.SET_MONTHLY_PAYMENT: return composeNewState(state, 'monthly_payment', action);
    case types.SET_MONTHLY_REPAYMENT: return composeNewState(state, 'monthly_repayment', action);
    case types.SET_OTHER_OBLIGATIONS: return composeNewState(state, 'other_obligations', action);
    case types.SET_HAVE_EQUITY: return composeNewState(state, 'have_equity', action);
    case types.SET_OUTSTANDING_LOANS: return composeNewState(state, 'outstanding_loans', action);
    case types.SET_MAX_LOANABLE_AMOUNT: return composeNewState(state, 'loanable_amount', action);
    case types.SET_EQUITY_CONTRIBUTION: return composeNewState(state, 'equity_contribution', action);
    case types.SET_MONTHLY_EXPENSES: return composeNewState(state, 'monthly_expenses', action);
    case types.SET_PAYMENT_OPTION: return composeNewState(state, 'payment_option', action);
    case types.SET_BUDGET: return composeNewState(state, 'budget', action);
    case types.SET_HAVE_OTHER_OBLIGATIONS: return composeNewState(state, 'have_other_obligations', action);
    default: return { ...state };
  }
};
