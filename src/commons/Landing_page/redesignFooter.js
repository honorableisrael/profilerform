import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import twitter from "../../assets/twitter.png";
import facebk from "../../assets/facecbk.png";
import gmail from "../../assets/google.png";

const FooterSection = () => {
  return (
    <div className="rdfooterSection">
      <Container fluid={true}>
        <Row className="ffcet">
          <Col md={11}>
            <div className="rdfooterwrapper">
              <div className="rdfootercontent firstdiv">
                <h3>About Us</h3>
                <p>
                  Imperdiet faucibus nibh montes, lorem non pulvinar diam. Etiam
                  eleifend neque, magnis quis iaculis semper.
                </p>
              </div>
              <div className="rdfootercontent seconddiv">
                <h3>Quick Links</h3>
                <ul className="scddvlistitems">
                  <li>
                    {" "}
                    <Link>Meet The Team</Link>
                  </li>
                  <li>
                    {" "}
                    <Link>Our Story</Link>
                  </li>
                  <li>
                    {" "}
                    <Link>Career</Link>
                  </li>
                </ul>
              </div>
              <div className="rdfootercontent thirddiv">
                <h3>Useful</h3>
                <ul className="scddvlistitems">
                  <li>
                    <Link>resa</Link>
                  </li>
                  <li>
                    <Link>financeplus.ng</Link>
                  </li>
                  <li>
                    <Link>newhomes.ng</Link>
                  </li>
                </ul>
              </div>
              <div className="rdfootercontent fourthdiv">
                <h3>Subscribe to Our Newsletter</h3>
                <p className="fthdvpara">
                  Stay up to date with news and informations to help you achieve
                  your dreams and become a home owner.
                </p>
                <div>
                  <Form className="ftrsubscribeform">
                    <Row className="ftrwmrgin">
                      <Col md={7}>
                        <input
                          type="text"
                          size={50}
                          className="ftsubinpt form-control"
                          placeholder="Enter your email"
                        />
                      </Col>
                      <Col md={5} className="ftrsub-btn">
                        Subscribe
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
            <div className="mobilefooter">
              <ul className="mobfootericons">
                <li>
                  <img src={twitter} />
                </li>
                <li>
                  <img src={facebk} />
                </li>
                <li>
                  <img src={gmail} />
                </li>
              </ul>
              <div className="ftrtxt">© 2020 AFREAL. All rights reserved</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterSection;
