import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faBookOpen, faBriefcase, faCalculator, faCheck, faEye, faMobile, faPercentage, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';


const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <h2 className="section-heading">Why get a mortgage<br />through us?</h2>
      <div className="benefit-wrapper">
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              icon={faBan}
              className='fas'
            />
          </div>
          <h3>Zero Brokerage Commission</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              className='fas'
              icon={faCalculator}
            />
          </div>
          <h3>Instant Loan Estimates</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              icon={faCheck}
              className='fas'
            />
          </div>
          <h3>Mortgage Pre-approval</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              icon={faMobile}
              className='fas'
            />
          </div>
          <h3>100% Digital Application</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              className='fas'
              icon={faPercentage}
            />
          </div>
          <h3>Best Rates Guaranteed</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              icon={faEye}
              className='fas'
            />
          </div>
          <h3>Application Tracking</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              icon={faBriefcase}
              className='fas'
            />
          </div>
          <h3>Industry Experts</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              className='fas'
              icon={faPhoneAlt}
            />
          </div>
          <h3>Free Mortgage Consultation</h3>
        </div>
        <div className="benefit">
          <div>
            <FontAwesomeIcon
              className='fas'
              icon={faBookOpen}
            />
          </div>
          <h3>Radical Transparency</h3>
        </div>
      </div>
    </section>
  );
}
 
export default WhyUsSection;