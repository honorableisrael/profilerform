import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.scss";
import eye from "../../assets/show.png";
import close from "../../assets/close.png";
import "./animate.css";
import loader from "../../assets/loader.png";
import caretdwn from "../../assets/caret_down.png";
import equity from "../../assets/equity.png";
import Button from "react-bootstrap/Button";
import cavetleft from "../../assets/caretleft.png";
import cavetright from "../../assets/caretright.png";
import board from "../../assets/board.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import house from "../../assets/house.png";
import house2 from "../../assets/house2.png";
import pen from "../../assets/pen.png";
import cross from "../../assets/cross.png";
import uploadimg from "../../assets/uploadimg.png";
import CreditReport from "./creditreport";
import Mortgagecards from "./mortgagecards";
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
import SecondNavComponent from "./SecondNavComponent";

const MortgageApplication_SecondStep = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    file: "",
    propertySlide: {},
    isLoading: false,
    have_apply_for_mortgage:"",
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    documentId: "",
    firstname: "",
    lastname: "",
    dob: "",
    employer_address: "",
    email: "",
    Error: "",
    phone: "",
    year_to_retirement: "",
    married_status: "",
    home_status: "",
    employer_name: "",
    employment_is_confirmed: "",
    work_experience: "",
    employers_phone: "",
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
              propertyList: res.data.data,
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
    if (employers_phone.length < 11 || employers_phone.length > 11) {
      return setState({
        ...state,
        Error: "Invalid Phone number",
        formError: "Error",
      });
    }
    if (
      !employer_address ||
      !employer_email ||
      !employer_name ||
      !employers_phone ||
      !employment_present_position ||
      !employment_is_confirmed ||
      !work_experience ||
      !year_to_retirement
    ) {
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
    const data = {
      employer_address,
      employer_email,
      employer_name,
      employers_phone,
      employment_present_position,
      employment_is_confirmed,
      work_experience,
      dob,
      firstname,
      lastname,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successful");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/mortage-request-step-3");
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

  const checkIfIsOdd = (n) => {
    return Math.abs(n % 2) == 1;
  };
  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteModal: false,
    });
  };
  const openDeleteModal = (id) => {
    setState({
      ...state,
      deleteModal: true,
      documentId: id,
    });
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
    Error,
    totalDoc,
    employer_address,
    employer_email,
    employer_name,
    employers_phone,
    employment_present_position,
    work_experience,
    isLoading,
    year_to_retirement,
    employment_is_confirmed,
    deleteModal,
    formError,
    isloading,
    have_apply_for_mortgage,
    firstname,
    lastname,
    dob,
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
              <div className="oll12">
                Hi{" "}
                <span className="name2p">
                  {" "}
                  {firstname} {lastname}
                </span>
              </div>
              <div className="selg">
                Please provide your current employment status
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !employer_name
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Full Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employer_name}
                        className={
                          formError && !employer_name ? "fmc formerror" : "fmc"
                        }
                        name="employer_name"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !employer_email
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Company Email
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employer_email}
                        className={
                          formError && !employer_email ? "fmc formerror" : "fmc"
                        }
                        name="employer_email"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !employers_phone
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Phone Number
                      </span>
                      {employers_phone.length !== 11 && (
                        <span
                          className={
                            employers_phone?.length !== 11
                              ? "userprofile formerror13"
                              : "userprofile"
                          }
                        >
                          {Error}
                        </span>
                      )}
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={employers_phone}
                        className={
                          formError && !employers_phone
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employers_phone"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !employment_present_position
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Current Position
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employment_present_position}
                        className={
                          formError && !employment_present_position
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employment_present_position"
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
                          formError && !employer_address
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employer_address}
                        className={
                          formError && !employer_address
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employer_address"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !year_to_retirement
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of years to Retirement
                      </span>
                      <Form.Control
                        type="number"
                        className={
                          formError && !year_to_retirement
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="year_to_retirement"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !work_experience
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Years at Current Employment(Years)
                      </span>
                      <Form.Control
                        type="number"
                        className={
                          formError && !work_experience
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="work_experience"
                        onChange={handleChange}
                        placeholder=""
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !employment_is_confirmed
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Has your Employment been Confirmed
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employment_is_confirmed}
                        className={
                          formError && !employment_is_confirmed
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employment_is_confirmed"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Button
                      className="continue1 nomargn"
                      onClick={validateForm}
                    >
                      {!isLoading ? "Continue" : "Processing"}
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
      <Modal
        show={deleteModal}
        className="modcomplete fixmodal"
        centered={true}
        onHide={closeDeleteModal}
      >
        <div className="dllel">
          <Modal.Title className="modal_title">Delete Document</Modal.Title>
          <a className="close_view" onClick={closeDeleteModal}>
            <img className="closeview" src={close} alt="close" />
          </a>
        </div>
        <Modal.Body>
          <div className="areyousure">
            You are about to delete this document please confirm?
          </div>
          <div className="od12">
            <Button className="btn-danger" onClick={closeDeleteModal}>
              Back
            </Button>
            <Button className="btn-success succs">
              {!state.isDeleting ? "Delete" : "Processing"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default MortgageApplication_SecondStep;
