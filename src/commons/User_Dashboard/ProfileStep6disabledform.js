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
import { Link } from "react-router-dom";
import handshake from "../../assets/handshake.png";
import SecondNavComponent from "./SecondNavComponent";
import { States } from "./states";



const Profile_6_disabled_pop = (props) => {
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
    monthlygross: "",
    number_of_bedrooms: "",
    number_of_bathrooms: "",
    fap_number: "",
    Rank: "",
    paymentOption: "",
    Command: "",
    number_of_dependants: "",
    home_type: "",
    disabledform: true,
    selectPopUp: false,
    firstname: "",
    lastname: "",
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("SelectedProperty");
    const currentProperty = userData
      ? JSON.parse(userData)
      : null;
    console.log(currentProperty);
    setState({
      ...state,
      property: currentProperty,
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
              property: currentProperty,
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
  const closeSelectPopUp = () => {
    setState({
      ...state,
      selectPopUp: false,
    });
  };
  const openSelectPopUp = () => {
    setState({
      ...state,
      selectPopUp: true,
    });
  };
  const validateForm = () => {
    if (
      address === "" ||
      number_of_bedrooms == "" ||
      monthlygross == "" ||
      BVN == "" ||
      state_of_origin == "" ||
      Rank == "" ||
      home_type == "" ||
      nhf_number == "" ||
      paymentOption == "" ||
      number_of_dependants == ""
    ) {
      setState({
        ...state,
        formError: "Please fill",
      });
    }
  };
  const submitForm = () => {
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
      property_id: null,
      directed_to: "police Deve",
      found_property: 0,
      state_id: currentProperty.state_id,
      city_id: 3,
      property_type_id: 4,
      request_type: "Home",
      property_value: property?.property_price,
      property_bedroom: property?.property_bedroom,
      budget: property?.property_price,
      payment_option: "Mortgage",
    };
    axios
      .post(`${API}/user/property-request`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Successfully Requested for property");
        console.log(res);
        setState({
          ...state,
          isUploading: false,
        });
        setTimeout(() => {
          window.location.assign("/userdashboard");
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
  const closedisabledform = () => {
    setState({
      ...state,
      disabledform: false,
    });
  };
  const opendisabledform = () => {
    setState({
      ...state,
      disabledform: true,
    });
  };
  const {
    currentProperty,
    number_of_bathrooms,
    disabledform,
    nhf_number,
    home_type,
    totalDoc,
    address,
    number_of_bedrooms,
    firstname,
    lastname,
    state_of_origin,
    monthlygross,
    property,
    Rank,
    paymentOption,
    selectPopUp,
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
          <SideBarProfile property_request={true} />
          <Col md={9} className="udshboard">
            <SecondNavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Property Request</div>
            {/* <HeaderStats /> */}
            <Col md={12} className="lldl">
              <div className="oll12">
                Hi{" "}
                <span className="name2p">
                  {firstname} {lastname}
                </span>
              </div>
              <div className="selg">
                Please provide your preference for the type of property you
                would prefer
              </div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row className="">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && home_type == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Home type
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && home_type == "" ? "fmc formerror" : "fmc"
                        }
                        name="home_type"
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
                          formError && paymentOption == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Payment Option
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && paymentOption == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="paymentOption"
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
                          formError && number_of_bedrooms == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of Bedrooms
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={number_of_bedrooms}
                        className={
                          formError && number_of_bedrooms == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="number_of_bedrooms"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Bedrooms</span>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && monthlygross == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of Bathrooms
                      </span>
                      <Form.Control
                        type="number"
                        onChange={onchange}
                        required
                        value={monthlygross}
                        className={
                          formError && monthlygross == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthlygross"
                        placeholder=""
                      />
                      <div className="spna12">
                        <span className="spna122">Bathrooms</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878">
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span
                        className={
                          formError && home_type == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Desired State
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && home_type == "" ? "fmc formerror" : "fmc"
                        }
                        name="home_type"
                        onChange={handleChange}
                      >
                        <option>{state_of_origin}</option>
                        {States?.map((data, i) => (
                          <option value={data} class="otherss" key={i}>
                            {data}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span
                        className={
                          formError && paymentOption == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Desired City
                      </span>
                      <Form.Control
                        as="select"
                        className={
                          formError && paymentOption == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="paymentOption"
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
                <Row className="poll878">
                  <Col md={6}>
                    <Link to="/user-profile">
                      <Button className="continue1 polld">Previous</Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button className="continue1 innc" onClick={validateForm}>
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
        show={selectPopUp}
        className="modd"
        centered={true}
        size={"md"}
        onHide={closeSelectPopUp}
      >
        <Container className="intmod">
          <Row className="bnone">
            <Col md={12}>
              <div className="text-center">
                <img src={handshake} className="handshake" alt="handshake" />{" "}
              </div>
              <div className="moddtitle1">
                That was Awesome<span className="moddtitle">Olumide</span>
              </div>
              <div className="exvited">
                You have taken a very good first step towards aquiring this
                property Ut aliquet ut etiam fringilla vel
              </div>
            </Col>
          </Row>
          <div className="pdkd flex23">
            <div className="ookd2">
              <Link to="/">
                <Button className="nue1a nue1b polld nestt">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Modal>
      <Modal
        show={disabledform}
        className="modd moddw"
        centered={true}
        size={"md"}
        onHide={()=>setState({
          ...state,
          disabledform:true
        })}
      >
        <Container className="intmod">
          <Row className="bnone">
            <Col md={12}>
              <Form>
                <Row>
                  <Col md={12}>
                    <div className="proffl text-center centerww">
                      Property Request
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="nvnvv">
                      This is a summary of your preffered property please click
                      Submit Order to confirm request
                    </div>
                  </Col>
                </Row>
                <Row className="pushh1">
                  <Col md={6} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && home_type == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Home type
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={home_type}
                        className={
                          formError && home_type == "" ? "fmc formerror" : "fmc"
                        }
                        name="home_type"
                        placeholder=""
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="jjd1">
                    <Form.Group>
                      <span
                        className={
                          formError && monthlygross == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Number of Bathrooms
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property?.property_bathrooms}
                        className={
                          formError && monthlygross == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthlygross"
                        placeholder=""
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878">
                  <Col md={12} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && monthlygross == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Home value (₦)
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property?.property_price}
                        className={
                          formError && monthlygross == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthlygross"
                        placeholder=""
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878">
                  <Col md={6} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && monthlygross == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Desired State
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property?.property_state}
                        className={
                          formError && monthlygross == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthlygross"
                        placeholder=""
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="">
                    <Form.Group>
                      <span
                        className={
                          formError && monthlygross == ""
                            ? "userprofile formerror1"
                            : "userprofile"
                        }
                      >
                        Desired City
                      </span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={property?.property_city}
                        className={
                          formError && monthlygross == ""
                            ? "fmc formerror"
                            : "fmc"
                        }
                        name="monthlygross"
                        placeholder=""
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="poll878">
                  <Col md={6}>
                    <Link to="/user-profile">
                      <Button className="continue1 polld">
                        Not Sure yet, Go Back
                      </Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button
                      className="continue1 polld1q"
                      onClick={submitForm}
                    >
                      I’m Sure, Submit Order
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <div className="pdkd flex23">
            <div className="ookd2">
              {/* <Link to="/">
                <Button className="nue1a nue1b polld nestt">
                  Go to Dashboard
                </Button>
              </Link> */}
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
};
export default Profile_6_disabled_pop;
