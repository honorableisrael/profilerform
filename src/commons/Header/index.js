import React from 'react'
import {Link} from "react-router-dom";
import "./Header.css";

import financeplusLogo from '../../containers/Resource/finance-plus-logo-light-bottom.png';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";


function Header(props) {
    const { isAuthenticated, currentUser} = props.auth
    // const onLogoutClick =(e)=>{
    //     e.preventDefault()
    //     console.log("logout")
    //   }

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item navbar-item dropdown name">
            <Link className="navbar-brand" to="/application">
                Hello,{currentUser ? currentUser.firstname : ""}
            </Link>
            </li>
            <li className="nav-item navbar-item dropdown">
                <Link className="btn btn-info" to="#" id="navbarDropdownMenuLink" onClick={props.logoutUser}>
                   Logout
                </Link>
            </li>   
         </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item navbar-item dropdown">
                <Link className="btn btn-outline-success " to="/auth/login" id="navbarDropdownMenuLink"  aria-haspopup="true" aria-expanded="false">
                     Sign In
                </Link>
            </li>
            <li className="nav-item navbar-item dropdown">
                <Link className="btn btn-info" to="/auth/register" id="navbarDropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                    Sign Up
                </Link>
            </li>   
         </ul>
    )

    return (
        <nav className=" navbar navbar-expand-lg navbar-light navbar-bottom bg-light">
            {/* <div className="navbar-edit"> */}
                <Link className="navbar-brand" to="/">
                    <img className="navbar-logo1" src={financeplusLogo} alt="LOGO"  />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse navbar-right" id="mobile-nav">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            {/* </div> */}
      </nav>
    )
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, { logoutUser})(Header);
