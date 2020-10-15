import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import earningsTypes from '../../store/types/earningsTypes';
import earningsActions from '../../store/actions/earningsActions';
import affordabilityActions from '../../store/actions/affordabilityActions';
import affordabilityTypes from '../../store/types/affordabilityTypes';
import { clearCommas, formatCurrencyInput } from '../../utils/currencyUtils';


const Wrapper = styled.div`
  /* & {
    padding: 3% 20px;
  }

  .application-summary-wrapper {
    display: flex;
    margin: 20% -20px;
    position: relative;
    flex-flow: column nowrap;
    padding-left: 2rem;
  }

  .application-summary-wrapper > * {
    color: #DBFFF5;
    padding: 30px;
  }

  .application-summary-wrapper > :nth-child(1) {
    background: #3B937A;
    z-index: 3;
    box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.44);
    position: relative;
    padding-top: 40px;
  } */

  /* .application-summary-wrapper .summary-value-wrapper h3 {
    font-size: 22px;
    line-height: 28px;
    z-index: 10;
  } */

  /* .application-summary-wrapper .summary-value-wrapper .monetary-value::before {
    content: '₦';
    line-height: 28px;
    z-index: 10;
  }

  .application-summary-wrapper > :nth-child(1) > :nth-child(1) {
    position: absolute;
    top: -19%;
    background: var(--primary-color);
    padding: 10px 10%;
    color: var(--white-color);
  }

  .application-summary-wrapper > :nth-child(2) {
    background: #91D1BF;
    z-index: 2;
    box-shadow: 0px 16px 58px rgba(39, 98, 81, 0.22);
  }

  .application-summary-wrapper > :nth-child(3) {
    background: var(--accent-color);
    z-index: 1;
  }

  .application-summary-wrapper > :nth-child(3) > * {
    z-index: 10;
  }

  .application-summary-wrapper p {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    z-index: 10;
  } */

  & {
    min-width: 180px;
    max-width: 250px;
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
    monthly_gross_pay, have_additional_income, additional_income,
    outstanding_loans, rate, tenure,
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

  return (
    <Wrapper className={`affordability-summary-section ${closed ? 'closed' : ''}`}>
      {/* <h2 className="section-heading">Home Loans.</h2>
      <h3 className="application-stage"><span></span> { heading }</h3>
      <p className="application-stage-description">
        Calculate the home loan you qualify for, and how much you can expect to
        pay monthly on your home loan repayments.
      </p> */}
      <div className="application-summary-wrapper">
        <div>
          <h3>Summary</h3>
          <div className="summary-value-wrapper">
            <p>Maximum Loanable</p>
            <h3 className="monetary-value">{formatCurrencyInput(max_loanable_amount || '')}</h3>
          </div>
        </div>
        <div>
          <div className="summary-value-wrapper">
            <p>Est. Monthly Repayment</p>
            <h3 className="monetary-value">{formatCurrencyInput(monthly_repayment || '')}</h3>
          </div>
        </div>
        <div>
          <div className="summary-value-wrapper">
            <p>Maximum Tenure</p>
            <h3>{maxTenure} years</h3>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = ({ affordability, earnings }, ownProps) => {
  return { ...affordability, ...earnings, ...ownProps };
};

export default connect(mapStateToProps)(SummarySection);