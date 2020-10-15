import React from "react";

import "./TotalLoanAmount.css";
import { formatCurrencyInput } from "../../utils/currencyUtils";

const TotalLoanAmount = ({ loan_amount }) => {
  return (
    <div className='fp-mortgage-application-loan-value'>
      <h2>{ formatCurrencyInput(loan_amount) }</h2>
      <p>Total loan value</p>
      {/* <div className='fp-mortgage-application-loan-value-pattern'></div> */}
    </div>
  );
}

export default TotalLoanAmount;
