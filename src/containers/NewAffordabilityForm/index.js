import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { toTitleCase } from '../../utils/dashboardUtils';
import earningsTypes from '../../store/types/earningsTypes';
import { currencyFieldTransformer, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError } from '../WrappedInput';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import affordabilityActions from '../../store/actions/affordabilityActions';
import { formatCurrencyInput, handleChangeRetriever } from '../../utils/currencyUtils';
import { invalidValueErrorMessage, requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import { DEFAULT_RADIO_VALUES } from '../../constants';
import ButtonSpinner from '../ButtonSpinner';
import { RefreshCw } from 'react-feather';
import http from '../../config/axios.config';
import cookies from '../../utils/cookies';


const Wrapper = styled.div`

`;

const yesNo = DEFAULT_RADIO_VALUES;


const integerError = 'Please input a whole number';

const getMinMaxTenure = (age) => {
  age = parseInt(age, 10);
  let max = 30;
  let min = 1;
  if (!isNaN(age) && age) {
    max = 60 - age;
    if (!(max >= 1)) {
      max = 0;
      min = 0;
    } else if (max >= 30) {
      max = 30;
    }
  }

  return { min, max };
};

/**
 * Total Annual Salary
Monthly Gross Salary
Outstanding Loans
Affordability Property Request
Monthly Expenses
Do You Have Equity (Yes/No)?
Yes (How Much)
 */
const validationSchema = (() => {
  return Yup.object().shape({
    have_equity: validations.requiredString,
    monthly_expenses: validations.currencyField,
    outstanding_loans: validations.currencyField,
    monthly_gross_pay: validations.requiredCurrencyField,
    total_annual_salary: validations.requiredCurrencyField,
    equity_contribution: validations.currencyFieldWithWhen([
      'have_equity', {
        is: value => value === DEFAULT_RADIO_VALUES[0],
        then: validations.requiredCurrencyField
      }
    ])
  });
});


const NewAffordabilityForm = ({
  setActiveTab, setFoundProperty, maxTenure, currentUser,
  setSubmittedAffordability, dispatch, ...rest
}) => {
  const [submittedAtLeastOnce, setsubmittedAtLeastOnce] = useState(false);

  const getHandleChange = handleChangeRetriever(dispatch);

  useEffect(() => {
    setFoundProperty(false);
    const [dd, mm, yyyy] = currentUser.dob.split('/');
    const dob = new Date(`${mm}-${dd}-${yyyy}`).getFullYear();
    const thisYear = new Date().getFullYear();
    const calculatedAge = thisYear - dob;
    dispatch(affordabilityActions[affordabilityTypes.SET_AGE](calculatedAge));
    const { max } = getMinMaxTenure(calculatedAge);
    dispatch(affordabilityActions[affordabilityTypes.SET_MAX_TENURE](max));
  }, []);

  
  const handleSubmit = async (values) => {
    if (submittedAtLeastOnce) return setActiveTab(2);
    const valuesCloned = {...values};
    valuesCloned.have_equity = Number(valuesCloned.have_equity === 'yes');
    valuesCloned.down_payment = valuesCloned.equity_contribution;
    delete valuesCloned.equity_contribution;
    try {
      const { data: { data: { token } }} = await http.post(
        '/police/profile',
        {...currentUser, ...valuesCloned, loanable_amount: rest.max_loanable_amount}
      );
      if (token) {
        cookies.set('token', token);
        http.defaults.headers.Authorization = `Bearer ${token}`;
      }
      setsubmittedAtLeastOnce(true);
      setSubmittedAffordability(true);
    } catch (error) { console.log(error) }
  };

  return (
    <Wrapper className="container affordability-forms-wrapper">
      <Formik
        initialValues={{
          have_equity: rest.have_equity,
          monthly_expenses: rest.monthly_expenses,
          outstanding_loans: rest.outstanding_loans,
          monthly_gross_pay: rest.monthly_gross_pay,
          total_annual_salary: rest.total_annual_salary,
          equity_contribution: rest.equity_contribution,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, resetForm }) => {
          const { 
            have_equity, outstanding_loans, monthly_gross_pay,
            total_annual_salary, equity_contribution, monthly_expenses
          } = values;
          return (
            <Form>
              <div className="form-group row">
                <div className="col-md-6 col-12 column">
                  <label>What is your total annual salary? <sup>*</sup></label>
                  <WrappedInputWithError
                    prepend='₦'
                    type="text"
                    append='annually'
                    placeholder="30,000,000"
                    onBlur={handleBlur}
                    name='total_annual_salary'
                    className='form-control'
                    value={formatCurrencyInput(total_annual_salary)}
                    onChange={getHandleChange(handleChange, earningsTypes.SET_TOTAL_ANNUAL_SALARY, true)}
                    {...{ errors, touched }}
                  />
                </div>
                <div className="col-md-6 col-12 column">
                  <label>What is your monthly gross salary? <sup>*</sup></label>
                  <WrappedInputWithError
                    prepend='₦'
                    type="text"
                    append='monthly'
                    placeholder="300,000"
                    onBlur={handleBlur}
                    name='monthly_gross_pay'
                    className='form-control'
                    value={formatCurrencyInput(monthly_gross_pay)}
                    onChange={getHandleChange(handleChange, earningsTypes.SET_MONTHLY_GROSS_PAY, true)}
                    {...{ errors, touched }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <label>Do you have equity? <sup>*</sup> </label>
                  <div className='row'>
                    {
                      yesNo.map((item, index) => {
                        const checked = item === have_equity;
                        return (
                          <div
                            key={index}
                            className="col-6"
                          >
                            <input
                              type="radio"
                              value={item}
                              checked={checked}
                              onBlur={handleBlur}
                              className="form-radio"
                              name="have_equity"
                              onChange={({ target }) => {
                                if (target.value === 'no') {
                                  getHandleChange(
                                    handleChange, affordabilityTypes.SET_EQUITY_CONTRIBUTION
                                  )({ target: { name: 'equity_contribution', value: '' } });
                                }
                                getHandleChange(handleChange, affordabilityTypes.SET_HAVE_EQUITY)({ target });
                              }}
                              required
                            />
                            <label className="text--capitalize">{toTitleCase(item)}</label>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              </div>
              {
                have_equity === DEFAULT_RADIO_VALUES[0] ? (
                  <div className='form-group row'>
                    <div className="col-md-6 col-12 column">
                      <label>How much equity do you have? <sup>*</sup></label>
                      <WrappedInputWithError
                        prepend='₦'
                        type="text"
                        append='monthly'
                        placeholder="300,000"
                        onBlur={handleBlur}
                        name='equity_contribution'
                        className='form-control'
                        value={formatCurrencyInput(equity_contribution)}
                        onChange={getHandleChange(handleChange, affordabilityTypes.SET_EQUITY_CONTRIBUTION, true)}
                        {...{ errors, touched }}
                      />
                    </div>
                  </div>
                ) : ''
              }
              <div className="form-group row">
                <div className="col-md-6 col-12">
                  <label>
                    Monthly Expenses
                  </label>
                  <WrappedInputWithError
                    prepend='₦'
                    type="text"
                    append='monthly'
                    onBlur={handleBlur}
                    placeholder="300,000"
                    name='monthly_expenses'
                    value={formatCurrencyInput(monthly_expenses)}
                    onChange={getHandleChange(handleChange, affordabilityTypes.SET_MONTHLY_EXPENSES, true)}
                    {...{ errors, touched }}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <label>
                    Existing Loan Repayments
                  </label>
                  <WrappedInputWithError
                    prepend='₦'
                    type="text"
                    append='monthly'
                    onBlur={handleBlur}
                    placeholder="300,000"
                    name='outstanding_loans'
                    value={formatCurrencyInput(outstanding_loans)}
                    onChange={getHandleChange(handleChange, affordabilityTypes.SET_OUTSTANDING_LOANS, true)}
                    {...{ errors, touched }}
                  />
                </div>
              </div>

              {/* <div className='row form-group'>
                <div className='col-md-6 col-12 column'>
                  <label>Preferred Location?</label>
                  <input
                    type="text"
                    name='location'
                    value={values.location}
                    className='form-control'
                    placeholder="e.g. Lekki"
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              <div className='row mt-5'>
                {
                  submittedAtLeastOnce ? (
                    <div className='col-md-4 col-sm-12'>
                      <button
                        type='button'
                        disabled={isSubmitting}
                        onClick={() => {
                          setsubmittedAtLeastOnce(false);
                          resetForm();
                        }}
                        className='btn fp-save-result-button m-0 d-flex align-items-center justify-content-center btn-block mb-3'
                      >
                        <RefreshCw size='22px' color='#00b1ab' />
                      </button>
                    </div>
                  ) : ''
                }
                <div className={`col-md-${submittedAtLeastOnce ? 8 : 12} col-sm-12`}>
                  <button
                    type='submit'
                    className='w-100'
                    disabled={isSubmitting}
                  >
                    {
                      isSubmitting ? (
                        <ButtonSpinner />
                      ) : submittedAtLeastOnce ? 'proceed to request property' : 'submit'
                    }
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};


const mapStateToProps = ({ affordability, earnings, currentUser }, ownProps) => {
  return { ...affordability, currentUser, ...earnings, properties: [], ...ownProps };
}
 
export default connect(mapStateToProps)(NewAffordabilityForm);