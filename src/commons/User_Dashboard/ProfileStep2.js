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
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";

const Profile_2 = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    bvn: "",
    firstname: "",
    lastname: "",
    dob: "",
    propertySlide: {},
    isLoading: false,
    employment_id: "",
    isloading: false,
    isDeleting: false,
    year_to_retirement: "",
    employment_id: "",
    employment_present_position: "",
    policeRank: [],
    employment_state: "",
    employer_address: "",
    number_of_dependants: "",
    employer_nhf_registration_number: "",
    work_experience: "",
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    window.scrollTo(-0, -0);
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
        axios.get(`${API}/general/ranks`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res2, res3) => {
          console.log(res2);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              user: currentUser.user,
              isloading: false,
              policeRank: [...res2.data.data],
              ...res3.data.data,
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
    console.log(year_to_retirement);
    console.log(employment_id);
    console.log(employment_present_position);

    console.log(year_to_retirement);
    console.log(year_to_retirement);
    if (
      year_to_retirement == "" ||
      bvn == "" ||
      // employer_address == "" ||
      employment_id == "" ||
      employment_present_position == "" ||
      employment_state == "" ||
      employer_nhf_registration_number == "" ||
      employer_nhf_registration_number == null ||
      work_experience == ""
    ) {
      notify("Please fill the required feilds");
      return setState({
        ...state,
        formError: "Please fill",
      });
    }
    SumitForm();
  };
  const SumitForm = () => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/auth/login");
    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      bvn,
      employment_id,
      employer_address,
      number_of_dependants,
      year_to_retirement,
      employment_present_position,
      work_experience,
      employment_state,
      employer_nhf_registration_number,
      work_experience,
      firstname,
      lastname,
      dob,
    };
    axios
      .post(`${API}/user/profile`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully Saved profile information");
        console.log(res);
        setState({
          ...state,
          isLoading: false,
        });
        setTimeout(() => {
          props.history.push("/user-affordability-test");
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isLoading: false,
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
  const {
    isLoading,
    employment_id,
    firstname,
    lastname,
    dob,
    employer_nhf_registration_number,
    year_to_retirement,
    work_experience,
    employer_address,
    employment_present_position,
    employment_state,
    deleteModal,
    formError,
    isloading,
    bvn,
    number_of_dependants,
    policeRank,
  } = state;
  console.log(policeRank);
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
            <div className="proffl">Profile</div>
            <HeaderStats />
            <Col md={12} className="lldl">
              <div className="oll12">
                Hi{" "}
                <span className="name2p">
                  {" "}
                  {firstname} {lastname}
                </span>
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
                          formError && employment_id == ""
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
                        value={employment_id}
                        className={
                          formError && employment_id == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employment_id"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && employer_address == ""
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
                        value={employer_address}
                        className={
                          formError && employer_address == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employer_address"
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
                          formError && employment_present_position == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Rank
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && employment_present_position == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employment_present_position"
                        onChange={handleChange}
                      >
                        <option>{employment_present_position}</option>
                        {policeRank?.map((data, i) => (
                          <option value={data.name} class="otherss" key={i}>
                            {data.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && employment_state == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        State of Deployment
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && employment_state == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employment_state"
                        onChange={handleChange}
                      >
                        <option>{employment_state}</option>
                        {States?.map((data, i) => (
                          <option value={data} class="otherss" key={i}>
                            {data}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && work_experience == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Length of Service
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={work_experience}
                        className={
                          formError && work_experience == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="work_experience"
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
                          formError && year_to_retirement == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Years to Retirement
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={year_to_retirement}
                        className={
                          formError && year_to_retirement == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="year_to_retirement"
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
                          formError && employment_id == ""
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
                        value={employer_nhf_registration_number}
                        className={
                          formError && employer_nhf_registration_number == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="employer_nhf_registration_number"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && bvn == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        BVN
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={bvn}
                        className={
                          formError && bvn == "" ? "fmc formerror" : "fmc"
                        }
                        name="bvn"
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
                      {!isLoading ? "Continue" : "Updating"}
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
