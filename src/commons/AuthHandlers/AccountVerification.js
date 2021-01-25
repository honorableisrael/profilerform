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

const AccountVerification = (props) => {
  const [state, setState] = React.useState({
    code: "",
    formError: "",
    passwordIsVisible: false,
    isloading: false,
    isLoading: false,
    errorMessage: "",
    success: "",
    email:""
  });
  const {
    code,
    errorMessage,
    passwordIsVisible,
    formError,
    isloading,
    isLoading,
    success,
  } = state;
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      errorMessage: "",
      success: "",
    });
  };
  const HidePassword = () => {
    setState({
      ...state,
      passwordIsVisible: passwordIsVisible ? false : true,
    });
  };
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
  }, []);
  const validateForm = (e) => {
    e.preventDefault();
    if (code == "") {
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    submitForm();
  };
  const submitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    setState({
      ...state,
      isloading: true,
    });
    const data = {
      code,
    };
    Axios.post(`${API}/user/verify-account`, data, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        console.log(res);
        // localStorage.removeItem("loggedInDetails")
        localStorage.setItem("loggedInDetails", JSON.stringify(res.data.data));
        setState({
          ...state,
          isloading: false,
          success: res?.data?.message,
          errorMessage: "",
        });
        window.location.assign("/user-profile");
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
  const ResendCode = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");

    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      code,
    };
    Axios.get(`${API}/user/resend-verify-code `, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isLoading: false,
          success: res?.data?.message,
          errorMessage: "",
        });
      })
      .catch((err) => {
        console.log(err?.response);
        if (err?.response?.status == 404) {
          return setState({
            ...state,
            errorMessage: err.response.data.data,
            isLoading: false,
          });
        }
        setState({
          ...state,
          errorMessage: "Failed to submit please try again later",
          isLoading: false,
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
              <div className="ctrl1">Account Verification</div>
              <div className="cicck">
                A code has been sent to {state.email}, please enter code below to
                Verify your Account
              </div>
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
                        formError && code?.trim() == ""
                          ? "userprofile formerror1 bg-white23"
                          : "userprofile bg-white23"
                      }
                    >
                      {"Code"}
                    </span>
                    <Form.Control
                      type="text"
                      onChange={onchange}
                      required
                      value={code}
                      className={
                        formError && code?.trim() == ""
                          ? "fmc2 formerror"
                          : "fmc2"
                      }
                      name="code"
                      placeholder="Enter Verification Code"
                    />
                  </Form.Group>
                  <div className="text-right">
                    <span className="plicy plicy1q" onClick={ResendCode}>
                      {" "}
                      {!isLoading ? "Resend" : "Resending"}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="">
                  <Button className="signnp" onClick={validateForm}>
                    {isloading ? "Submitting" : "Submit"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountVerification;
