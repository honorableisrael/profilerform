import React from "react";
import "./style.css";
import { Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "../User_Dashboard/animate.css"

const HomeNav = () => {
  const [state, setState] = React.useState({ NavisOpen: false });
  const { NavisOpen } = state;
  return (
    <div className="fixfdnav">
      <div className="navwrap">
        <div className="logoarea">
          <img src={logo} alt="logo" className="logo2" />
        </div>
        <div className="otherwrap">
          <Button className="navsignup1">Sign In</Button>
          <Button className="navsignup navsignup1">Sign Up</Button>
        </div>
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
