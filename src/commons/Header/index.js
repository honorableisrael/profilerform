import React from 'react'
import {Link} from "react-router-dom";
import "./Header.css";

import financeplusLogo from '../../containers/Resource/finance-plus-logo-light-bottom.png';


function Header() {

    const onLogoutClick =(e)=>{
        e.preventDefault()
        console.log("logout")
      }

    return (
        <nav className=" navbar navbar-expand-lg navbar-light navbar-bottom bg-light mb-4">
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
                </div>
            {/* </div> */}
      </nav>
    )
}

export default Header
