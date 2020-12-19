import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import axios from "axios";
import { DEFAULT_RADIO_VALUES, BASE_URL, USER_AFFORDABILITY_URL, USER_PROFILE_URL} from "../../constants";

import { toTitleCase } from '../../utils/dashboardUtils';
import earningsTypes from '../../store/types/earningsTypes';
import { currencyFieldTransformer, validations } from '../../utils/yupUtils';
import WrappedInput, { WrappedInputWithError, WrappedSelectWithError } from '../WrappedInput';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import affordabilityActions from '../../store/actions/affordabilityActions';
import { formatCurrencyInput, handleChangeRetriever } from '../../utils/currencyUtils';
// import { invalidValueErrorMessage, requiredFieldErrorMessage } from '../../utils/validationMessageUtils';
import ButtonSpinner from '../ButtonSpinner';
import http from '../../config/axios.config';
import cookies from '../../utils/cookies';
import "./../../commons/TextFieldGroup/ProfileTextField.css";
import Modal from "./../../commons/Modal";
import isEmpty from '../../validation/is_Empty';


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
    total_annual_pay: validations.requiredCurrencyField,
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
  setPropertyStoreData, setSelectedProperty, submittedAffordability, backUser, ...rest
}) => {
  const [submittedAtLeastOnce, setsubmittedAtLeastOnce] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

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
    valuesCloned.monthly_gross_pay = Number(valuesCloned.monthly_gross_pay);
    // delete valuesCloned.budget;
    delete valuesCloned.equity_contribution;
    try {
      if (submittedAtLeastOnce || submittedAffordability) {
        // if (!selectedProperty) return alert();
        if (!selectedProperty) setActiveTab(2);
        return await setPropertyStoreData(selectedProperty);
        // setActiveTab(2);
      }
      console.log(valuesCloned)
      
      const { data: { data: { token } }} = await axios.post(
        // `${BASE_URL}${USER_PROFILE_URL}`, 
        // 'https://staging.newhomes.ng/api/police/profile',
        `${BASE_URL}${USER_AFFORDABILITY_URL}`,
        {...valuesCloned, loanable_amount: rest.max_loanable_amount}
      );
      // if (token) {
      //   cookies.set('token', token);
      //   localStorage.setItem('token', token);
      //   http.defaults.headers.Authorization = `Bearer ${token}`;
      // }
      setsubmittedAtLeastOnce(true);
      setSubmittedAffordability(true);
      setSelectedProperty(null);
      setActiveTab(2);
    } catch (error) { console.log(error) }
  };

  return (
    <Wrapper className="container affordability-forms-wrapper ">
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          budget: rest.budget ? Number(rest.budget) : (!isEmpty(backUser.budget) ? backUser.budget : ""),
          have_equity: rest.have_budget ? rest.have_budget : (!isEmpty(backUser.have_budget) ? backUser.have_budget : "no"),
          payment_option: rest.payment_option ? rest.payment_option : (!isEmpty(backUser.payment_option) ? backUser.payment_option : ""),
          monthly_expenses: rest.monthly_expenses ? Number(rest.monthly_expenses) : (!isEmpty(backUser.monthly_expenses) ? backUser.monthly_expenses : ""),
          outstanding_loans:  rest.outstanding_loans ? Number(rest.outstanding_loans) : (!isEmpty(backUser.outstanding_loans) ? backUser.outstanding_loans : ""),
          monthly_gross_pay: rest.monthly_gross_pay ? Number(rest.monthly_gross_pay) : (!isEmpty(backUser.monthly_gross_pay) ? backUser.monthly_gross_pay : ""),
          total_annual_pay: rest.total_annual_pay ? Number(rest.total_annual_pay) : (!isEmpty(backUser.total_annual_pay) ? backUser.total_annual_pay : ""),
          equity_contribution: rest.equity_contribution ? rest.equity_contribution : (!isEmpty(backUser.equity_contribution) ? backUser.equity_contribution : ""),
        }}
        // initialValues={{
        //   ...(() => {
        //     const {
        //       budget, have_equity, payment_option, monthly_expenses,
        //       outstanding_loans, monthly_gross_pay, total_annual_salary,equity_contribution
        //     } = rest;

        //     return {
        //       budget, have_equity, payment_option, monthly_expenses,
        //       outstanding_loans, monthly_gross_pay, total_annual_salary,equity_contribution
        //     };
        //   })()
        // }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
          const { 
            have_equity, outstanding_loans, monthly_gross_pay, budget,
            total_annual_pay, equity_contribution, monthly_expenses, payment_option
          } = values;
          return (
            <Form className="form-main">
              <div className=" row">
                <div className="col-md-6 col-12 form-group">
                 
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='Annually'
                    placeholder="30,000,000"
                    onBlur={handleBlur}
                    name='total_annual_pay'
                    className='form-control'
                    value={formatCurrencyInput(total_annual_pay)}
                    onChange={getHandleChange(handleChange, earningsTypes.SET_TOTAL_ANNUAL_PAY, true)}
                    {...{ errors, touched }}
                    className="form-control form-control-lg form-area2"
                  />
                   <label className="form-label">What is your total salary?(#) <sup>*</sup></label>
                </div>
                <div className="col-md-6 col-12 form-group">
                  
                  <WrappedInputWithError
                    // prepend='₦'
                    type="text"
                    append='Monthly'
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
                    <div className="col-12 col-md-6 form-group">
                          <WrappedSelectWithError
                                name="have_equity"
                                value={have_equity}
                                options={['select','no', 'yes']}
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
                      <label className="form-label">Do you have equity? <sup>*</sup> </label>
                    </div>
                    {/* Payment Option */}

                    <div className="col-md-6 col-12 form-group">
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
              </div>

              <div className=" row">
                {/* Equity Output */}
                {
                have_equity === DEFAULT_RADIO_VALUES[0] ? (
                    <div className="col-md-6 col-12 form-group">
                      <WrappedInputWithError
                        // prepend='₦'
                        type="text"
                        append='Monthly'
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
                  ) : ''
                }
                {/* Installment Payment Output */}
                {
                  paymentOptionsWithBudget.includes(payment_option) ? (() => {
                    const isInstallment = payment_option === paymentOptionsWithBudget[0];
                      return (
                      <div className="col-md-6 col-12 form-group">
                        
                        <WrappedInputWithError
                          // prepend='₦'
                          type="text"
                          name='budget'
                          append={isInstallment ? 'Annual' : 'Monthly'}
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
                    append='Monthly'
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
                    append='Monthly'
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

              <div className='row '>
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

                {/* property submit button */}
                {/* {
                  (submittedAtLeastOnce || submittedAffordability) ? 
                    (
                      (<div className='col-md-6 col-sm-12'>
                          <button
                            type='button'
                            disabled={isSubmitting}
                            rel='noopener noreferrer'
                            data-toggle="modal" data-target="#myModal2"
                            className=' w-100 fp-save-result-button m-0 d-flex align-items-center justify-content-center btn-block mb-3'
                          > 
                            Select prefered property
                          </button>
                        </div>)
                    ): */}
                    <div className={`col-md-${(submittedAtLeastOnce || submittedAffordability) ? 6 : 6} col-sm-12`}>
                      <button
                        type='submit'
                        rel='noopener noreferrer'
                        className='w-100'
                        disabled={isSubmitting}
                      >
                        {
                          isSubmitting ? (
                            <ButtonSpinner />
                          ) : 'Choose Property'
                        }
                      </button>
                    </div>
                {/* } */}
              </div>

              {/* choosing property modal */}
              {/* <!-- Modal --> */}
              {/* { modalStatus && (<Modal closeModal={() => setModalStatus(false)}> <p>The content of the modal</p></Modal>)} */}
              {/* {
                  ((submittedAtLeastOnce || submittedAffordability) && selectedProperty) ? (
              <button
                        type='submit'
                        className='w-100'
                        disabled={isSubmitting}
                      >
                        {
                          isSubmitting ? (
                            <ButtonSpinner />
                          ) : 'submit Your property of choice'
                        }
                </button>
                  ) : ""} */}
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};


const mapStateToProps = ({ affordability, earnings, auth, currentUser}, ownProps) => {
  return { ...affordability, currentUser : {...currentUser}, backUser : {...auth.currentUser}, ...earnings, properties: [], ...ownProps };
}

 
export default connect(mapStateToProps)(NewAffordabilityForm);