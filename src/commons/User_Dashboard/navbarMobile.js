import React, { useState } from "react";
import "./user_dashboard.scss";
import bars from "../../assets/bars.png";
import SideNav from "react-simple-sidenav";
import { Col, Accordion, Card } from "react-bootstrap";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import { ReactComponent as Wallet } from "../../assets/Wallet.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { Link } from "react-router-dom";
import { logOut } from "./controller";

const NavbarMobile = (props) => {
  const [state, setState] = useState({
    showNav: false,
  });
  const { showNav } = state;

  const openNav = () => {
    toggleSidenav(true);
  };
  const hideNav = () => {
    toggleSidenav(false);
  };
  const toggleSidenav = (action) => {
    setState({
      showNav: action,
    });
  };

  return (
    <div>
      <img src={bars} onClick={openNav} className="barsimg" />
      <SideNav
        showNav={showNav}
        onHideNav={hideNav}
        navStyle={{
          width: "80%",
        }}
      >
        <Col md={3} className="mobdashbdsidenav tealbg">
          <h2 className="dshbdlogo">LOGO</h2>
          <div className="mrginbttm">
            <div
              className={
                props.profile == true ? "sidnavoptions" : "sidnavoptionsna"
              }
            >
              <Profile className="sidenvimg" fill="white" stroke="white" />
              <Link to="/user-profile">Profile</Link>
            </div>
            <div
              className={
                props.affordability == true
                  ? "sidnavoptions"
                  : "sidnavoptionsna"
              }
            >
              <Wallet className="sidenvimg" fill="#039c71" stroke="#039c71" />
              <Link to="/user-affordability-test">Affordability Test</Link>
            </div>
            <div
              className={
                props.property_request == true
                  ? "sidnavoptions"
                  : "sidnavoptionsna"
              }
            >
              <Home className="sidenvimg" fill="#039c71" stroke="#039c71" />
              <Link to="/user-request-form">Property Request</Link>
            </div>
            <div
              className={
                props.affordability == true
                  ? "sidnavoptions"
                  : "sidnavoptionsna"
              }
              onClick={logOut}
            >
              <Wallet className="sidenvimg" fill="#039c71" stroke="#039c71" />
              Log out
            </div>
          </div>
        </Col>
      </SideNav>
    </div>
  );
};

export default NavbarMobile;
