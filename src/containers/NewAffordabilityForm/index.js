import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from "axios";

import { toTitleCase } from '../../utils/dashboardUtils';
import earningsTypes from '../../store/types/earningsTypes';
import { currencyFieldTransformer, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import affordabilityActions from '../../store/actions/affordabilityActions';
import { formatCurrencyInput, handleChangeRetriever } from '../../utils/currencyUtils';
// import { invalidValueErrorMessage, requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import { DEFAULT_RADIO_VALUES } from '../../constants';
import ButtonSpinner from '../ButtonSpinner';
import http from '../../config/axios.config';
import cookies from '../../utils/cookies';
import "./../../commons/TextFieldGroup/ProfileTextField.css";


const Wrapper = styled.div`
  .fp-save-result-button {
    color: white;
    background: teal;
    border-color: #009688;
    background-color: #009688;
  }
`;

const yesNo = DEFAULT_RADIO_VALUES;


// const integerError = 'Please input a whole number';

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

const validationSchema = (() => {
  return Yup.object().shape({
    have_equity: validations.requiredString,
    payment_option: validations.requiredString,
    monthly_expenses: validations.currencyField,
    outstanding_loans: validations.currencyField,
    monthly_gross_pay: validations.requiredCurrencyField,
    total_annual_salary: validations.requiredCurrencyField,
    equity_contribution: validations.currencyFieldWithWhen([
      'have_equity', {
        is: value => value === DEFAULT_RADIO_VALUES[0],
        then: validations.requiredCurrencyField
      }
    ]),
    budget: validations.currencyFieldWithWhen([
      'payment_option', {
        is: value => value === paymentOptionsWithBudget.includes(value),
        then: validations.requiredCurrencyField
      }
    ])
  });
});

const paymentOptionsWithBudget = ['Installment Payment', 'Rent to Own'];

const NewAffordabilityForm = ({
  setActiveTab, setFoundProperty, maxTenure, currentUser, alert,
  paymentOptions, setSubmittedAffordability, dispatch, selectedProperty,
  setPropertyStoreData, setSelectedProperty, submittedAffordability, ...rest
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
    const valuesCloned = {...values};
    valuesCloned.have_equity = Number(valuesCloned.have_equity === 'yes');
    valuesCloned.down_payment = valuesCloned.equity_contribution;
    delete valuesCloned.budget;
    delete valuesCloned.payment_option;
    delete valuesCloned.equity_contribution;
    try {
      if (submittedAtLeastOnce || submittedAffordability) {
        if (!selectedProperty) return alert();
        return await setPropertyStoreData(selectedProperty);
        // setActiveTab(2);
      }
      
      const { data: { data: { token } }} = await axios.post(
        // '/save-profile', 
        'https://staging.newhomes.ng/api/police/profile',
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
    <Wrapper className="container affordability-forms-wrapper ">
      <Formik
        initialValues={{
          budget: rest.budget,
          have_equity: rest.have_equity,
          payment_option: rest.payment_option,
          monthly_expenses: rest.monthly_expenses,
          outstanding_loans: rest.outstanding_loans,
          monthly_gross_pay: rest.monthly_gross_pay,
          total_annual_salary: rest.total_annual_salary,
          equity_contribution: rest.equity_contribution,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
          const { 
            have_equity, outstanding_loans, monthly_gross_pay, budget,
            total_annual_salary, equity_contribution, monthly_expenses, payment_option
          } = values;
          return (
            <Form className="form-main">
              <div className=" row">
                <div className="col-md-6 col-12 form-group">
                 
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='annually'
                    placeholder="30,000,000"
                    onBlur={handleBlur}
                    name='total_annual_salary'
                    className='form-control'
                    value={formatCurrencyInput(total_annual_salary)}
                    onChange={getHandleChange(handleChange, earningsTypes.SET_TOTAL_ANNUAL_SALARY, true)}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area2"
                  />
                   <label className="form-label">What is your total salary?(#) <sup>*</sup></label>
                </div>
                <div className="col-md-6 col-12 form-group">
                  
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='monthly'
                    placeholder="300,000"
                    onBlur={handleBlur}
                    name='monthly_gross_pay'
                    className='form-control'
                    value={formatCurrencyInput(monthly_gross_pay)}
                    onChange={getHandleChange(handleChange, earningsTypes.SET_MONTHLY_GROSS_PAY, true)}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area2"
                  />
                  <label className="form-label">What is your monthly salary? <sup>*</sup></label>
                </div>
              </div>
              <div className=" row">
                <div className="form-group col-md-12">
                  <div className='row'>
                    {/* {
                      yesNo.map((item, index) => {
                        const checked = item === have_equity;
                        return ( */}
                          <div
                            // key={index}
                            className="col-6 col-md-6"
                          >
                            {/* <input
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
                            /> */}
                                  <WrappedSelectWithError
                                      textKey='option'
                                      name="have_equity"
                                      value={values.have_equity}
                                      extractValue={({ option }) => option}
                                      options={['no', 'yes']}
                                      onBlur={handleBlur}
                                      onChange={({ target }) => {
                                        if (target.value === 'no') {
                                          getHandleChange(
                                            handleChange, affordabilityTypes.SET_EQUITY_CONTRIBUTION
                                          )({ target: { name: 'equity_contribution', value: '' } });
                                        }
                                        getHandleChange(handleChange, affordabilityTypes.SET_HAVE_EQUITY)({ target });
                                      }}
                                      {...{ errors, touched }}
                                      className="form-control form-control-lg form-area"
                                    />
                            {/* <label className="text--capitalize form-label">Do you have Equity</label> */}
                            <label className="form-label">Do you have equity? <sup>*</sup> </label>
                          </div>
                        {/* ); */}
                      {/* })
                    } */}
                  </div>
                </div>
              </div>
              {
                have_equity === DEFAULT_RADIO_VALUES[0] ? (
                  <div className=' row'>
                    <div className="col-md-6 col-12 column form-group">
                      
                      <WrappedInputWithError
                        // prepend='₦'
                        type="text"
                        append='monthly'
                        placeholder="300,000"
                        onBlur={handleBlur}
                        name='equity_contribution'
                        className='form-control'
                        value={formatCurrencyInput(equity_contribution)}
                        onChange={getHandleChange(handleChange, affordabilityTypes.SET_EQUITY_CONTRIBUTION, true)}
                        {...{ errors, touched }}
                        className="form-control form-control-lg form-area2"
                      />
                      <label className="form-label">How much equity do you have? <sup>*</sup></label>
                    </div>
                  </div>
                ) : ''
              }

              <div className="form-group row">
                <div className="col-md-6 col-12 ">
                  
                  <WrappedSelectWithError
                    textKey='option'
                    name='payment_option'
                    value={values.payment_option}
                    extractValue={({ option }) => option}
                    options={[{ option: 'Select a payment option' }, ...paymentOptions]}
                    onBlur={handleBlur}
                    onChange={({ target }) => {
                      if (!paymentOptionsWithBudget.includes(target.value)) {
                        getHandleChange(
                          handleChange, affordabilityTypes.SET_BUDGET
                        )({ target: { name: 'budget', value: '' } });
                      }
                      getHandleChange(handleChange, affordabilityTypes.SET_PAYMENT_OPTION)({ target });
                    }}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area"
                  />
                  <label className="form-label">
                    Payment Option <sup>*</sup>
                  </label>
                </div>
                {
                  paymentOptionsWithBudget.includes(payment_option) ? (() => {
                    const isInstallment = payment_option === paymentOptionsWithBudget[0];
                      return (
                      <div className="col-md-6 col-12">
                        
                        <WrappedInputWithError
                          // prepend='₦'
                          type="text"
                          name='budget'
                          append={isInstallment ? 'annual' : 'monthly'}
                          onBlur={handleBlur}
                          placeholder="300,000"
                          value={formatCurrencyInput(budget)}
                          onChange={getHandleChange(handleChange, affordabilityTypes.SET_BUDGET, true)}
                          {...{ errors, touched }}
                          className="form-control form-control-lg form-area2"
                        />
                        <label className="form-label">
                          {isInstallment ? 'Annual' : 'Monthly'} Budget
                        </label>
                      </div>
                    );
                  })() : ''
                }
              </div>

              <div className="row">
                <div className="col-md-6 col-12 form-group ">
                  
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='monthly'
                    onBlur={handleBlur}
                    placeholder="300,000"
                    name='monthly_expenses'
                    value={formatCurrencyInput(monthly_expenses)}
                    onChange={getHandleChange(handleChange, affordabilityTypes.SET_MONTHLY_EXPENSES, true)}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area2"
                  />
                  <label className="form-label">
                    Monthly Expenses
                  </label>
                </div>
                <div className="col-md-6 col-12 form-group ">
                  
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='monthly'
                    onBlur={handleBlur}
                    placeholder="300,000"
                    name='outstanding_loans'
                    value={formatCurrencyInput(outstanding_loans)}
                    onChange={getHandleChange(handleChange, affordabilityTypes.SET_OUTSTANDING_LOANS, true)}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area2"
                  />
                  <label className="form-label">
                    Existing Loan Repayments
                  </label>
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
                <div className='col-md-6 px-3'>
                    <button
                      type='button'
                      disabled={isSubmitting}
                      className='w-150 mb-3'
                      onClick={() => {
                        // setSuccess(false);
                        setActiveTab(0)
                      }}
                    >
                      Previous
                    </button>
                </div>
                
                {/* {
                  (submittedAtLeastOnce || submittedAffordability) ? (
                    <div className='col-md-6 col-sm-12'>
                      <button
                        type='button'
                        disabled={isSubmitting}
                        onClick={() => {
                          setSelectedProperty(null);
                          setActiveTab(2); */}
                          {/* setsubmittedAtLeastOnce(false); */}
                          {/* resetForm(); */}
                        {/* }}
                        className=' w-100 fp-save-result-button m-0 d-flex align-items-center justify-content-center btn-block mb-3'
                      > */}
                        {/* <RefreshCw size='22px' color='#00b1ab' /> */}
                        {/* proceed to property request
                      </button>
                    </div>
                  ) : ''
                } */}


                {
                  (submittedAtLeastOnce || submittedAffordability) ? (
                    <div className='col-md-6 col-sm-12'>
                      <button
                        type='button'
                        disabled={isSubmitting}
                        rel='noopener noreferrer'
                        data-toggle="modal" data-target="#myModal2"
                        className=' w-100 fp-save-result-button m-0 d-flex align-items-center justify-content-center btn-block mb-3'
                      > 
                        {/* <RefreshCw size='22px' color='#00b1ab' /> */}
                        Select prefered property
                      </button>
                    </div>
                  ) : 
                    (<div className={`col-md-${(submittedAtLeastOnce || submittedAffordability) ? 6 : 6} col-sm-12`}>
                      <button
                        type='submit'
                        className='w-100'
                        disabled={isSubmitting}
                      >
                        {
                          isSubmitting ? (
                            <ButtonSpinner />
                          ) : 'submit'
                        }
                      </button>
                    </div>)
                }
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