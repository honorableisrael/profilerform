import React from 'react'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <ul className="footer__icons">
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faTwitter}
                              size='1x'
                              color='#666666'
                              title='Financeplus Twitter'
                            />
                          </a>
                        </li>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faFacebookF}
                              size='1x'
                              color='#666666'
                              title='Financeplus Facebook'
                            />
                          </a>
                        </li>
                        <li>
                          <a href='/'>
                            <FontAwesomeIcon
                              icon={faGoogle}
                              size='1x'
                              color='#666666'
                              title='Financeplus Google'
                            />
                          </a>
                        </li>
                </ul>
                <div className="footer__text">
                    <h4>&copy; 2020 AFREAL. All rights reserved</h4>
                </div>
        </div>
    )
}

export default Footer
