import React,{ useState } from 'react';
import './user_dashboard.css';
import bars from "../../assets/bars.png";
import SideNav from "react-simple-sidenav";
import {Col, Accordion, Card} from "react-bootstrap";
import plus from "../../assets/plus.png"
import line from "../../assets/sidnavline.png"
import male from "../../assets/superhero.png";
import grid from "../../assets/grid.png";
import gridwhite from "../../assets/whitegrid.png";


const Navbar =()=>{

    const [state, setState] = useState({
        showNav: false
    }); 
    const { showNav } = state;

    const openNav = () =>{
          toggleSidenav(true);
    }
    const hideNav = () =>{
        toggleSidenav(false);
   }
    const  toggleSidenav = (action) =>{
        setState ({
            showNav:action
        })
    };


    return(
      <div>
         <img src={bars} onClick={openNav} className="barsimg" />
         <SideNav
            showNav={showNav}
            onHideNav={hideNav}
            navStyle={{
                width: '80%'
            }}
         >
              <Col md={3} className="mobdashbdsidenav">
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
                    </Col>
         </SideNav>
      </div>
    )
}

export default Navbar;