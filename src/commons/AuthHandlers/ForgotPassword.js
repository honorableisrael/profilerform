import React from "react";
import HomeNav from "../HomeNavbar/HomeNav";
import { Container } from "react-bootstrap";
import { Col, Row, Form, Button } from "react-bootstrap";
import eye from "../../assets/eyes.png";
import eyeoff from "../../assets/eye-off.png";
import "../HomeNavbar/style.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API } from "../../config";
import { Alert } from "react-bootstrap";

const PasswordRecovery = (props) => {
  const [state, setState] = React.useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    formError: "",
    passwordIsVisible: false,
    isloading: false,
    errorMessage: "",
    success: "",
  });
  const {
    firstname,
    lastname,
    email,
    password,
    errorMessage,
    passwordIsVisible,
    formError,
    isloading,
    success,
  } = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      :""
    console.log(currentUser);
    if(currentUser){
      if (currentUser?.user?.has_profile == 1) {
      return  window.location.assign("/userdashboard");
      }
      else{
        window.location.assign("/user-profile")
      }
    }
  }, []);
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      success:"",
    });
  };
  const HidePassword = () => {
    setState({
      ...state,
      passwordIsVisible: passwordIsVisible ? false : true,
    });
  };
  const validateForm = (e) => {
    e.preventDefault()
    if (email == "") {
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    submitForm();
  };
  const submitForm = () => {
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      email,
    };
    Axios.post(`${API}/auth/forgot-password`, data)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isloading: false,
          success: res?.data?.message,
        });
      })
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status == 404) {
          return setState({
            ...state,
            errorMessage: err.response.data.data,
            isloading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "Failed to submit please try again later",
          isloading: false,
        });
      });
  };
  return (
    <>
      <HomeNav></HomeNav>
      <Container fluid={true} className="pushtopundernav">
        <Row className="tmid">
          <Col md={5} className="whitcont1">
            <Form onSubmit={validateForm}>
              <div className="ctrl1">Password Recovery</div>
              <div></div>
              <div>
                {errorMessage && (
                  <Alert variant={"danger"} className="infoo1">
                    {errorMessage}
                  </Alert>
                )}
                {success && (
                  <Alert variant={"info"} className="infoo1">
                    {success}
                  </Alert>
                )}
              </div>
              <Row>
                <Col md={12} className="">
                  <Form.Group>
                    <span
                      className={
                        formError && email?.trim() == ""
                          ? "userprofile formerror1 bg-white23"
                          : "userprofile bg-white23"
                      }
                    >
                      Email{" "}
                    </span>
                    <Form.Control
                      type="text"
                      onChange={onchange}
                      required
                      value={email}
                      className={
                        formError && email?.trim() == ""
                          ? "fmc2 formerror"
                          : "fmc2"
                      }
                      name="email"
                      placeholder="Enter the email address you registered with"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <Button className="signnp" onClick={validateForm}>
                    {isloading ? "Submitting" : "Submit"}
                  </Button>
                </Col>
                <Col md={12}>
                  <div className="rigistxt">
                    Already have an account?
                    <Link to="/signup" className="plicy">
                      {" "}
                      Sign Up
                    </Link>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordRecovery;
