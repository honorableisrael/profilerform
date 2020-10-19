import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import NewHeader from '../NewHeader';
import withNewStyles from '../../hocs/withNewStyles';
import AccessBank from '../Resource/access-bank-light.svg';
import StanbicBank from '../Resource/stanbic-bank-light.svg';
import FirstTrust from '../Resource/first-trust-mortgage-bank-light.svg'
import StandardChartered from '../Resource/standard-chartered-bank-light.svg';


const Wrapper = styled.div`
  main {
    position: relative;
  }

  .row {
    min-height: 100vh;
  }

  .row > div {
    padding: 0px;
  }

  @media screen and (max-width: 800px) {
    .select-nhf-loan {
      padding-top: 4rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .select-lender-wrapper {
      margin-top: 4rem;
      margin-bottom: 4rem;
    }
  }
`;

const GetStartedPage = () => {
  return (
    <Wrapper>
      <NewHeader />
      <main>
        <div className="container-fluid get-started-page pa-0">
          {/* <!-- Left Side - Home Loan --> */}
          <div className="row">
            <div className="col pa-0 ma-0">
              <a href='https://frontend.financeplus.ng' className="select-mortgage-link">
                <div className="select-home-loan">
                  <span className="select-arrow">
                    <FontAwesomeIcon className='fas' icon={faLongArrowAltRight} />
                    {/* <i className="fa-long-arrow-alt-right fas"></i> */}
                  </span>
                  <div className="select-loan-title-wrapper">
                    <h2 className="loan-title">Mortgages.</h2>
                    <p>Apply &amp; get a mortgage from of the following lenders.</p>
                  </div>
                  <div className="select-loan-rate">
                    <p>Rates From</p>
                    <h2>
                      15
                      <sup>%</sup>
                      <span>/ annum</span>
                    </h2>
                  </div>
                  <div className="select-lender-wrapper">
                    <img
                      src={AccessBank}
                      className="select-lender-logo"
                    />
                    <img
                      src={StandardChartered}
                      className="select-lender-logo"
                    />
                    <img
                      src={StanbicBank}
                      className="select-lender-logo"
                    />
                    <img
                      src={FirstTrust}
                      className="select-lender-logo"
                    />
                    <img
                      src={FirstTrust}
                      className="select-lender-logo"
                    />
                    <img
                      src={StandardChartered}
                      className="select-lender-logo"
                    />
                  </div>
                </div>
              </a>
            </div>

            <div className="col pa-0 ma-0">
              {/* <!-- Right Side - NHF Loan --> */}
              <Link to="/application" className="select-mortgage-link">
                <div className="select-nhf-loan">
                  <span className="select-arrow">
                    <FontAwesomeIcon className='fas' icon={faLongArrowAltRight} />
                    {/* <i className="fa-long-arrow-alt-right fas"></i> */}
                  </span>
                  <div className="select-lender-wrapper">
                    <img
                      src={StanbicBank}
                      className="select-lender-logo"
                    />
                    <img
                      src={StandardChartered}
                      className="select-lender-logo"
                    />
                    <img
                      src={FirstTrust}
                      className="select-lender-logo"
                    />
                    <img
                      src={AccessBank}
                      className="select-lender-logo"
                    />
                    <img
                      src={StanbicBank}
                      className="select-lender-logo"
                    />
                    <img
                      src={StandardChartered}
                      className="select-lender-logo"
                    />
                  </div>
                  <div className="select-loan-rate">
                    <p>Rates From</p>
                    <h2>
                      6
                      <sup>%</sup>
                      <span>/ annum</span>
                    </h2>
                  </div>
                  <div className="select-loan-title-wrapper">
                    <h2 className="loan-title">Property Requests.</h2>
                    <p>
                      Apply for a
                      <strong>{' '}National Housing Funds</strong> loan &amp; get a mortgage from of the following lenders.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* <!-- Fixed Mortgage Notice --> */}
          <div className="mortgage-select-notice">
            <p className="mb-0">Select your preferred mortgage</p>
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
 
export default withNewStyles(GetStartedPage);