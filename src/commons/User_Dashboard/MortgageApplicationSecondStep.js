import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.css";
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
import HeaderStats from "./HeaderStats";
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
    isUploading: false,
    totalDoc: {},
    isloading: false,
    isDeleting: false,
    documentId: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
    date_of_birth: "",
    state_of_origin: "",
    married_status: "",
    home_status: "",
    employers_fullname: "",
    has_your_employment_been_confirmed: "",
    years_at_current_employment: "",
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/auth/login");
    console.log(currentUser);
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
    });
    axios
      .all([
        axios.get(`${API}/user/user-files`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              user: currentUser.user,
              isloading: false,
            });
          }
          if (res.status == 400) {
            props.history.push("/auth/login");
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
    if (
      address === "" ||
      email == "" ||
      phone == "" ||
      address == "" ||
      company_email == "" ||
      employers_fullname == "" ||
      employers_phone == "" ||
      employers_current_position == "" ||
      employers_fullname == "" ||
      has_your_employment_been_confirmed == ""
    ) {
      setState({
        ...state,
        formError: "Please fill",
      });
    }
  };
  const SumitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/auth/login");
    setState({
      ...state,
      isUploading: true,
    });
    const data = {
      employers_fullname,
    };
    axios
      .post(`${API}/user/u`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully Saved profile information");
        console.log(res);
        setState({
          ...state,
          isUploading: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isUploading: false,
        });
        notifyFailed("Failed to save");
        console.log(err);
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
  const test = ["New", "Old"];
  const {
    email,
    totalDoc,
    address,
    company_email,
    employers_fullname,
    employers_phone,
    employers_current_position,
    phone,
    years_at_current_employment,
    state_of_origin,
    has_your_employment_been_confirmed,
    deleteModal,
    formError,
    isloading,
    firstname,
    lastname,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile profile={true} />
          <Col md={9} className="udshboard">
            <SecondNavComponent hideSearch={true} />
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
                          formError && employers_fullname == ""
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
                        value={employers_fullname}
                        className={
                          formError && employers_fullname == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employers_fullname"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && company_email == ""
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
                        value={company_email}
                        className={
                          formError && company_email == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="company_email"
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
                          formError && employers_phone == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Phone Number
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={employers_phone}
                        className={
                          formError && employers_phone == ""
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
                          formError && employers_current_position == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Employers Current Position
                      </span>
                      <Form.Control
                        type="email"
                        onChange={onchange}
                        required
                        value={email}
                        className={
                          formError && email == "" ? "fmc formerror" : "fmc"
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
                          formError && phone == ""
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
                        value={phone}
                        className={
                          formError && phone == "" ? "fmc formerror" : "fmc"
                        }
                        name="phone"
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
                          formError && state_of_origin == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of years to Retirement
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && state_of_origin == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="state_of_origin"
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="single" class="otherss">
                          Single
                        </option>
                        <option value="married">Married</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && years_at_current_employment == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Years at Current Employment
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && years_at_current_employment == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="years_at_current_employment"
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="single" class="otherss">
                          Single
                        </option>
                        <option value="married">Married</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && has_your_employment_been_confirmed == ""
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
                        value={has_your_employment_been_confirmed}
                        className={
                          formError && has_your_employment_been_confirmed == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="has_your_employment_been_confirmed"
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
                      Continue
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
