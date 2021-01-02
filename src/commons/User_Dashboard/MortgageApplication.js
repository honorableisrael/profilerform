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

const MortgageApplication = (props) => {
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
    mode_of_contact: "",
    number_of_dependants: "",
    middle_name: "",
    mothers_maiden_name: "",
    age: "",
    sex: "",
    nationality: "",
    place_of_birth: "",
    profession: "",
    highest_education: "",
    type_of_identification: "",
    id_number: "",
    id_issue_date: "",
    id_expiry_date: "",
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
      date_of_birth == "" ||
      state_of_origin == "" ||
      home_status == "" ||
      firstname == "" ||
      lastname == "" ||
      mode_of_contact == "" ||
      number_of_dependants == "" ||
      mothers_maiden_name == "" ||
      middle_name == "" ||
      nationality == "" ||
      age == "" ||
      sex == "" ||
      place_of_birth == "" ||
      state_of_origin == "" ||
      profession == "" ||
      highest_education == "" ||
      type_of_identification == "" ||
      id_number == "" ||
      id_issue_date == "" ||
      id_expiry_date == ""
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
      email,
      phone,
      date_of_birth,
      number_of_dependants,
      state_of_origin,
      home_status,
      firstname,
      type_of_identification,
      lastname,
      mode_of_contact,
      profession,
      middle_name,
      nationality,
      age,
      sex,
      highest_education,
      place_of_birth,
      id_expiry_date,
      id_issue_date,
      id_number,
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
    state_of_origin,
    totalDoc,
    address,
    email,
    phone,
    date_of_birth,
    profession,
    home_status,
    firstname,
    lastname,
    mode_of_contact,
    deleteModal,
    formError,
    isloading,
    type_of_identification,
    number_of_dependants,
    sex,
    nationality,
    mothers_maiden_name,
    age,
    highest_education,
    place_of_birth,
    middle_name,
    id_expiry_date,
    id_issue_date,
    id_number,
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
                Hi <span className="name2p"> Olumide Olorundare</span>
              </div>
              <div className="selg">
                Ordinary Mortgage | Personal Information
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
                          formError && firstname == ""
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
                          formError && firstname == "" ? "fmc formerror" : "fmc"
                        }
                        name="firstname"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && lastname == ""
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
                          formError && lastname == "" ? "fmc formerror" : "fmc"
                        }
                        name="lastname"
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
                          formError && middle_name == ""
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
                        value={middle_name}
                        className={
                          formError && middle_name == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="middle_name"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && mothers_maiden_name == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Maiden Name
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={mothers_maiden_name}
                        className={
                          formError && mothers_maiden_name == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="mothers_maiden_name"
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
                          formError && address == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Address
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={address}
                        className={
                          formError && address == "" ? "fmc formerror" : "fmc"
                        }
                        name="address"
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
                          formError && email == ""
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
                          formError && email == "" ? "fmc formerror" : "fmc"
                        }
                        name="email"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && phone == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Phone Number
                      </span>
                      <Form.Control
                        type="number"
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
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && age == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Age
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={age}
                        className={
                          formError && age == "" ? "fmc formerror" : "fmc"
                        }
                        name="age"
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
                          formError && sex == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Sex
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && sex == "" ? "fmc formerror" : "fmc"
                        }
                        name="sex"
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="MALE" class="otherss">
                          MALE
                        </option>
                        <option value="FEMALE">FEMALE</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && place_of_birth == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Place of Birth
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={place_of_birth}
                        className={
                          formError && place_of_birth == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="place_of_birth"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && nationality == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Nationality
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && nationality == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="nationality"
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
                  <Col md={4} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && state_of_origin == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        State of Origin
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
                          formError && highest_education == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Highest Education
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && highest_education == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="highest_education"
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
                          formError && profession == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Profession
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={profession}
                        className={
                          formError && profession == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="profession"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="fofofd">
                  <Col md={12} className="fofof">
                    <div className="meanas">Means of Identification</div>
                  </Col>
                  <Col md={3} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && type_of_identification == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Type of Identification
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && type_of_identification == ""
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
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && id_issue_date == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Number
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={id_number}
                        className={
                          formError && id_number == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="id_number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && id_issue_date == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Issue Date
                      </span>
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        value={id_issue_date}
                        className={
                          formError && id_issue_date == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="id_issue_date"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && id_expiry_date == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        ID Expiry Date
                      </span>
                      <Form.Control
                        type="date"
                        onChange={onchange}
                        required
                        value={id_expiry_date}
                        className={
                          formError && id_expiry_date == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="id_expiry_date"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Button
                      className="continue1 nomargn polld"
                      onClick={validateForm}
                    >
                      Go Back to property Selection
                    </Button>
                  </Col>
                  <Col md={6}>
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
export default MortgageApplication;
