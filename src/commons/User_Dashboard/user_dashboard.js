import React from 'react';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import Accordion from "react-bootstrap/Accordion";
import './user_dashboard.css';
import plus from "../../assets/plus.png"
import line from "../../assets/sidnavline.png"
import grid from "../../assets/grid.png";
import gridwhite from "../../assets/whitegrid.png";
import male from "../../assets/superhero.png";
import userimg from "../../assets/user-img.png";
import arrowhead from "../../assets/arrowhead.png";
import eye from "../../assets/show.png";
import statusline from "../../assets/statusline.png";
import searchImage from "../../assets/search.png";
import "./animate.css";
import loader from "../../assets/loader.png";
import caretdwn from "../../assets/caret_down.png";
import equity from "../../assets/equity.png";
import cavetleft from "../../assets/caretleft.png";
import cavetright from "../../assets/caretright.png";
import pen from "../../assets/pen.png";
import cross from "../../assets/cross.png";
import uploadimg from "../../assets/uploadimg.png";
import CreditReport from "./creditreport";
import Navbar from "./navbar"
import  Mortgagecards from "./mortgagecards";
import eye2 from "../../assets/eye2.svg";



const Userdashboard = () => {
   
    
    return (
        <>
            <Container fluid>
                <Row className="sdnnavrow">
                    <Col md={3} className="dashbdsidenav">
                        <h2 className="dshbdlogo">LOGO</h2>
                        <div className="strtbtn">
                            <img src={plus} className="sidenvimg" />
                             Start new Application
                        </div>
                        <div className="sdenavline"><img src={line} className="img-fluid" /> </div>
                        <div className="mrginbttm">
                            <div className="sidnavoptions"><img src={grid} className="sidenvimg" />Dashboard</div>
                            <div className="sidnavoptionsna"><img src={gridwhite} className="sidenvimg" />Option 1</div>
                            <div >
                              <Accordion defaultActiveKey="" className="sidenavacc">
                              <Accordion.Toggle as={Card.Header} className="sidenavaccheader" eventKey="5">
                              <img src={gridwhite} className="sidenvimg" /> Multiple Option
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="5" className="">
                                 <Card.Body className="sidenavaccbody">
                                    Option 1
                                 </Card.Body>
                             </Accordion.Collapse>
                            </Accordion>
                               
                            </div>
                            <div className="sidnavoptionsna "><img src={gridwhite} className="sidenvimg" />Option 2</div>
                        </div>
                        <div className="sdenavline2"><img src={line} className="img-fluid" /> </div>
                        <div className="sidnavsavingsdv">
                            <h5 className="savingsheader">Easy way to Equity Saving</h5>
                            <div className="savingspgphdiv"> <p className="savingsprgrph">with our all in one platform you can organise all
                              your savings in one place and on the go</p></div>
                            <img src={male} className="img-fluid" />
                            <span className="sdenavsavingsbtn">Get the App</span>
                        </div>
                    </Col>
                    <Col md={9} className="udshboard">
                        <div className="udashsearchdiv">
                            <div className="seachcol">
                                <form className="dxxa">
                                    <span className="sassa"><img src={searchImage} alt="search" className="searchImage" /></span>
                                    <input type="search" size="80" placeholder="Search" className="dshbdsearchbar form-control" />
                                </form>
                            </div>
                            <div className="burgercol">
                                <div className="userdashids">
                                    <Dropdown className="uddrpdwndiv">
                                        <img src={arrowhead} className="arrimg" />
                                        <img src={userimg} className="uimg" />
                                        <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn" />
                                        <Dropdown.Menu className="animated fadeIn">
                                            <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Navbar/>
                                </div>
                                
                            </div>
                        </div>
                        <div className="userdahbdname">
                            Good Morning <span>Olundare Olumide</span>
                        </div>
                        <div className="apstatus-section">
                            <div className="applctnheader">
                                <p className="udashboadprimheader">Application status</p>
                                <div><img src={eye} className="udshbdeye" /> view</div>
                            </div>
                            <div className="appstatusheadings">
                                <div>Home Name</div>
                                <div>Home Value</div>
                                <div>Status</div>
                                <div></div>
                            </div>
                            <div className="statusline-img" ></div>
                            <div className="appstatus">
                                <div className="statsitem">5 Bedroom Detached<br /> Bungalow</div>
                                <div className="itemprice">₦70, 000, 000.00</div>
                                <div className="statsreview-btn">Under Review</div>
                                <div className="statsprints-btn">Print</div>
                            </div>
                        </div>
                        <div className="mobile_appstatus_section">
                            <div className="mobileappstatsheader">
                               <p className="udashboadprimheader">Application status</p>
                               <div className="statsreview-btn ">Under Review</div>
                            </div>
                            <div className="mobile_appstatusbody">
                                 <div className="mobilestatusitem">
                                <p className="mobileppstheadin"> Name</p>
                                <p className="mobileitemprice"> 5 Bedroom Detached Bungalow</p>
                                 </div>
                                 <div className="mobilestatusitem adjdiv">
                                <p className="mobileppstheadin"> Home Value</p>
                                 <p className="mobileitemprice">₦70, 000, 000.00</p>

                                 </div>
                            </div>
                            <div className="viewdiv">
                               <div className="mobviewbtn">
                                   <img src={eye2} /> 
                                   view
                               </div>
                               <div className="mobprintbtn">Print</div>
                            </div>
                        </div>
                        <Row>
                            <Col md={7}>
                                <div className="udashbdaccdiv">
                                    <Accordion defaultActiveKey="">
                                        <Card className="udashbdacrd">
                                            <Accordion.Toggle as={Card.Header} className="udashbdacc" eventKey="5">
                                                <p className="udashboadprimheader">Documents Upload</p>
                                                <div className="doctxt">
                                                    <div>
                                                        <img src={loader} className="dshloader" />
                                                        10 <span className="thinss"> out of</span> 14{"  "} Documents Uploaded</div>
                                                    <img src={caretdwn} className="dshgreencar" />
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="5">
                                                <Card.Body className="dashacccdbdy">
                                                <div className="dashbdaccbdydescr">
                                                    <div className="tyofdoc">Type of Documents</div>
                                                    <div className="stats">status</div>
                                                    
                                                </div>
                                                <div className="dashbdaccbdyitems">
                                                    <div className="dashbdacbdyitem1">Passport</div>
                                                    <div className="dashbdacbdyitem2">Uploaded </div>
                                                    <div className="dashbdacbdyitem3"><img src={pen}/></div>
                                                    <div className="dashbdacbdyitem4"><img src={cross}/></div>
                                                </div>
                                                <div className="dashbdaccbdyitems whitebackground">
                                                    <div className="dashbdacbdyitem1">Evidence of Employment</div>
                                                    <div className="dashbdacbdyitem2">Uploaded </div>
                                                    <div className="dashbdacbdyitem3"><img src={pen}/></div>
                                                    <div className="dashbdacbdyitem4"><img src={cross}/></div>
                                                </div>
                                                <div className="dashbdaccbdyitems">
                                                    <div className="dashbdacbdyitem1">Sales/Allocation Offer Letter</div>
                                                    <div className="dashbdacbdyitem2">Uploaded </div>
                                                    <div className="dashbdacbdyitem3"><img src={pen}/></div>
                                                    <div className="dashbdacbdyitem4"><img src={cross}/></div>
                                                </div>
                                                <div className="dashbdaccbdyitems whitebackground">
                                                    <div className="dashbdacbdyitem1">Copy of Birth Certificate</div>
                                                    <div className="dashbdacbdyitem2 pendingbtn">Pending </div>
                                                    <div className="dashbdacbdyitem3"><img src={pen}/></div>
                                                    <div className="dashbdacbdyitem4"><img src={uploadimg}/></div>
                                                </div>
                                             </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                                <span className="carousel-section">
                                    <div className="cardiv">
                                        <img src={cavetleft} />
                                        <img src={cavetright} />
                                    </div>
                                </span>
                                <div className="propstatsdvsection">
                                <div className="propstatsdv">
                                    <div className="savingsheader">Property Status</div>
                                    <div className="undsctrnbtn">Under Construction</div>
                                </div>
                                <div className="bung">
                                    5 Bedroom Detached Bungalow
                               </div>
                                <div className="propprice">
                                    <div className="prpnme">
                                        Price
                                    </div>
                                    <div className="prpice">
                                        ₦200,000,000.00
                                 </div>
                                </div>
                                <div className="propprice">
                                    <div className="prpnme">
                                        Payment Type
                                 </div>
                                    <div className="prpnme2">
                                        Mortgage
                                 </div>
                                </div>
                                <div className="propprice">
                                    <div className="prpnme">
                                        Date of Purchase
                                   </div>
                                    <div className="prpnme3">
                                        30th October 2020
                                   </div>
                                 </div>
                                </div>
                                <div className="mobilepropstatsdv">
                                  <div className="propstatsdv rmpad">
                                     <div className="savingsheader mobsavheader">Property Status</div>
                                     <div className=" mobstatsrvbtn">Not Started</div>
                                 </div>
                                 <div className="mobbung">
                                    <p className="mobsubheading"> Name </p>
                                     <p className="mobprop"> 5 Bedroom Detached Bungalow </p>
                                 </div>
                                  <div className="mobbung">
                                    <p className="mobsubheading">Price</p>
                                    <p className="mobprop">₦200,000,000.00</p>
                                  </div>
                                  <div className="mobbung">
                                    <p className="mobsubheading">Payment Type</p>
                                    <p className="mobprop">Mortgage</p>
                                  </div>
                                  <div className="mobbung lastprop">
                                    <p className="mobsubheading">Date of Purchase</p>
                                    <p className="mobprop">30th October 2020</p>
                                  </div>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="equitywrapper ">
                                    <div>
                                        <p className="udashboadprimheader"> Equity Savings</p>
                                        <p className="equitytext">Total Equity Needed</p>
                                        <p className="equityamt">₦70,000,000.00</p>
                                    </div>
                                    <div>
                                        <img src={equity} className="equityimg" />
                                    </div>
                                </div>
                                <div className="equityamtdivs">
                                    <div className="eqleftdv">
                                        <p className="equitytext">Total Saved</p>
                                        <p className="equityamt">₦30,000,000.00</p>
                                    </div>
                                    <div className="eqrghtdv">
                                        <p className="equitytext">Current Balance</p>
                                        <p className="equityamt">₦40,000,000.00</p>
                                    </div>
                                </div>
                               <CreditReport className="credrep"/>

                            </Col>
                        </Row>
                        <Row>
                           < Mortgagecards/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Userdashboard