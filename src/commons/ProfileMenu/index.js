import React from 'react'
import {Link} from "react-router-dom";
import "./ProfileMenu.css";

import financeplusLogo from '../../containers/Resource/finance-plus-logo-light-bottom.png';
import Settings from '../../containers/Resource/settings.png';
import Exit from '../../containers/Resource/exit.png';
import { logoutUser } from "./../../store/actions/authActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

function ProfileMenu(props) {

    const onLogoutClick =(e)=>{
        e.preventDefault()
        props.logoutUser()
      }

    return (
        <div className="profileMenu navbar navbar-expand-lg">
            <div className="profileMenu__top">
                <Link className="profileMenu__brand" to="/">
                        <img className="profileMenu__logo" src={financeplusLogo} alt="LOGO"  />
                </Link>
                <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-device"
                    >
                        <span className="navbar-toggler-icon"></span>
                </button>
            

                <div className="collapse navbar-collapse" id="mobile-device">
                    <ul className=" profileMenu__top--menu">
                        <li className="nav-item profileMenu__top--item dropdown">
                            <div className="circle green"><div className="green"></div></div>
                            <Link className=" profileMenu__top--link marked" to="/application/profile" id="navbarDropdownMenuLink"  aria-haspopup="true" aria-expanded="false">
                            Profile
                            </Link>
                        </li>
                        <div className="profileMenu__top--bar "></div>
                        <li className="nav-item profileMenu__top--item dropdown">
                            <div className="circle "></div>
                            <Link className=" profileMenu__top--link" to="/application/afforability"  id="navbarDropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                                Affordability Test
                            </Link>
                        </li> 
                        <div className="profileMenu__top--bar "></div>
                        <li className="nav-item profileMenu__top--item dropdown">
                            <div className="circle "></div>
                            <Link className=" profileMenu__top--link" to="/application/propertyReq" id="navbarDropdownMenuLink"  aria-haspopup="true" aria-expanded="false">
                                Property Request
                            </Link>
                        </li>   
                    </ul>
                </div>
             </div>
            <ul className="profileMenu__bottom collapse navbar-collapse" id="mobile-device">
                    <li className="profileMenu__bottom-item">
                        <img className="profileMenu__bottom-icon" src={Settings} alt="settings"  />
                        <Link className="profileMenu__bottom-link" to="/auth/register" id="navbarDropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                                Settings
                        </Link>
                    </li>
                    <li className="profileMenu__bottom-item">
                        <img className="profileMenu__bottom-icon" src={Exit} alt="exit"  />
                        <Link className="btn btn-info profileMenu__bottom-link" to="/auth/login" onClick={onLogoutClick} id="navbarDropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                                Logout
                        </Link>
                    </li>
            </ul>
            
        </div>
    )
}

ProfileMenu.propTypes ={
    logoutUser: PropTypes.func.isRequired,
  }

export default connect(null, {logoutUser})(ProfileMenu);
