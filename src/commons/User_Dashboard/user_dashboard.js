import React from 'react';
import { Container, Row, Col, Dropdown} from 'react-bootstrap';
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

const Userdashboard = ()=>{
    return(
        <div>
            <Container fluid>
                 <Row className="sdnnavrow">
                     <Col md={3} className="dashbdsidenav">
                         <h2 className="dshbdlogo">LOGO</h2>
                         <div className="strtbtn">
                             <img src={plus} className="sidenvimg"/>
                             Start new Application
                        </div>
                         <div className="sdenavline"><img src={line} className="img-fluid"/> </div>
                         <div className="mrginbttm">
                             <div className="sidnavoptions"><img src={grid} className="sidenvimg"/>Dashboard</div>
                             <div className="sidnavoptionsna"><img src={gridwhite} className="sidenvimg"/>Option 1</div>
                             <div className="sidnavoptionsna"><img src={gridwhite} className="sidenvimg"/>Multiple Option</div>
                             <div className="sidnavoptionsna "><img src={gridwhite} className="sidenvimg"/>Option 2</div>
                         </div>
                         <div className="sdenavline2"><img src={line} className="img-fluid"/> </div>
                         <div className="sidnavsavingsdv">
                             <h5 className="savingsheader">Easy way to Equity Saving</h5>
                            <div className="savingspgphdiv"> <p className="savingsprgrph">with our all in one platform you can organise all 
                              your savings in one place and on the go</p></div>
                              <img src={male} className="img-fluid"/>
                              <span className="sdenavsavingsbtn">Get the App</span>
                         </div>
                     </Col>
                     <Col md={9} className="udshboard">
                        <Row className="udashsearchdiv">
                            <Col md={8}>
                             <form>   
                            <input type="search" size="80" placeholder="search" className="dshbdsearchbar form-control"/>
                            </form>
                            </Col>
                            <Col md={4}>
                            <div className="userdashids">
                            <Dropdown className="uddrpdwndiv">
                               <img src={arrowhead} className="arrimg"/>
                               <img src={userimg} className="uimg"/>
                              <Dropdown.Toggle id="dropdown-basic" className="usernavdrpdwn"/>
                             <Dropdown.Menu>
                                 <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                                 <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                               </Dropdown.Menu>
                             </Dropdown>
                            </div>
                            </Col>
                        </Row>
                        <div className="userdahbdname">
                        Good Morning <span>Olundare Olumide</span>
                        </div>
                        <div className="apstatus-section">
                            <div className="applctnheader">
                                <p>Application status</p>
                                <div><img src={eye} className="udshbdeye"/> view</div> 
                            </div>
                            <div className="appstatusheadings">
                               <div>Home Name</div>
                               <div>Home Value</div>
                               <div>Status</div>
                               <div></div>
                            </div>
                            <img src={statusline} className="statusline-img"/>
                            <div className="appstatus">
                              <div className="statsitem">5 Bedroom Detached<br/> Bungalow</div>
                              <div className="itemprice">₦70, 000, 000.00</div>
                              <div className="statsreview-btn">Under Review</div>
                              <div className="statsprints-btn">Print</div>
                            </div>
                        </div>
                     </Col>
                 </Row>
            </Container>
        </div>
    )
}
export default Userdashboard;
