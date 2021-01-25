import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { ReactComponent as Dashboard } from "../../assets/dashboard.svg";
import line from "../../assets/sidnavline.png";
import grid from "../../assets/grid.png";
import gridwhite from "../../assets/whitegrid.png";
import male from "../../assets/superhero.png";
import statusline from "../../assets/statusline.png";
import { Link } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";



const UserdashboardSideBar = (props) => {
  const [state, setState] = React.useState({
    email: "",
    loggedinuser: "",
  });
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    console.log(currentUser);
    setState({
      ...state,
      email: currentUser?.user?.email,
    });
    const userToken = localStorage.getItem("jwtToken");
    axios
      .all([
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res4) => {
          if (res4?.data?.data?.is_verified == 0) {
            window.location.assign("/account-verification");
          }
          console.log(res4);
          if (res4.status === 200) {
            setState({
              ...state,
              loggedinuser: res4.data.data,
            });
          }
          if (res4.status == 400) {
            props.history.push("/signin");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
      });
  }, []);
  const { loggedinuser } = state;
  return (
    <>
      <Col md={3} className="dashbdsidenav ">
        <h2 className="dshbdlogo">LOGO</h2>
        {/* <Accordion defaultActiveKey="" className="sidenavacc">
          <Accordion.Toggle
            as={Card.Header}
            className="sidenavaccheader sidenavaccheader12"
            eventKey="5"
          >
            <div className="strtbtn">
              <img src={plus} className="sidenvimg" />
              Start new Application
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="5" className="">
            <>
              <Card.Body className="sidenavaccbody dddee">
                <Link to="/mortage-request">Mortgages</Link>
              </Card.Body>
              <Card.Body className="sidenavaccbody">Personal Loan</Card.Body>
              <Card.Body className="sidenavaccbody">Equity Savings</Card.Body>
            </>
          </Accordion.Collapse>
        </Accordion> */}
        {/* <div className="sdenavline">
          <img src={line} className="img-fluid" />{" "}
        </div> */}
        <div className="mrginbttm">
          <div
            className={
              props.dashboard == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Dashboard
              className="sidenvimg"
              fill="white"
              stroke="#039c71"
              style={{ fill: "white", strokeWidth: 0.4 }}
            />
            <Link to="/userdashboard">Dashboard</Link>
          </div>
          <div
            className={
              props.applications == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Dashboard
              className="sidenvimg"
              fill="white"
              stroke="#039c71"
              style={{ fill: "white", strokeWidth: 0.4 }}
            />
            Applications
          </div>
          <div
            className={
              props.equity == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Dashboard
              className="sidenvimg"
              fill="white"
              stroke="#039c71"
              style={{ fill: "white", strokeWidth: 0.4 }}
            />
            <Link to="/equity-finance">Equity Savings</Link>
          </div>
          {loggedinuser.has_profile == 1 && (
            <div
              className={
                props.mortgage == true ? "sidnavoptions" : "sidnavoptionsna"
              }
            >
              <Dashboard
                className="sidenvimg"
                fill="white"
                stroke="#039c71"
                style={{ fill: "white", strokeWidth: 0.4 }}
              />
              <Link to="/mortage-request"> Apply for Mortgage </Link>
            </div>
          )}

          <div
            className={
              props.loans == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Dashboard
              className="sidenvimg"
              fill="white"
              stroke="#039c71"
              style={{ fill: "white", strokeWidth: 0.4 }}
            />
            <Link to="/personal-loans"> Personal Loans </Link>
          </div>
        </div>
        {!props.hideads && (
          <>
            <div className="sdenavline2">
              <img src={line} className="img-fluid" />{" "}
            </div>
            <div className="sidnavsavingsdv">
              <h5 className="savingsheader">Easy way to Equity Saving</h5>
              <div className="savingspgphdiv">
                {" "}
                <p className="savingsprgrph">
                  with our all in one platform you can organise all your savings
                  in one place and on the go
                </p>
              </div>
              <img src={male} className="img-fluid" />
              <span className="sdenavsavingsbtn">Get the App</span>
            </div>
          </>
        )}
      </Col>
    </>
  );
};

export default UserdashboardSideBar;
