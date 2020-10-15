import React from "react";
import {Link} from "react-router-dom";
import * as Icon from "react-feather";


// import fbnMortgageIcon from "../Resource/fbnMortgageIcon.png";
import {
  formatDate,
  toTitleCase,
  fetchApplicationData,
  cleanApplicationData,
  fetchExistingApplication
} from "../../utils/dashboardUtils";
import {formatCurrencyInput} from "../../utils/currencyUtils";
import BrowserStorage from "../../utils/browserStorageUtils";

// const styles = {
//   LenderImage: {
//     backgroundImage: `url(${fbnMortgageIcon})`
//   }
// };

const ApplicationListItem = ({ data, setEditApplicationData, history, index, isLoading }) => {
  const { usertype } = BrowserStorage.getUserData();
  const isUser = usertype === 'user';
  const applyButtonClass = 'fp-application-blank-detail-cta-btn text-center';
  const applyButtonText = index ? 'Apply for NHF' : 'Apply for Regular Mortgage';

  const fetchExistingApplicationData = async slug => {
    try {
      await fetchExistingApplication(slug, setEditApplicationData);
      history.push(`/mortgage/application/${data.slug}/edit`);
    } catch (error) {}
  };

  return (
    <div className='d-flex position-relative'>
      {
        data ? (() => {
          const isIncomplete = data.mortgage_status_name.toLowerCase() !== 'submitted';
          return (
            <div className='col-md-6 mr-2 p-0'>
              <div className='fp-mortgage-application-list'>
                <div className='fp-application-details'>
                  <div className='fp-mortgage-reference-no-status'>
                    <div className='fp-mortgage-reference-no'>
                      <span>Reference</span>
                      <h4>{data.app_ref}</h4>
                    </div>
                    <div className='fp-mortgage-status'>
                      <span
                        className={`badge ${data.mortgage_status_name.toLowerCase()}`}
                      >
                        {data.mortgage_status_name}
                      </span>
                    </div>
                  </div>
                  <div className='fp-mortgage-loan-amount'>
                    <span>Loan Amount</span>
                    <h4>
                      {data.loan_amount
                        ? formatCurrencyInput(data.loan_amount)
                        : "N/A"}
                    </h4>
                  </div>
                  <div className='fp-mortgage-application-date-loan-type'>
                    <div className='fp-mortgage-application-date'>
                      <span>Application Date</span>
                      <h4>{formatDate(data.created_at, "medium")}</h4>
                    </div>
                    <div className='fp-mortgage-application-loan-type'>
                      <span>Loan Type</span>
                      <h4>{toTitleCase(data.type)}</h4>
                    </div>
                  </div>
                  <div className='fp-mortgage-application-lender-interest'>
                    <div className='fp-mortgage-application-lender'>
                      <span>Lender</span>
                      <h4 className='text-break'>
                        {data.lender.lender_name ? data.lender.lender_name : "N/A"}
                      </h4>
                    </div>
                    <div className='fp-mortgage-application-interest'>
                      <span>Interest</span>
                      <h4 className='color-theme'>
                        {data.lender.lender_rate
                          ? `${data.lender.lender_rate}%`
                          : "N/A"}
                      </h4>
                    </div>
                  </div>
                  <div className='fp-mortgage-application-document-view'>
                    <div className='fp-mortgage-application-document'>
                      <Icon.File color='#555555' size='25px' />
                      <span className='fp-badge badge badge-primary badge-pill'>
                        0
                      </span>
                      <p>Documents</p>
                    </div>
                    <div className='fp-divider'></div>
                    <div className='fp-mortgage-application-view'>
                      {(() => {
                        const style = { color: '#555555', size: '25' };
                        return (isUser && isIncomplete) ? (
                          <span
                            className='d-flex'
                            onClick={() => fetchExistingApplicationData(data.slug)}
                          >
                            <Icon.Edit {...style} />
                            <p>Edit</p>
                          </span>
                        ) : (
                          <Link
                            className='d-flex'
                            to={`/${usertype}/dashboard/application/view/${data.slug}`}
                          >
                            <Icon.Eye {...style} />
                            <p>View</p>
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })() : (
          <div className='col-md-6 mr-2 p-0'>
            <div className='fp-mortgage-application-list'>
              <div className='fp-application-blank-details'>
                <div className='fp-application-blank-detail-cta-btn-wrapper'>
                  {
                    isLoading ?  (
                      <button className={applyButtonClass} disabled>
                        {applyButtonText}
                      </button>
                    ) : (
                      <Link className={applyButtonClass} to={`${index ? '/nhf' : ''}/mortgage/application`}>
                        {applyButtonText}
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ApplicationListItem;
