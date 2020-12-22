import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import http from '../../config/axios.config';
import axios from 'axios';
import PropTypes from "prop-types";

// import { affordabilityTest } from './../../store/actions/authActions';
import earningsTypes from '../../store/types/earningsTypes';
import earningsActions from '../../store/actions/earningsActions';
import affordabilityActions from '../../store/actions/affordabilityActions';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import { clearCommas, formatCurrencyInput } from '../../utils/currencyUtils';
import { BASE_URL } from '../../constants';


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
      font-size: 0.95rem !important;
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
    // & {
    //   z-index: 2;
    //   max-width: 85vw;
    //   position: absolute;
    //   padding-right: 32px;
    //   background: #ffffff;
    // }

    & h3,
    .application-summary-wrapper .summary-value-wrapper h3 {
      font-weight: bold;
      z-index: 10 !important;
      line-height: 28px !important;
      font-size: 0.725rem !important;
    }

    .row{
      flex-wrap: nowrap;
    }

    .application-summary-wrapper > :nth-child(1) {
      font-size: 14px !important;
      font-weight: 500;
      padding: 5px ;
      margin-bottom: 40px;
      width: 80px !important;
      min-width: 40px !important;
      // top: -25px;
      // left: 10px;
      // color: white;
      // border-radius: 5px;
    }

    .application-summary-wrapper {
      background-color: var(--cool-green);
      margin: 10px 2px;
      margin-bottom: 2px;
      padding: 5px;
      width: 100%;
      max-width: 370px;
    }

    .application-summary-wrapper * {
      padding: 3px;
    }
    
    .application-summary-wrapper .summary-value-wrapper h3 {
      font-size: 12px;
      line-height: 18px;
      z-index: 10;
    }
    .application-summary-wrapper .summary-value-wrapper p {
      margin-bottom: 0.2rem;
    }
    .application-summary-wrapper .summary-value-wrapper  {
      width: 100px;
      margin-right: 10px;
    } 

    .col-sm-3{
      padding-right: 3px;
      padding-left: 2px;
    }

    .monetary-value::before{
      font-size: 0.825rem !important;
      padding-right: 3px;
    }
    .section-heading{
      margin-top: 15px !important;
      font-size: 20px;
    }

    &,
    & > * {
      transition-delay: 0s !important;
    }

    &.closed,
    &.closed > * {
      // transform: translateX(-100vw) !important;
    }
  }
`;

const SummarySection = ({ heading, closed, backUser, ...rest }) => {
  let monthly_gross_pay = rest.monthly_gross_pay ? rest.monthly_gross_pay : backUser.monthly_gross_pay;
  let outstanding_loans = rest.outstanding_loans ? rest.outstanding_loans : backUser.outstanding_loans;
  let rate = rest.rate ? rest.rate : backUser.rate;
  let tenure = rest.tenure ? rest.tenure : backUser.tenure;
  let maxTenure = rest.maxTenure ? rest.maxTenure : backUser.maxTenure;
  let loanable_amount = rest.loanable_amount ? rest.loanable_amount : backUser.loanable_amount;
  let monthly_repayment = rest.monthly_repayment ? rest.monthly_repayment : backUser.monthly_repayment;

//   const dispatch = useDispatch();
// const [incomePercentage, setIncomePercentage] = useState(.333);

// const calculateMonthlyPayment = (principal, rate, months) => {
// let rate_plus_one = 1 + rate;
// let rate_raise_to_Number_of_month = Math.pow(rate_plus_one, months);
// let numerator = principal * rate * rate_raise_to_Number_of_month;
// let denominator = rate_raise_to_Number_of_month - 1;
// let monthly_payment = Math.round(numerator / denominator);
// return monthly_payment;
// };

// const calculateLoanableAmount = () => {
// let income = parseFloat(clearCommas(monthly_gross_pay));
// if (isNaN(income)) income = 0;

//     // if (have_additional_income === 'yes') {
//     //   const additionalIncome = Number(clearCommas(additional_income));
//     //   income += isNaN(additionalIncome) ? 0 : additionalIncome;
//     // }

//     if (outstanding_loans) {
//       const otherObligations = Number(clearCommas(outstanding_loans));
//       income -= isNaN(otherObligations) ? 0 : otherObligations;
//     }

// [rate, tenure] = [rate, tenure].map(el => parseInt(el, 10));
// const months = tenure * 12;
// rate = rate / 100 / 12;
// const rate_plus_one = 1 + rate;
// const rate_raise_to_Number_of_month = Math.pow(rate_plus_one, months);
// const raise_to_power_month_minus_one = rate_raise_to_Number_of_month - 1;
// const principal = Number(income) * incomePercentage;
// const numerator = principal * raise_to_power_month_minus_one;
// const denominator = rate * rate_raise_to_Number_of_month;
// const loanable_amount = numerator / denominator;
// const monthlyRepayment = Math.round(calculateMonthlyPayment(loanable_amount, rate, months));
// const maxLoanableAmount = Math.round(loanable_amount);

// dispatch(affordabilityActions[affordabilityTypes.SET_MONTHLY_REPAYMENT](monthlyRepayment));
// dispatch(affordabilityActions[affordabilityTypes.SET_MAX_LOANABLE_AMOUNT](maxLoanableAmount));
// }

// useEffect(() => {
// calculateLoanableAmount();
// });

// useEffect(() => {
//   console.log(rest)
//   axios.post(
//     `${BASE_URL}/user/affordability-test`,
//     {
//       monthly_gross_pay, outstanding_loans, rate, tenure,
//       maxTenure, loanable_amount, monthly_repayment
//     }
//   )
//   ;

// }, []);
// useEffect((props) => {
//   props.affordabilityTest(  {
//     monthly_gross_pay, outstanding_loans, rate, tenure,
//     maxTenure, loanable_amount, monthly_repayment
//   })
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
          <div className= "col-md-4 col-sm-3">
            <div className="summary-value-wrapper">
              <p>Maximum Loanable</p>
              <h3 className="monetary-value">{formatCurrencyInput(loanable_amount || '') || '\t0,000,000'}</h3>
            </div>
          </div>
          <div className= "col-md-4 col-sm-3">
            <div className="  summary-value-wrapper">
              <p>Est. Monthly Repayment</p>
              <h3 className="monetary-value">{formatCurrencyInput(monthly_repayment || '') || '\t0,000,000'}</h3>
            </div>
          </div>
          <div className= "col-md-4 col-sm-3">
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

// SummarySection.propTypes = {
//   affordabilityTest: PropTypes.func.isRequired,
// };

const mapStateToProps = ({ affordability, currentUser: { year_to_retirement }, auth, earnings }, ownProps) => {
  return { ...affordability, ...earnings, backUser: {...auth.currentUser}, tenure: year_to_retirement, maxTenure: year_to_retirement, ...ownProps };
};

export default connect(mapStateToProps)(SummarySection);