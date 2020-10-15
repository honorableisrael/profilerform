import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import financeplusLogo from '../Resource/finance-plus-logo-light-bottom.png';


const Wrapper = styled.header`
  .nav-menu {
    margin-bottom: 0px;
  }
`;

const NewHeader = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <Wrapper className="nav-wrapper no-print">
      <nav className="nav-bar">
        <Link className="logo-wrapper" to="/">
          <img
            className="logo"
            src={financeplusLogo}
            alt="Finance Plus Logo"
          />
        </Link>

        <input className="toggle-nav" type="checkbox" name="toggle-nav" id="toggle-nav" />

        <ul className="nav-menu" role="navigation">
          <span>
            <li>
              <NavLink to="/get-started">Home Loans</NavLink>
            </li>
            <li>
              <NavLink to="/track-application">Track My Application</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </span>
          <span>
            <li>
              <a onClick={() => setShowLoginDialog(true)}>Sign In</a>
            </li>
            <li>
              <Link to="/register" className="acc-btn highlight">Sign up</Link>
            </li>
          </span>
        </ul>
        <label htmlFor="toggle-nav" className="toggle-nav-icon">
          <span></span>
        </label>
      </nav>

      {/* <v-dialog
        v-model="showLoginDialog"
        max-width="600"
      >
        <login-form />
      </v-dialog> */}
    </Wrapper>
  );
}
 
export default NewHeader;