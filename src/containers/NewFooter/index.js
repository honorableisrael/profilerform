import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLinkedinIn, faInstagram, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';

import financeplusLogo from '../Resource/finance-plus-logo-light-bottom.png';


const Footer = styled.footer`
  .container {
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    font-weight: bold;
    font-size: 1.17rem;
  }
`;

const NewFooter = () => {
  return (
    <Footer>
      <div className="footer-pattern"></div>
      <div className='container'>
        <div className='row'>
          {/* <!-- Footer Widget 1 --> */}
          <div className='footer-widget col-xs-12 col-sm-6 col-md-3'>
            <img
              src={financeplusLogo}
              className="logo"
              alt="Finance Plus Logo"
            />
            <span className="site-tagline">Home Loans Simplified.</span>
            <div className="footer-divider"></div>
            <FontAwesomeIcon className='fas' color='white' size='2x' icon={faUserShield} />
            <p>
              Your information is solely used as intended; for your application and is protected by bank-level
              security
              <span
                className="copyright"
              >Finance Plus 2020 © Afreal Limited | All rights Reserved.</span>
            </p>
          </div>

          {/* <!-- Footer Widget 2 --> */}
          <div className='footer-widget col-xs-12 col-sm-6 col-md-3'>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#" target="_blank">Get A Mortgage</a>
              </li>
              <li>
                <a href="#" target="_blank">Affordability Test</a>
              </li>
              <li>
                <a href="#" target="_blank">Mortage Eligibility</a>
              </li>
              <li>
                <a href="#" target="_blank">NHF Loans</a>
              </li>
            </ul>
          </div>

          {/* <!-- Footer Widget 3 --> */}
          <div className='footer-widget col-xs-12 col-sm-6 col-md-3'>
            <h3>Learn More</h3>
            <ul>
              <li>
                <a href="#" target="_blank">About Us</a>
              </li>
              <li>
                <a href="#" target="_blank">Contact Us</a>
              </li>
              <li>
                <a href="#" target="_blank">Speak With a Pro</a>
              </li>
              <li>
                <a href="#" target="_blank">Join Our Team</a>
              </li>
            </ul>
          </div>

          {/* <!-- Footer Widget 4 --> */}
          <div className='footer-widget col-xs-12 col-sm-6 col-md-3'>
            <h3>Connect With Us</h3>
            <ul className="d-flex">
              <li>
                <a href="#" target="_blank">
                  <FontAwesomeIcon className='fab' size='2x' icon={faFacebookSquare} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                <FontAwesomeIcon className='fab' size='2x' icon={faLinkedinIn} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                <FontAwesomeIcon className='fab' size='2x' icon={faInstagram} />
                  {/* <i className="fa-instagram-square fab"></i> */}
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                <FontAwesomeIcon className='fab' size='2x' icon={faWhatsappSquare} />
                  {/* <i className="fa-whatsapp-square fab"></i> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Footer>
  );
}
 
export default NewFooter;