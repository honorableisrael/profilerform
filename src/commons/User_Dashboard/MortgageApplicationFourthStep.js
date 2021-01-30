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

const Mortgage_Application_FourthStep = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    no_of_dependents: false,
    have_apply_for_mortgage:"",
    file: "",
    propertySlide: {},
    isLoading: false,
    totalDoc: {},
    isloading: false,
    loan_repayments: "",
    frequency: "",
    lender_name: "",
    current_apartment_status: "",
    total_annual_pay: "",
    monthly_gross_pay: "",
    loan_repayments: "",
    monthly_net_pay: "",
    monthly_expenses: "",
    have_loans: "",
    firstname: "",
    lastname: "",
    dob: "",
    id: "",
    loan_type: "",
    loan_frequency: "",
    outstanding_amount: "",
    loan_details: "",
    lender_name: "",
    existing_payment: "",
    outstanding_loanz: [],
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

  const validateNewRole = () => {
    if (
      existing_payment === "" ||
      lender_name === "" ||
      outstanding_amount === "" ||
      loan_frequency === "" ||
      loan_type === "" 
    ) {
      setState({
        ...state,
        formError: "Please fill",
      });
      return notify("Please Add Loan Information");
    }
    addNewLoan();
  };
  const addNewLoan = () => {
    const loan_details = [
      {
        loan_type,
        loan_frequency,
        outstanding_amount,
        lender_name,
        existing_payment,
      },
    ];
    setState({
      ...state,
      outstanding_loanz: outstanding_loanz.concat([...loan_details]),
      existing_payment: "",
      lender_name: "",
      outstanding_amount: "",
      loan_frequency: "",
      loan_type: "",
    });
  };
  const deleteExistingLoan = (id) => {
    const LoanList = outstanding_loanz;
    LoanList.splice(id, 1);
    setState({
      ...state,
      outstanding_loanz: LoanList,
    });
  };
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const validateForm = () => {
    window.scrollTo(-0,-0)
    if (
      !total_annual_pay ||
      !monthly_gross_pay ||
      !monthly_net_pay ||
      !monthly_expenses ||
      !have_loans
    ) {
      notify("Please fill all required fields");
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    setTimeout(() => {
      SubmitForm();
    }, 1000);
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
    if (
      (have_loans == "Yes" && existing_payment !== "") ||
      lender_name !== "" ||
      outstanding_amount !== "" ||
      loan_frequency !== "" ||
      loan_type !== ""
    ) {
      const loan_details = [
        {
          loan_type,
          loan_frequency,
          outstanding_amount,
          lender_name,
          existing_payment,
        },
      ];
      const data = {
        dob,
        firstname,
        lastname,
        outstanding_loans:outstanding_loanz.concat([...loan_details]),
        total_annual_pay,
        monthly_gross_pay,
        monthly_net_pay,
        monthly_expenses,
      };
      console.log(data);
      return axios
        .post(`${API}/user/profile`, data, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          notify("Successfully submitted finance form");
          console.log(res);
          setState({
            ...state,
            isLoading: false,
            existing_payment: "",
            lender_name: "",
            outstanding_amount: "",
            loan_frequency: "",
            loan_type: "",
          });
          setTimeout(() => {
            props.history.push("/mortage-request-step-5");
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
    }
    const data = {
      dob,
      firstname,
      lastname,
      outstanding_loans: [...outstanding_loanz],
      total_annual_pay,
      monthly_gross_pay,
      monthly_net_pay,
      monthly_expenses,
    };
    console.log(data);
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully submitted finance form");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/mortage-request-step-5");
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
    dob,
    total_annual_pay,
    current_apartment_status,
    have_loans,
    monthly_net_pay,
    monthly_expenses,
    formError,
    isloading,
    firstname,
    lastname,
    outstanding_loanz,
    monthly_gross_pay,
    isLoading,
    loan_frequency,
    have_apply_for_mortgage,
    loan_type,
    outstanding_amount,
    lender_name,
    existing_payment,
  } = state;
  console.log(outstanding_loanz);
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
                Looking good {firstname}! lets talk about your finances.
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
                        What is your total annual salary? (₦)
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
                      <div className="spna12">
                        <span className="spna122">Annually</span>
                      </div>
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
                        What is your monthly gross salary? (₦)
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
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
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
                        What is your monthly net salary? (₦)
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
                          formError && !monthly_expenses
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Estimated Monthly expenses
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
                      <div className="spna12">
                        <span className="spna122">Monthly</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !have_loans
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Do you have existing loans?
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && !have_loans && !have_loans
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="have_loans"
                        onChange={onchange}
                      >
                        <option>{have_loans}</option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {have_loans == "Yes" && (
                  <>
                    <Row className="fofofd">
                      <Col md={12} className="fofof neew11">
                        <div className="meanas">Outstanding Loan Details</div>{" "}
                        <div
                          className="saveneew animated pulse"
                          onClick={validateNewRole}
                        >
                          {" "}
                          Save +
                        </div>
                      </Col>
                      <Col md={4} className="eachfield">
                        <Form.Group>
                          <span
                            className={
                              formError && !lender_name
                                ? "userprofile formerror1"
                                : "userprofile"
                            }
                          >
                            Lender name
                          </span>
                          <Form.Control
                            className={
                              formError && !lender_name
                                ? "fmc formerror"
                                : "fmc"
                            }
                            value={lender_name}
                            onChange={onchange}
                            name="lender_name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4} className="eachfield2">
                        <Form.Group>
                          <span
                            className={
                              formError && !loan_type
                                ? "userprofile formerror1"
                                : "userprofile"
                            }
                          >
                            Lender type
                          </span>
                          <Form.Control
                            as="select"
                            onChange={onchange}
                            required
                            value={loan_type}
                            className={
                              formError && !loan_type ? "fmc formerror" : "fmc"
                            }
                            name="loan_type"
                            placeholder=""
                          >
                            <option></option>
                            <option value={"Personal loan"}>
                              Personal loan
                            </option>
                            <option value={"Mortgage"}>Mortgage</option>
                            <option value={"Payday loan"}>Payday loan</option>
                            <option value={"Car loan"}>Car loan</option>
                            <option value={"others"}>others</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="eachfield2">
                        <Form.Group>
                          <span
                            className={
                              formError && !loan_frequency
                                ? "userprofile formerror1"
                                : "userprofile"
                            }
                          >
                            Loan frequency
                          </span>
                          <Form.Control
                            as="select"
                            onChange={onchange}
                            required
                            value={loan_frequency}
                            className={
                              formError && !loan_frequency
                                ? "fmc formerror"
                                : "fmc"
                            }
                            name="loan_frequency"
                            placeholder=""
                          >
                            <option></option>
                            <option value={"Monthly"}>Monthly</option>
                            <option value={"Quarterly"}>Quarterly</option>
                            <option value={"yearly"}>yearly</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Row>
                          <Col md={4} className="eachfield2">
                            <Form.Group>
                              <span
                                className={
                                  formError && !existing_payment
                                    ? "userprofile formerror1"
                                    : "userprofile"
                                }
                              >
                                Existing Payment
                              </span>
                              <Form.Control
                                type="text"
                                onChange={onInputChange}
                                required
                                value={FormatAmount(existing_payment)}
                                className={
                                  formError && !existing_payment
                                    ? "fmc formerror"
                                    : "fmc"
                                }
                                name="existing_payment"
                                placeholder=""
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4} className="eachfield2">
                            <Form.Group>
                              <span
                                className={
                                  formError && !outstanding_amount
                                    ? "userprofile formerror1"
                                    : "userprofile"
                                }
                              >
                                Outstanding Amount
                              </span>
                              <Form.Control
                                type="text"
                                onChange={onInputChange}
                                required
                                value={FormatAmount(outstanding_amount)}
                                className={
                                  formError && !outstanding_amount
                                    ? "fmc formerror"
                                    : "fmc"
                                }
                                name="outstanding_amount"
                                placeholder=""
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}
                {have_loans == "Yes" && outstanding_loanz?.map((data, i) => (
                  <Row className="fofofd listdec">
                    <Col md={12} className="fofof neew11">
                      <div className="meanas"></div>{" "}
                      <div
                        className="saveneew animated pulse"
                        onClick={() => deleteExistingLoan(i)}
                      >
                        {" "}
                        Delete -
                      </div>
                    </Col>
                    <Col md={4} className="eachfield">
                      <Form.Group>
                        <span className={"userprofile"}>Lender name</span>
                        <Form.Control
                          className={"fmc listt"}
                          name="lender_name"
                          value={data?.lender_name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="eachfield2">
                      <Form.Group>
                        <span className={"userprofile"}>Lender type</span>
                        <Form.Control
                          value={data?.loan_type}
                          onChange={onchange}
                          required
                          disabled={true}
                          className={"fmc listt"}
                          name="loan_type"
                          placeholder=""
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="eachfield2">
                      <Form.Group>
                        <span className={"userprofile"}>Loan frequency</span>
                        <Form.Control
                          value={data?.loan_frequency}
                          onChange={onchange}
                          required
                          className={"fmc listt"}
                          name="loan_frequency"
                          placeholder=""
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Row>
                        <Col md={4} className="eachfield2">
                          <Form.Group>
                            <span className={"userprofile"}>
                              Existing Payment
                            </span>
                            <Form.Control
                              type="text"
                              onChange={onInputChange}
                              required
                              value={FormatAmount(data?.existing_payment)}
                              className={"fmc listt"}
                              name="existing_payment"
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4} className="eachfield2">
                          <Form.Group>
                            <span className={"userprofile"}>
                              Outstanding Amount
                            </span>
                            <Form.Control
                              type="text"
                              onChange={onInputChange}
                              required
                              value={FormatAmount(data?.outstanding_amount)}
                              className={"fmc listt"}
                              name="outstanding_amount"
                              placeholder=""
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col md={6}>
                    <Link to="/mortage-request-step-3">
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
export default Mortgage_Application_FourthStep;
