import React from "react";

import "./SingleApplicationDetails.css";
import * as Icon from "react-feather";
import { formatDate, toTitleCase } from "../../utils/dashboardUtils";
import { formatCurrencyInput } from "../../utils/currencyUtils";
import ApplicationFileIcon from "../ApplicationFileIcon";

const SingleApplicationDetails = ({ data, uploads }) => {
  return (
    <div className='fp-mortgage-application-loan-info-display'>
      <div className='fp-mortgage-application-reference-no-loan-status'>
        <div className='fp-mortgage-application-reference-no'>
          <span>Reference</span>
          <h4>{data.app_ref}</h4>
        </div>
        <div className='fp-mortgage-application-date'>
          <span>Application Submitted</span>
          <h4>{formatDate(data.created_at, "medium", "short")}</h4>
        </div>

        <div
          className={`fp-mortgage-application-status ${data.mortgage_status_name.toLowerCase()}`}
        >
          <span>Loan Status</span>
          <h4>{data.mortgage_status_name}</h4>
        </div>
      </div>
      <div className='fp-mortgage-loan-amount-repayment-interest-rate'>
        <div className='fp-mortgage-loan-amount-wrap'>
          <h2>{formatCurrencyInput(data.loan_amount)}</h2>
          <span>Loan Amount</span>
        </div>
        <div className='fp-mortgage-repayment'>
          <h2>{data.loan_tenure} years</h2>
          <span>Repayment period</span>
        </div>
        <div className='fp-mortgage-loan-interest-rate'>
          <h2>{data.lender.lender_rate ? data.lender.lender_rate : "N/A"}</h2>
          <span>Interest rate</span>
        </div>
      </div>
      <div className='fp-mortgage-loan-more-information'>
        <div className='fp-mortgage-loan-more-information-right'>
          <div className='fp-mortgage-loan-type-application-wrap'>
            <div className='fp-mortgage-loan-type'>
              <span>Loan Type</span>
              <h4>{toTitleCase(data.type)}</h4>
            </div>
            <div className='fp-mortgage-loan-application-type'>
              <p> Single Application</p>
            </div>
          </div>
          <div className='fp-mortgage-loan-property-address-wrap'>
            <span>Property Address</span>
            <h4>{data.property_address}</h4>
          </div>
          <div className='fp-mortgage-loan-property-address-wrap'>
            <span>Property Type</span>
            <h4>Terrace Duplex | 3 Bedroom</h4>
          </div>

          <div className='fp-mortgage-loan-property-address-wrap'>
            <span>Down Payment</span>
            <h4>₦ {formatCurrencyInput(data.down_payment)}</h4>
          </div>

          <div className='fp-mortgage-loan-property-address-wrap'>
            <span>Comments</span>
            <h4 className='text-break'>
              All clear here! I see no reason why the loan shouldn’t be
              approved. Papers check out, borrower info, property info e.t.c. We
              recommend the loan. Please proceed.
            </h4>
          </div>
        </div>
        <div className='fp-mortgage-loan-more-information-left'>
          <div className='fp-mortgage-loan-requirement-status'>
            <Icon.CheckCircle color='#55af1a' size='35' />
            <h4 className='text-wrap'>Borrower Eligibility</h4>
          </div>

          <div className='fp-mortgage-loan-requirement-status'>
            <Icon.CheckCircle color='#55af1a' size='35' />
            <h4 className='text-wrap'>Required Documents</h4>
          </div>

          <div className='fp-mortgage-loan-requirement-status'>
            <Icon.CheckCircle color='#55af1a' size='35' />
            <h4 className='text-wrap'>Borrower Verification</h4>
          </div>

          <div className='fp-mortgage-loan-requirement-status'>
            <Icon.CheckCircle color='#bbbbbb' size='35' />
            <h4 className='text-wrap'>Property Verification</h4>
          </div>
        </div>
      </div>
      <div className='fp-mortgage-loan-documents-uploads-actions'>
        <div className='fp-mortgage-loan-documents-uploads-actions-right'>
          {uploads
            .filter(file => file.filename)
            .map(file => {
              return (
                <ApplicationFileIcon
                  data={file}
                  key={file.id}
                  appRef={data.app_ref}
                />
              );
            })}
        </div>
        {/* <div className='fp-mortgage-loan-documents-uploads-actions-left'>
          <Link className='fp-dashboard-more-actions' to='/'>
            Actions <Icon.MoreHorizontal color='#fff' />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SingleApplicationDetails;
