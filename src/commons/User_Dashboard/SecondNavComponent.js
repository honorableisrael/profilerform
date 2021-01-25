import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import userimg from "../../assets/avatar.svg";
import arrowhead from "../../assets/arrowhead.png";
import searchImage from "../../assets/search.png";
import Navbar from "./navbar";
import NavbarMobile from "./navbarMobile";
import { Link } from "react-router-dom";
import settings from "../../assets/settings.png";
import exit from "../../assets/exit.png";

const SecondNavComponent = (props) => {
  const logOut = () => {
    localStorage.clear();
    window.location.assign("/");
  };
  return (
    <>
      <Row className="udashsearchdiv">
        <Col md={8} sm={12} xs={12}>
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
            <Dropdown  className="uddrpdwndiv">
              <img src={arrowhead} className="arrimg" />
              <Dropdown.Toggle className="ddprdown" id="dropdown-basic">
                <img src={userimg} className="uimg" />
              </Dropdown.Toggle>
              <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn" />
              <Dropdown.Menu className="animated fadeIn">
                <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInDown"
                >
                  <Link to="/user-profile">
                    {" "}
                    <img src={settings} className="exit" />
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="animated fadeInLeft">
                  <img src={settings} className="exit" />{" "}
                  <Link to="/account-settings">Account Settings</Link>
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1">Settings</Dropdown.Item> */}
                <Dropdown.Item
                  href="#/action-2"
                  className="animated fadeInDown"
                  onClick={logOut}
                >
                  <img src={exit} className="exit" /> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <NavbarMobile />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SecondNavComponent;
