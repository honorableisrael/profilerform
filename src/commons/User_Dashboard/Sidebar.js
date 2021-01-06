import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import plus from "../../assets/plus.png";
import line from "../../assets/sidnavline.png";
import grid from "../../assets/grid.png";
import gridwhite from "../../assets/whitegrid.png";
import male from "../../assets/superhero.png";
import statusline from "../../assets/statusline.png";
import { Link } from "react-router-dom";

const UserdashboardSideBar = (props) => {
  return (
    <>
      <Col md={3} className="dashbdsidenav">
        <h2 className="dshbdlogo">LOGO</h2>
        <Accordion defaultActiveKey="" className="sidenavacc">
          <Accordion.Toggle
            as={Card.Header}
            className="sidenavaccheader sidenavaccheader12"
            eventKey="5"
          >
            <div className="strtbtn">
              <img src={plus} className="sidenvimg" />
              Start new Application
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5" className="">
            <>
              <Card.Body className="sidenavaccbody dddee">
                <Link to="/mortage-request">Mortgages</Link>
              </Card.Body>
              <Card.Body className="sidenavaccbody">Personal Loan</Card.Body>
              <Card.Body className="sidenavaccbody">Equity Savings</Card.Body>
            </>
          </Accordion.Collapse>
        </Accordion>
        <div className="sdenavline">
          <img src={line} className="img-fluid" />{" "}
        </div>
        <div className="mrginbttm">
          <div className="sidnavoptions">
            <img src={grid} className="sidenvimg" />
            Dashboard
          </div>
          <div className="sidnavoptionsna">
            <img src={gridwhite} className="sidenvimg" />
            Applications
          </div>
          <div className="sidnavoptionsna ">
            <img src={gridwhite} className="sidenvimg" />
            Equity Savings
          </div>
          <div className="sidnavoptionsna ">
            <img src={gridwhite} className="sidenvimg" />
            <Link to="/mortage-request"> Apply for Mortgage </Link>
          </div>
        </div>
        <div className="sdenavline2">
          <img src={line} className="img-fluid" />{" "}
        </div>
        <div className="sidnavsavingsdv">
          <h5 className="savingsheader">Easy way to Equity Saving</h5>
          <div className="savingspgphdiv">
            {" "}
            <p className="savingsprgrph">
              with our all in one platform you can organise all your savings in
              one place and on the go
            </p>
          </div>
          <img src={male} className="img-fluid" />
          <span className="sdenavsavingsbtn">Get the App</span>
        </div>
      </Col>
    </>
  );
};

export default UserdashboardSideBar;
