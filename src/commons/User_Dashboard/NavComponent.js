import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import userimg from "../../assets/avatar.svg";
import arrowhead from "../../assets/arrowhead.png";
import searchImage from "../../assets/search.png";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import settings from "../../assets/settings.png";
import exit from "../../assets/exit.png";
import { logOut } from "./controller";

const NavComponent = (props) => {
  return (
    <>
      <Row className="udashsearchdiv">
        <Col md={8} sm={12} xs={12} className="nolefft">
          {!props.hideSearch && (
            <form className="dxxa">
              <span className="sassa">
                <img src={searchImage} alt="search" className="searchImage" />
              </span>
              <input
                type="search"
                size="80"
                placeholder="Search"
                className="dshbdsearchbar form-control"
              />
            </form>
          )}
        </Col>
        <Col md={4} sm={12} xs={12}>
          <div className="userdashids">
            <Dropdown className="uddrpdwndiv">
              <img src={arrowhead} className="arrimg" />
              <img src={userimg} className="uimg" />
              <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn" />
              <Dropdown.Menu className="animated fadeIn">
                <Dropdown.Item className="animated fadeInLeft">
                  <img src={settings} className="exit" />{" "}
                  <Link to="/user-profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item className="animated fadeInLeft">
                  <img src={settings} className="exit" />{" "}
                  <Link to="/account-settings">Account Settings</Link>
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1"><Link to="/user-profile">Settings</Link></Dropdown.Item> */}
                <Dropdown.Item
                  className="animated fadeInLeft"
                  onClick={logOut}
                >
                  <img src={exit} className="exit" /> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Navbar />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NavComponent;
