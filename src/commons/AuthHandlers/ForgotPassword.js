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
  });
  const {
    firstname,
    lastname,
    email,
    password,
    errorMessage,
    passwordIsVisible,
    formError,
  } = state;
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };
  const HidePassword = () => {
    setState({
      ...state,
      passwordIsVisible: passwordIsVisible ? false : true,
    });
  };
  const validateForm = () => {
    if (firstname == "" || email == "" || lastname == "" || password == "") {
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
      password,
    };
    Axios.post(`${API}/auth/forgot-password`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <HomeNav></HomeNav>
      <Container fluid={true} className="pushtopundernav">
        <Row className="tmid">
          <Col md={6} className="whitcont1">
            <Form onSubmit={validateForm}>
              <div className="ctrl1">Password Recovery</div>
              <div>
                Enter the email address you used when you joined. then provide a
                new password and we’ll send you instructions to reset your
                password.
              </div>
              <div>
                {errorMessage && (
                  <Alert variant={"danger"} className="infoo1">
                    {errorMessage}
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
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <Form.Group>
                    <span
                      className={
                        formError && password?.trim() == ""
                          ? "userprofile formerror1 bg-white23"
                          : "userprofile bg-white23"
                      }
                    >
                      Password{" "}
                    </span>
                    <Form.Control
                      type={passwordIsVisible ? "text" : "password"}
                      onChange={onchange}
                      required
                      value={password}
                      className={
                        formError && password?.trim() == ""
                          ? "fmc2 formerror"
                          : "fmc2"
                      }
                      name="password"
                      placeholder=""
                    />
                    <div className="wrapa1">
                      {passwordIsVisible ? (
                        <img
                          src={eye}
                          className="esyes"
                          onClick={HidePassword}
                        />
                      ) : (
                        <img
                          src={eyeoff}
                          className="esyes"
                          onClick={HidePassword}
                        />
                      )}
                    </div>
                    <div className="text-right">
                      <Link to="/passwordrecovery" className="plicy">
                        {" "}
                        Forgot your password? Recover it
                      </Link>
                    </div>
                    {/* <div className="charvalid">
                    Your password must be at least 6 characters
                  </div> */}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <Button className="signnp" onClick={validateForm}>
                    Sign In
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
