import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.scss";
import eye from "../../assets/show.png";
import close from "../../assets/close.png";
import "./animate.css";

import Button from "react-bootstrap/Button";
import "react-multi-carousel/lib/styles.css";
import { API } from "../../config";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBarProfile from "./SidebarProfile";
import NavComponent from "./NavComponent";
import UserdashboardSideBar from "./Sidebar";
import HeaderStats from "./HeaderStats";
import { Link } from "react-router-dom";
import { formatDate } from "./controller";

const MortgageApplicationFifthStep = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    no_of_dependents: false,
    file: "",
    propertySlide: {},
    isLoading: false,
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    current_apartment_status: "",
    total_annual_pay: "",
    monthly_gross_pay: "",
    marital_status: "",
    have_loans: "",
    loan_repayments: "",
    monthly_net_pay: "",
    monthly_expenses: "",
    firstname: "",
    lastname: "",
    have_apply_for_mortgage:""
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    console.log(currentUser);
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              user: currentUser.user,
              isloading: false,
            });
          }
          if (res.status == 400) {
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
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const validateForm = () => {
    window.scrollTo(-0,-0)
    if (!current_apartment_status) {
      notify("Please fill all required fields");
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    SubmitForm();
  };
  const SubmitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/signin");
    setState({
      ...state,
      isLoading: true,
    });
    const data = {};
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully submitted ");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to save");
        console.log(err.response);
      });
  };

  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const {
    totalDoc,
    total_annual_pay,
    loan_repayments,
    current_apartment_status,
    have_loans,
    monthly_net_pay,
    monthly_expenses,
    formError,
    isloading,
    firstname,
    lastname,
    have_apply_for_mortgage,
    isLoading,
    monthly_gross_pay,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <UserdashboardSideBar hideads={true} mortgage={true} />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Mortgage Application</div>
            <Col md={12} className="lldl">
              <div className="selg">
                Loan info and Declaration
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row className="hht4 have_d">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !total_annual_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property Value (₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        value={FormatAmount(total_annual_pay)}
                        className={
                          formError && !total_annual_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="total_annual_pay"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_gross_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Proposed Equity Contribution
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_gross_pay)}
                        className={
                          formError && !monthly_gross_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_gross_pay"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row> 
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_net_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Loanable amount? (₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_net_pay)}
                        className={
                          formError && !monthly_net_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_net_pay"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_net_pay
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property title
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={monthly_net_pay}
                        className={
                          formError && !monthly_net_pay
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_net_pay"
                        placeholder=""
                      />
                    </Form.Group>{" "}
                  </Col>
                </Row>
                <Row className='movebbt'>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_expenses
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_expenses)}
                        className={
                          formError && !monthly_expenses
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_expenses"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !monthly_expenses
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Property Description
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onInputChange}
                        required
                        value={FormatAmount(monthly_expenses)}
                        className={
                          formError && !monthly_expenses
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthly_expenses"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Link to="/mortage-request-step-4">
                      <Button className="continue1 polld">Previous</Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button className="continue1" onClick={validateForm}>

                    {!isLoading?"Continue":"Processing..."}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        enableMultiContainer
        containerId={"t"}
        toastClassName="bg-info text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </div>
  );
};
export default MortgageApplicationFifthStep;
