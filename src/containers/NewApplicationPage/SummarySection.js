import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import http from '../../config/axios.config';

import earningsTypes from '../../store/types/earningsTypes';
import earningsActions from '../../store/actions/earningsActions';
import affordabilityActions from '../../store/actions/affordabilityActions';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import { clearCommas, formatCurrencyInput } from '../../utils/currencyUtils';


const Wrapper = styled.div`
   & {
    padding: 3% 20px;
  }

    .application-summary-wrapper {
      background-color: var(--cool-green);
      margin: 30px 10px;
      margin-bottom: 2px;
      padding-top: 10px;
      border-radius: 6px;
      position: relative;
      // padding-left: 30px;  
      // flex-flow: row nowrap;
      width: 100%;
    }

    .affordability-summary-section{
      color: white;
    }

   .application-summary-wrapper > * {
       color: white ;
      padding: 10px ;
  }

    .application-summary-wrapper > :nth-child(1) {
      background: var(--cool-green);
      z-index: 3;
      box-shadow: 0px 0px 0px rgba(39, 98, 81, 0.44);
      position: relative;
      padding-top: 0px;
    } 

    .summary-value-wrapper{
      color: white !important;
      padding: 10px 5%;
    }

    .application-summary-wrapper .summary-value-wrapper h3 {
      font-size: 18px;
      line-height: 28px;
      z-index: 10;
    }
    .application-summary-wrapper .summary-value-wrapper  {
      width: 200px;
      margin-right: 50px;
    } 

    

    .application-summary-wrapper .summary-value-wrapper .monetary-value::before {
      content: '₦';
      line-height: 28px;
      z-index: 10;
    }

    .application-summary-wrapper > :nth-child(1) {
      position: absolute;
      background: var(--primary-color) !important;
      font-size: 20px;
      font-weight: 700;
      padding: 10px ;
      margin-bottom: 40px;
      width: 125px;
      top: -25px;
      left: 10px;
      color: white;
      border-radius: 5px;
    }

    .application-summary-wrapper > :nth-child(2) {
      background:  var(--cool-green);
      // z-index: 2;
      box-shadow: 0px 0px 0px rgba(39, 98, 81, 0.22);
      // padding-top: 86px;
      margin-left: 0px;
      margin-right: 0px;
    }

    .summary-value-wrapper > h3{
      font-weight: 500;
      font-size: 24px;
      line-height: 35.57px;
    }

    .application-summary-wrapper p {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      z-index: 10;
    } 

    h3 {
      font-size: 1.125rem;
    }

    & h3,
    .application-summary-wrapper .summary-value-wrapper h3 {
      font-weight: bold;
      z-index: 10 !important;
      line-height: 28px !important;
      font-size: 1.325rem !important;
    }

    // .application-summary-wrapper > h3{
    //   // position: absolute !important;
    //   // top: 0 !important;
    //   background-color: var(--primary-color) !important;
    // }

  @media screen and (max-width: 1200px) {
    .application-summary-wrapper > * {
      min-width: 150px;
    }
  }

  @media screen and (max-width: 768px) {
    & {
      z-index: 2;
      max-width: 85vw;
      position: absolute;
      padding-right: 32px;
      background: #ffffff;
    }
    

    &,
    & > * {
      transition-delay: 0s !important;
    }

    &.closed,
    &.closed > * {
      transform: translateX(-100vw) !important;
    }
  }
`;

const SummarySection = ({ heading, closed, ...rest }) => {
  let {
    monthly_gross_pay, outstanding_loans, rate, tenure,
    maxTenure, max_loanable_amount, monthly_repayment
  } = rest;

  const dispatch = useDispatch();
const [incomePercentage, setIncomePercentage] = useState(.333);

const calculateMonthlyPayment = (principal, rate, months) => {
let rate_plus_one = 1 + rate;
let rate_raise_to_Number_of_month = Math.pow(rate_plus_one, months);
let numerator = principal * rate * rate_raise_to_Number_of_month;
let denominator = rate_raise_to_Number_of_month - 1;
let monthly_payment = Math.round(numerator / denominator);
return monthly_payment;
};

const calculateLoanableAmount = () => {
let income = parseFloat(clearCommas(monthly_gross_pay));
if (isNaN(income)) income = 0;

    // if (have_additional_income === 'yes') {
    //   const additionalIncome = Number(clearCommas(additional_income));
    //   income += isNaN(additionalIncome) ? 0 : additionalIncome;
    // }

    if (outstanding_loans) {
      const otherObligations = Number(clearCommas(outstanding_loans));
      income -= isNaN(otherObligations) ? 0 : otherObligations;
    }

[rate, tenure] = [rate, tenure].map(el => parseInt(el, 10));
const months = tenure * 12;
rate = rate / 100 / 12;
const rate_plus_one = 1 + rate;
const rate_raise_to_Number_of_month = Math.pow(rate_plus_one, months);
const raise_to_power_month_minus_one = rate_raise_to_Number_of_month - 1;
const principal = Number(income) * incomePercentage;
const numerator = principal * raise_to_power_month_minus_one;
const denominator = rate * rate_raise_to_Number_of_month;
const loanable_amount = numerator / denominator;
const monthlyRepayment = Math.round(calculateMonthlyPayment(loanable_amount, rate, months));
const maxLoanableAmount = Math.round(loanable_amount);

dispatch(affordabilityActions[affordabilityTypes.SET_MONTHLY_REPAYMENT](monthlyRepayment));
dispatch(affordabilityActions[affordabilityTypes.SET_MAX_LOANABLE_AMOUNT](maxLoanableAmount));
}

useEffect(() => {
calculateLoanableAmount();
});

// useEffect(() => {
  // POST request using axios inside useEffect React hook
  // const article = { title: 'React Hooks POST Request Example' };
  // http.post(
  //   '/user/affordability-test',
    // 'https://staging.newhomes.ng/api/user/affordability-test',
  //   {
  //     monthly_gross_pay: 'police Deve',
  //     total_annual_pay: 'home',
  //     monthly_expenses: 0,
  //     payment_option: 'mortgage',
  //     ...values,
  //     tenure: 15,
  //     budget: affordability.budget,
  //     payment_option: affordability.payment_option,
  //     have_equity: 0
  //   }
  // );

// empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);

 

  return (
    <Wrapper className={`affordability-summary-section  ${closed ? 'closed' : ''}`}>
      {/* <h2 className="section-heading">Home Loans.</h2>
      <h3 className="application-stage"><span></span> { heading }</h3>
      <p className="application-stage-description">
        Calculate the home loan you qualify for, and how much you can expect to
        pay monthly on your home loan repayments.
      </p> */}
      <div className="application-summary-wrapper">
       <h3>Summary</h3>
        <div className="row">
          <div className= "col-md-4 col-sm-4">
            <div className="summary-value-wrapper">
              <p>Maximum Loanable</p>
              <h3 className="monetary-value">{formatCurrencyInput(max_loanable_amount || '') || '\t0,000,000'}</h3>
            </div>
          </div>
          <div className= "col-md-4 col-sm-4">
            <div className="  summary-value-wrapper">
              <p>Est. Monthly Repayment</p>
              <h3 className="monetary-value">{formatCurrencyInput(monthly_repayment || '') || '\t0,000,000'}</h3>
            </div>
          </div>
          <div className= "col-md-4 col-sm-4">
            <div className="  summary-value-wrapper">
              <p>Maximum Tenure</p>
              <h3>{maxTenure || '0'} {maxTenure > 1 ? "Years" : "Year"} </h3>
            </div>
          </div>
        </div>
      </div>
      
  </Wrapper>
  );
};

const mapStateToProps = ({ affordability, currentUser: { year_to_retirement }, earnings }, ownProps) => {
  return { ...affordability, ...earnings, tenure: year_to_retirement, maxTenure: year_to_retirement, ...ownProps };
};

export default connect(mapStateToProps)(SummarySection);