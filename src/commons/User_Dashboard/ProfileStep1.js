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
import badge from "../../assets/badge.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SideBarProfile from "./SidebarProfile";
import NavComponent from "./NavComponent";

const Profile_1 = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    documentPath: "",
    imageName: "",
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
    home_status:"",
    mode_of_contact:""
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    console.log(userToken);
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
        axios.get(`${API}/user/user-mortgage-status`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/document-count`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/user/user-property-request`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1, res2, res3) => {
          console.log(res3);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              user: currentUser.user,
              applicationStatus: res1.data.data,
              totalDoc: res2.data.data,
              propertySlide: res3.data.data,
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
  const handleImageChange = (e, id) => {
    console.log(e);
    setState({
      ...state,
      file: e.target.files[0],
      imageName: e.target.files,
    });
    postNewDocument(id, e.target.files[0]);
  };
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const postNewDocument = (id, doc) => {
    setState({
      ...state,
      isUploading: true,
    });
    const { documentPath } = state;
    const userToken = localStorage.getItem("jwtToken");
    console.log(id);
    const data = new FormData();
    data.append("id", id);
    data.append("employmentid", doc);
    axios
      .post(`${API}/user/user-upload-file`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Document Uploaded Successfully");
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
        notifyFailed("Document Upload Failed");
        console.log(err);
      });
  };
  const DeleteExistingDocument = () => {
    setState({
      ...state,
      isDeleting: true,
    });
    const { documentPath } = state;
    const userToken = localStorage.getItem("jwtToken");
    console.log(state.documentId);
    axios
      .get(`${API}/user/user-delete-file/${state.documentId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        notify("Document Deleted Successfully");
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
        notifyFailed("Failed to delete document");
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
      married_status: e.target.value,
    });
  };
  const {
    user,
    address,
    totalDoc,
    email,
    phone,
    date_of_birth,
    state_of_origin,
    home_status,
    deleteModal,
    firstname,
    lastname,
    propertySlide,
    mode_of_contact,
    isloading,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Profile</div>
            <div className="gradwrap">
              <div className="mss">
                <div className="samry">Summary</div>
                <div className="maxa12">
                  <div className="firs122">
                    <div className="ton1">Maximum Loanable</div>
                    <div className="mza">₦ 0.00</div>
                  </div>
                  <div className="sec122">
                    <div className="ton1">Est. Monthly Repayment</div>
                    <div className="mza">₦ 0.00</div>
                  </div>
                  <div className="sec122">
                    <div className="ton1">Maximum Tenure</div>
                    <div className="mza">6 years</div>
                  </div>
                </div>
              </div>
              <div>
                <img src={badge} alt={"badge"} className="badge22" />
              </div>
            </div>
            <Col md={12} className="lldl">
              <div className="oll12">
                Hi <span className="name2p"> Olumide Olorundare</span>
              </div>
              <div className="selg">Tell us about your self</div>
              <div className="straightdivider"></div>
            </Col>
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span className="userprofile">First Name</span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={firstname}
                        className="fmc"
                        name="firstname"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span className="userprofile">Last Name</span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={lastname}
                        className="fmc"
                        name="lastname"
                        placeholder="   "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="">
                    <Form.Group>
                      <span className="userprofile">Address</span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={address}
                        className="fmc"
                        name="address"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span className="userprofile">Email</span>
                      <Form.Control
                        type="email"
                        onChange={onchange}
                        required
                        value={email}
                        className="fmc"
                        name="email"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span className="userprofile">Phone Number</span>
                      <Form.Control
                        type="text"
                        onChange={onchange}
                        required
                        value={phone}
                        className="fmc"
                        name="phone"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span className="userprofile">Marital Status</span>
                      <Form.Control
                        as="select"
                        className="fmc"
                        name="married_status"
                        onChange={handleChange}
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span className="userprofile">Current Home Status</span>
                      <Form.Control
                        as="select"
                        className="fmc"
                        name="home_status"
                        onChange={handleChange}
                      >
                        <option value="Mini">Mini</option>
                        <option value="N/A">N/A</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="eachfield">
                    <Form.Group>
                      <span className="userprofile">Preffered Mode of Contact</span>
                      <Form.Control
                        as="select"
                        className="fmc"
                        name="mode_of_contact"
                        onChange={handleChange}
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="eachfield2">
                    <Form.Group>
                      <span className="userprofile">Number of Dependant</span>
                      <Form.Control
                        as="select"
                        className="fmc"
                        name="home_status"
                        onChange={handleChange}
                      >
                        <option value="Mini">Mini</option>
                        <option value="N/A">N/A</option>
                      </Form.Control>
                    </Form.Group>
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
            <Button
              className="btn-success succs"
              onClick={DeleteExistingDocument}
            >
              {!state.isDeleting ? "Delete" : "Processing"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile_1;
