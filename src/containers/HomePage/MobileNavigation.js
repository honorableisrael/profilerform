import React, {Component} from "react";
import {Link} from "react-router-dom";

import FinancePlusLogo from "../Resource/finance-plus-long.png";
import * as Icon from "react-feather";

export default class MobileNavigation extends Component {
  render() {
    return (
      <div className='fp-mortgage-application-mobile-landscape-menu'>
        <div className='fp-mortgage-application-mobile-landscape-menu-wrapper'>
          <div className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation'>
            <Link to='/'>
              <img
                className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation-logo'
                src={FinancePlusLogo}
                alt='Finance Plus'
              />
            </Link>
            <div className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation-close'>
              <span onClick={this.props.toggleMenu}>
                <Icon.X size='28px' color='#121212' />
              </span>
            </div>
          </div>
          <div className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation-list'>
            <ul>
              <li>
                <Link to='/mortgage/application-type'>Home Loans</Link>
              </li>
              <li>
                <a
                  title='Track My Application'
                  rel='noopener noreferrer'
                  href='#modalTrackApplication'
                  data-toggle='modal'
                >
                  Track My Application
                </a>
                <a
                  ref={this.trackResultModalLink}
                  title='My Application Track Result'
                  rel='noopener noreferrer'
                  href='#modalTrackApplicationResult'
                  data-toggle='modal'
                >
                  {""}
                </a>
              </li>
              <li>
                <Link to='/'>About Us</Link>
              </li>
              <li>
                <Link to='/contact'>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation-action-btn'>
            <Link
              to='/'
              className='fp-mortgage-application-mobile-landscape-menu-wrapper-navigation-action-login-btn'
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
