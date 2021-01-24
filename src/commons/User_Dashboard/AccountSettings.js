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
import UserdashboardSideBar from "./Sidebar";
import { API } from "../../config";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBarProfile from "./SidebarProfile";
import { Link } from "react-router-dom";
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";
import { formatDate } from "./controller";
import NavComponent from "./NavComponent";

const AccountSettings = (props) => {
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
    dobError: "",
    isloading: false,
    isLoading: false,
    Error: false,
    documentId: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
    middlename: "",
    mother_middle_name: "",
    sex: "",
    nationality: "",
    place_of_birth: "",
    profession: "",
    highest_education: "",
    means_of_identification: "",
    passwordError:"",
    password: "",
    confirm_password: "",
    new_password: "",
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
        console.log(err);
        setState({
          ...state,
          isloading: false,
        });
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const validateForm = () => {
    if (phone?.length < 10) {
      return setState({
        ...state,
        Error: "Incorrect Phone number",
        formError: "Error",
      });
    }
    const today = new Date();
    const thisyear = today.getFullYear();
    const user_age = thisyear - parseInt(dob.split("-")[0]);
    console.log(parseInt(dob.split("-")[0]) - thisyear);
    if (dob.length !== 10 || parseInt(dob) > thisyear) {
      return setState({
        ...state,
        dobError: "Invalid date of birth",
        formError: "Error",
      });
    }
    if (user_age < 21) {
      console.log(user_age);
      return setState({
        ...state,
        dobError: "User must be older than 21",
        formError: "Error",
      });
    }
    if (
      !address ||
      !email ||
      !phone ||
      !firstname ||
      !lastname ||
      !middlename ||
      !sex ||
      !dob
    ) {
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    SumitForm();
  };
  const validatePassword = () => {
    if (new_password !== confirm_password) {
      notify("new password does not match with confirm password")
      return setState({
        ...state,
        Error: "new password does not match with confirm password",
        passwordError: "Error",
      });
    }
    if (!password || !new_password || !confirm_password) {
      notify("Please enter password");
      return setState({
        ...state,
        passwordError: "Please enter password",
      });
    }
    changePassword();
  };
  const SumitForm = () => {
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
      address,
      dob,
      firstname,
      lastname,
      email,
      phone,
      home_status,
      profession,
      middlename,
      age,
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
  const changePassword = () => {
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
      password,
    };
    axios
      .post(`${API}/user/change-password-auth`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully changed password");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
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
      dobError: "",
    });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      dobError: "",
    });
  };
  const test = ["New", "Old"];
  const {
    Error,
    dobError,
    totalDoc,
    address,
    email,
    phone,
    dob,
    profession,
    home_status,
    firstname,
    lastname,
    deleteModal,
    formError,
    isloading,
    isLoading,
    sex,
    age,
    passwordError,
    middlename,
    employment_status,
    password,
    confirm_password,
    new_password,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <UserdashboardSideBar hideads={true} />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Update Account Settings</div>
            <Col md={12} className="nolefft">
              <div className="selg">Please update your account information</div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && !firstname
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        First Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={firstname}
                        className={
                          formError && !firstname ? "fmc formerror" : "fmc"
                        }
                        name="firstname"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !middlename
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Middle Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={middlename}
                        className={
                          formError && !middlename ? "fmc formerror" : "fmc"
                        }
                        name="middlename"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !lastname
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Last Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={lastname}
                        className={
                          formError && !lastname ? "fmc formerror" : "fmc"
                        }
                        name="lastname"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && !address
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Residential Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={address}
                        className={
                          formError && !address ? "fmc formerror" : "fmc"
                        }
                        name="address"
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
                          formError && !email
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Email
                      </span>
                      <Form.Control
                        type="email"
                        onChange={onchange}
                        required
                        value={email}
                        className={
                          formError && !email ? "fmc formerror" : "fmc"
                        }
                        name="email"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !phone
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Phone Number
                      </span>
                      {phone?.length < 10 && (
                        <span
                          className={
                            phone?.length < 10
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
                        value={phone}
                        className={
                          formError && !phone ? "fmc formerror" : "fmc"
                        }
                        name="phone"
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
                          formError && !sex
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Sex
                      </span>
                      <Form.Control
                        as="select"
                        className={formError && !sex ? "fmc formerror" : "fmc"}
                        name="sex"
                        onChange={handleChange}
                      >
                        <option>{sex}</option>
                        <option value="Male" class="otherss">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && !dob
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Date of Birth
                      </span>
                      {dob.length !== 10 ||
                        (dobError && "userprofile formerror1" && (
                          <span
                            className={
                              dob.length !== 10
                                ? "userprofile formerror13"
                                : "userprofile"
                            }
                          >
                            {dobError}
                          </span>
                        ))}
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        as={"input"}
                        value={dob}
                        className={formError && !dob ? "fmc formerror" : "fmc"}
                        name="dob"
                        placeholder={dob}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Button
                      className="continue1 nomargnda dsx22"
                      onClick={validateForm}
                    >
                      {!isLoading ? "Save Changes" : "Saving"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md={12} className="">
              <div className="proffl">Password Update</div>
              <Col md={12} className="nolefft">
                <div className="selg"></div>
              </Col>
              <Col md={12} className="formwrapper1aa">
                <Form>
                  <Row>
                    <Col md={6} className="eachfield">
                      <Form.Group>
                        <span
                          className={
                            passwordError && !password
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Old Password
                        </span>
                        <Form.Control
                          type="password"
                          onChange={onchange}
                          required
                          value={password}
                          className={
                            passwordError && !password ? "fmc formerror" : "fmc"
                          }
                          name="password"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="eachfield2">
                      <Form.Group>
                        <span
                          className={
                            passwordError && !new_password
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          New Password
                        </span>
                        <Form.Control
                          type="password"
                          onChange={onchange}
                          required
                          value={new_password}
                          className={
                            passwordError && !new_password ? "fmc formerror" : "fmc"
                          }
                          name="new_password"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="eachfield2">
                      <Form.Group>
                        <span
                          className={
                            passwordError && !confirm_password
                              ? "userprofile formerror1"
                              : "userprofile"
                          }
                        >
                          Confirm Password
                        </span>
                        <Form.Control
                          type="password"
                          onChange={onchange}
                          required
                          value={confirm_password}
                          className={
                            passwordError && !confirm_password
                              ? "fmc formerror"
                              : "fmc"
                          }
                          name="confirm_password"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Button
                        className="continue1 nomargnda dsx22"
                        onClick={validatePassword}
                      >
                        {!isLoading ? "Save Changes" : "Saving"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
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
export default AccountSettings;
