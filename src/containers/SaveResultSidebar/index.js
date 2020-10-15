import React from "react";
import "./SaveResultSidebar.css";
import { formatCurrencyInput } from "../../utils/currencyUtils";


const SaveResultSidebar = ({ affordabilityData, property_value }) => {
  const { maxLoanableAmount, monthly_payment } = affordabilityData;
  return (
    <div className='col-md-5 fp-eligibility-test-sidebar'>
      <div className='fp-eligibility-test-sidebar-wrapper'>
        <div className='fp-affordability-test-loanable-amount'>
          <span>Maximum Loanable Amount</span>
          <h2>₦ { formatCurrencyInput(maxLoanableAmount) }</h2>
        </div>
        <hr></hr>
        <div className='fp-affordability-test-monthly-repayment'>
          <span>Estimated Monthly Repayment</span>
          <h2>₦ { formatCurrencyInput(monthly_payment) }</h2>
        </div>
        <hr></hr>
        <div className='fp-affordability-test-monthly-repayment'>
          <span>Preferred Property Value</span>
          <h2>₦ { property_value ? formatCurrencyInput(property_value) : 'N/A' }</h2>
        </div>
      </div>
    </div>
  );
}
 
export default SaveResultSidebar;
