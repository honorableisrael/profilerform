import React from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import plus from "../../assets/plus.png";
import line from "../../assets/sidnavline.png";
import { ReactComponent as Profile } from "../../assets/Profile.svg";
import { ReactComponent as Wallet } from "../../assets/Wallet.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { Link } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const SideBarProfile = (props) => {
  const [state, setState] = React.useState({
    email:""
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
      email:currentUser?.user?.email
    })
    const userToken = localStorage.getItem("jwtToken");
    axios
      .all([
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res4) => {
          if(res4?.data?.data?.is_verified==0){
            window.location.assign("/account-verification")
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
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  return (
    <>
      <Col md={3} className="dashbdsidenav tealbg">
        <h2 className="dshbdlogo">LOGO</h2>
        <div className="mrginbttm">
          <div
            className={
              props.profile == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Profile className="sidenvimg" fill="white" stroke="white" />
            <Link to="/user-profile">Profile</Link>
          </div>
          <div
            className={
              props.affordability == true ? "sidnavoptions" : "sidnavoptionsna"
            }
          >
            <Wallet className="sidenvimg" fill="#039c71" stroke="#039c71" />
            <Link to="/user-affordability-test">Affordability Test</Link>
          </div>
          <div
            className={
              props.property_request == true
                ? "sidnavoptions"
                : "sidnavoptionsna"
            }
          >
            <Home className="sidenvimg" fill="#039c71" stroke="#039c71" />
            <Link to="/user-request-form">
            Property Request
            </Link>
          </div>
        </div>
      </Col>
    </>
  );
};

export default SideBarProfile;
