import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import plus from "../../assets/plus.png";
import line from "../../assets/sidnavline.png";
import Profile from "../../assets/Profile.svg";
import gridwhite from "../../assets/whitegrid.png";
import Wallet from "../../assets/Wallet.svg";
import Home from "../../assets/Home.svg";
import { Link } from "react-router-dom";

const SideBarProfile = (props) => {
  return (
    <>
      <Col md={3} className="dashbdsidenav tealbg">
        <h2 className="dshbdlogo">LOGO</h2>
        <div className="mrginbttm">
          <div className="sidnavoptions">
            <img src={Profile} className="sidenvimg" />
            Profile
          </div>
          <div className="sidnavoptionsna ">
            <img src={Wallet} className="sidenvimg" />
            Affordability Test
          </div>
          <div className="sidnavoptionsna ">
            <img src={Home} className="sidenvimg" />
            Property Request
          </div>
        </div>
      </Col>
    </>
  );
};

export default SideBarProfile;
