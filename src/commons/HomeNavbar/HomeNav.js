import React, { useEffect } from "react";
import "./style.css";
import { Button, Dropdown } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "../User_Dashboard/animate.css";
import { Link } from "react-router-dom";
import userimg from "../../assets/avatar.svg";
import arrowhead from "../../assets/arrowhead.png";
import settings from "../../assets/settings.png";
import exit from "../../assets/exit.png";
import { logOut } from "../User_Dashboard/controller";

const HomeNav = () => {
  const [state, setState] = React.useState({
    NavisOpen: false,
    theUserIsLoggedIn: false,
  });
  const { NavisOpen } = state;
  useEffect(() => {
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData ? JSON.parse(userData) : null;
    if (currentUser) {
      setState({
        ...state,
        theUserIsLoggedIn: true,
      });
    }
  }, []);
  return (
    <div className="fixfdnav">
      <div className="navwrap">
        <div className="logoarea">
          <img src={logo} alt="logo" className="logo2" />
        </div>
        {!state.theUserIsLoggedIn && (
          <div className="otherwrap">
            <Link to={"/signin"}>
              {" "}
              <Button className="navsignup1">Sign In</Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="navsignup navsignup1">Sign Up</Button>
            </Link>
          </div>
        )}
        {state.theUserIsLoggedIn && (
          <div className="prrf">
            <Dropdown className="uddrpdwndiv">
              <img src={userimg} className="uimg" />
              <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn" />
              <Dropdown.Menu className="animated fadeIn">
                <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInLeft"
                >
                  <img src={settings} className="exit" />{" "}
                  <Link to="/user-profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-1"
                  className="animated fadeInLeft"
                >
                  <img src={settings} className="exit" />{" "}
                  <Link to="/userdashboard">My Account</Link>
                </Dropdown.Item>
                {/* <Dropdown.Item href="#/action-1"><Link to="/user-profile">Settings</Link></Dropdown.Item> */}
                <Dropdown.Item
                  href="#/action-2"
                  className="animated fadeInLeft"
                  onClick={logOut}
                >
                  <img src={exit} className="exit" /> Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        <div
          className="mobileham"
          onClick={() => {
            setState({
              NavisOpen: NavisOpen ? false : true,
            });
          }}
        >
          {!NavisOpen ? (
            <>
              <div className="ham1 animated slideInLeft"></div>
              <div className="ham2 animated slideInLeft"></div>
              <div className="ham3 animated slideInLeft"></div>
            </>
          ) : (
            <span className="nvtimes animated slideInLeft">&times;</span>
          )}
        </div>
      </div>
      {NavisOpen ? (
        <div className="ismobile animated slideInDown">
          <div className="siggnup1 animated slideInRight">
            {" "}
            <Button className="navsignup1">Sign In</Button>
          </div>
          <div className="siggnup animated slideInRight">
            {" "}
            <Button className="navsignup navsignup1">Sign Up</Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeNav;
