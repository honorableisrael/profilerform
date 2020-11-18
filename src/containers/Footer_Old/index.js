import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faWhatsappSquare,
  faLinkedin,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";
import LenderRatesBanner from "./LenderRatesBanner";

class Footer extends Component {
  render() {
    let footer;
    if (this.props.type === "others") {
      footer = (
        <footer id='fp-landing-footer' className='fp-landing-footer'>
          <LenderRatesBanner />
        </footer>
      );
    } else if (this.props.type === "homepage") {
      footer = (
        <div>
          <div className='fp-landing-footer-bg'></div>
          <div className='fp-landing-footer-top'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='fp-landing-footer-company-info'>
                    <div className='fp-landing-footer-finance-logo'></div>
                    <div className='fp-landing-footer-social-media-links'>
                      <ul>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faFacebookSquare}
                              size='2x'
                              color='#ffffff'
                              title='Financeplus Facebook'
                            />
                          </a>
                        </li>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              size='2x'
                              color='#ffffff'
                              title='Financeplus Twitter'
                            />
                          </a>
                        </li>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faInstagram}
                              size='2x'
                              color='#ffffff'
                              title='Financeplus Twiiter'
                            />
                          </a>
                        </li>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faWhatsappSquare}
                              size='2x'
                              color='#ffffff'
                              title='Financeplus Whatsapp'
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='fp-landing-footer-nda-info'>
                      <div className='fp-landing-footer-nda-info-img'></div>
                      <p>
                        Your information is solely used as intended for your
                        application and is protected by bank-level security
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='fp-landing-footer-site-links'>
                    <h4>Quick Links</h4>
                    <ul className='fp-quick-links-list'>
                      <li>
                        <Link to='/'>About us</Link>
                      </li>
                      <li>
                        <Link to='/contact'>Contact us</Link>
                      </li>
                      <li>
                        <a href='mailto:support@financeplus.ng'>
                          Speak with a Pro
                        </a>
                      </li>
                      <li>
                        <Link to='/contact'>Join our team</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='fp-landing-footer-site-links'>
                    <h4>Quick Links</h4>
                    <ul className='fp-quick-links-list'>
                      <li>
                        <Link to='/affordability-test'>
                          How much can I afford?
                        </Link>
                      </li>
                      <li>
                        <Link to='/support/faqs'>Finance+ FAQs</Link>
                      </li>
                      <li>
                        <Link to='/'>Terms of service</Link>
                      </li>
                      <li>
                        <Link to='/legal/privacy-policy'>Privacy policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='fp-landing-footer-bottom'>
            <div className='container'>
              <p>
                &copy; 2019 Finance Plus by Afreal Limited | All Rights
                Reserved. <br />
                15A Abayomi Durosinmi-Etti Street Off T.F Kuboye Road, Lekki
                Phase 1, Ocean-Side, Lekki Lagos, Nigeria. PO Box 151200
              </p>
            </div>
          </div>
          <LenderRatesBanner />
        </div>
      );
    }
    return (
      <footer id='fp-landing-footer' className='fp-landing-footer'>
        {footer}
      </footer>
    );
  }
}
export default Footer;
