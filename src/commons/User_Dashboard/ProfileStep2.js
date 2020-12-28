import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.css";
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
import HeaderStats from "./HeaderStats";
import { Link } from "react-router-dom";

const Profile_2 = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    BVN: "",
    propertySlide: {},
    isUploading: false,
    nhf_number: "",
    isloading: false,
    isDeleting: false,
    yearstoretirement: "",
    fap_number: "",
    Rank: "",
    lengthofservice: "",
    StateofDeployment: "",
    Command: "",
    number_of_dependants: "",
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
      lengthofservice == "" ||
      yearstoretirement == "" ||
      BVN == "" ||
      state_of_origin == "" ||
      Command == "" ||
      fap_number == "" ||
      Rank == "" ||
      nhf_number == "" ||
      StateofDeployment == "" ||
      number_of_dependants == ""
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
      address,
      lengthofservice,
      phone,
      BVN,
      date_of_birth,
      number_of_dependants,
      yearstoretirement,
      home_status,
      fap_number,
      lastname,
      mode_of_contact,
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
    user,
    nhf_number,
    totalDoc,
    address,
    lengthofservice,
    phone,
    date_of_birth,
    state_of_origin,
    home_status,
    fap_number,
    yearstoretirement,
    lastname,
    Command,
    Rank,
    StateofDeployment,
    mode_of_contact,
    deleteModal,
    formError,
    isloading,
    BVN,
    number_of_dependants,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile profile={true} />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Profile</div>
            <HeaderStats />
            <Col md={12} className="lldl">
              <div className="oll12">
                Hi <span className="name2p"> Olumide Olorundare</span>
              </div>
              <div className="selg">Provide your Employment Information</div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && fap_number == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        F/AP Number
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={fap_number}
                        className={
                          formError && fap_number == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="fap_number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && Command == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Command
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={Command}
                        className={
                          formError && Command == "" ? "fmc formerror" : "fmc"
                        }
                        name="Command"
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
                          formError && Rank == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Rank
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && Rank == "" ? "fmc formerror" : "fmc"
                        }
                        name="Rank"
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="Mini">Mini</option>
                        <option value="N/A">N/A</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && StateofDeployment == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        State of Deployment
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && StateofDeployment == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="StateofDeployment"
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
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && lengthofservice == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Length of Service
                      </span>
                      <Form.Control
                        type="lengthofservice"
                        onChange={onchange}
                        required
                        value={lengthofservice}
                        className={
                          formError && lengthofservice == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="lengthofservice"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">years</span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && yearstoretirement == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Years to Retirement
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={yearstoretirement}
                        className={
                          formError && yearstoretirement == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="yearstoretirement"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">years</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && nhf_number == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        NHF Number
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={nhf_number}
                        className={
                          formError && nhf_number == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="nhf_number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && BVN == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        BVN
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={BVN}
                        className={
                          formError && Command == "" ? "fmc formerror" : "fmc"
                        }
                        name="BVN"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Link to="/user-profile">
                      <Button className="continue1 polld">Previous</Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button className="continue1" onClick={validateForm}>
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
export default Profile_2;
