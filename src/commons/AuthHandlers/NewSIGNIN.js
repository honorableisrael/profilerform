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
import { sub } from "date-fns";

const NewSIGNIN = (props) => {
  const [state, setState] = React.useState({
    password: "",
    email: "",
    formError: "",
    passwordIsVisible: false,
    isloading: false,
    errorMessage: "",
  });
  const {
    isloading,
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
    if (email == "" || password == "") {
      return setState({
        ...state,
        formError: "Please fill",
        errorMessage: "All feilds are required",
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
    Axios.post(`${API}/auth/login`, data)
      .then((res) => {
        console.log(res)
        const { token } = res.data.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("loggedInDetails", JSON.stringify(res.data.data));
        if(res?.data?.data?.is_verified==0){
          return props.history.push("/account-verification")
        }
        if (res?.data?.data?.user?.has_profile == 0) {
          props.history.push("/user-profile");
        }
        if (res?.data?.data?.user?.has_profile == 1) {
          props.history.push("/userdashboard");
        }
        setState({
          ...state,
          isloading: false,
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
          errorMessage: "Failed to login please try again later",
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
              <div className="ctrl1">Sign In</div>
              <div className="text-center">
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
                      onKeyPress={(e) => {
                        if (e.key == "Enter") {
                          submitForm();
                        }
                      }}
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
                      <Link to="/password-recovery" className="plicy">
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
                    {isloading ? "Signing In" : "Sign In"}
                  </Button>
                </Col>
                <Col md={12}>
                  <div className="rigistxt">
                    Don't have an account?
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

export default NewSIGNIN;
