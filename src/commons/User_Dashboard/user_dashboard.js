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
import eye2 from "../../assets/eye2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import UserdashboardSideBar from "./Sidebar";
import NavComponent from "./NavComponent";
import SecondNavComponent from "./SecondNavComponent";
import { Link } from "react-router-dom";

const Userdashboard = (props) => {
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
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    console.log(userToken);
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
          console.log(res1);
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

  const {
    user,
    propertyList,
    totalDoc,
    applicationStatus,
    isUploading,
    deleteModal,
    propertySlide,
    isloading,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <UserdashboardSideBar dashboard={true}/>
          <Col md={9} className="udshboard">
            <NavComponent />
            <div className="userdahbdname">
              Good Morning{" "}
              <span>
                {user?.firstname} {user.lastname}
              </span>
            </div>
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="apstatus-section">
              <div className="applctnheader">
                <p className="udashboadprimheader">Application status</p>
                <div>
                  <img src={eye} className="udshbdeye" /> View
                </div>
              </div>
              <div className="appstatusheadings">
                <div>Home Name</div>
                <div>Home Value</div>
                <div>Status</div>
                <div></div>
              </div>
              <div className="statusline-img"></div>
              <div className="appstatus">
                <div className="statsitem">
                  {applicationStatus[0]?.property_info[0]?.name}
                </div>
                <div className="itemprice">
                  ₦{FormatAmount(applicationStatus[0]?.property_value)}
                </div>
                {false && <div className="statsreview-btn">Under Review</div>}
                {false && (
                  <div className="statsreview-btn completed12">Completed</div>
                )}
                {true && (
                  <div className="statsreview-btn notstarted">Not Started</div>
                )}
                <div className="statsprints-btn">Print</div>
              </div>
            </div>
            <div className="mobile_appstatus_section">
              <div className="mobileappstatsheader">
                <p className="udashboadprimheader">Application status</p>
                <div className="statsreview-btn ">Under Review</div>
              </div>
              <div className="mobile_appstatusbody">
                <div className="mobilestatusitem">
                  <p className="mobileppstheadin"> Name</p>
                  <p className="mobileitemprice">
                    {" "}
                    {applicationStatus[0]?.property_info[0]?.name}
                  </p>
                </div>
                <div className="mobilestatusitem adjdiv">
                  <p className="mobileppstheadin"> Home Value</p>
                  <p className="mobileitemprice">
                    ₦{FormatAmount(applicationStatus[0]?.property_value)}
                  </p>
                </div>
              </div>
              <div className="viewdiv">
                <div className="mobviewbtn">
                  <img src={eye2} /> View
                </div>
                <div className="mobprintbtn">Print</div>
              </div>
            </div>
            <Row>
              <Col md={7} className="uyud1">
                <div className="udashbdaccdiv">
                  <Accordion defaultActiveKey="">
                    <Card className="udashbdacrd">
                      <Accordion.Toggle
                        as={Card.Header}
                        className="udashbdacc"
                        eventKey="5"
                      >
                        <p className="udashboadprimheader">Documents Upload</p>
                        <div className="doctxt">
                          <div>
                            <img src={loader} className="dshloader" />
                            {totalDoc["Total Uploaded"]}{" "}
                            <span className="thinss"> out of</span>{" "}
                            {totalDoc?.total_doc} {"  "} Documents Uploaded
                          </div>
                          <img src={caretdwn} className="dshgreencar" />
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body className="dashacccdbdy">
                          <div className="dashbdaccbdydescr">
                            <div className="tyofdoc">Type of Documents</div>
                            <div className="stats">status</div>
                          </div>
                          {propertyList?.map((data, i) => (
                            <div
                              className={
                                checkIfIsOdd(i)
                                  ? "dashbdaccbdyitems whitebackground"
                                  : "dashbdaccbdyitems"
                              }
                            >
                              <div className="dashbdacbdyitem1">
                                {data?.doc_name}
                                {console.log(data.is_uploaded)}
                              </div>
                              {data.is_uploaded == 1 ? (
                                <div className="dashbdacbdyitem2">
                                  <a href={data.filename} target={"blank"}>
                                    Uploaded{" "}
                                    {isUploading && (
                                      <span className="blank1w">
                                        {" "}
                                        <Spinner
                                          animation="grow"
                                          className="qloading"
                                          variant="success"
                                        />
                                      </span>
                                    )}
                                  </a>
                                </div>
                              ) : data.is_uploaded == 0 ? (
                                <div className="dashbdacbdyitem2 pendingbtn">
                                  Pending{" "}
                                </div>
                              ) : (
                                <div className="dashbdacbdyitem2 pendingbtn">
                                  Rejected{" "}
                                </div>
                              )}
                              <div className="dashbdacbdyitem3">
                                <img
                                  src={pen}
                                  onClick={() => fileRef?.click()}
                                />
                              </div>
                              {data?.is_uploaded == 1 ? (
                                <div className="dashbdacbdyitem4">
                                  <img
                                    src={cross}
                                    title="delete document"
                                    onClick={() => {
                                      openDeleteModal(data.id);
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="dashbdacbdyitem4">
                                  <img
                                    src={uploadimg}
                                    onClick={() => fileRef?.click()}
                                  />
                                </div>
                              )}
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(e, data.id)}
                                style={{ display: "none" }}
                                ref={(fileInput) => (fileRef = fileInput)}
                              />
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlay={true}
                  autoPlaySpeed={7000}
                  centerMode={false}
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite={true}
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 1,
                      paritialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 710,
                        min: 0,
                      },
                      items: 1,
                      paritialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 710,
                      },
                      items: 2,
                      paritialVisibilityGutter: 30,
                    },
                  }}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                  className="center-changed"
                >
                  <span className="carousel-section">
                    <img src={house} className="housess" alt="houses" />
                  </span>
                  <span className="carousel-section">
                    <img src={house2} className="housess" alt="houses" />
                  </span>
                </Carousel>
                <div className="propstatsdvsection">
                  <div className="propstatsdv">
                    <div className="savingsheader">Property Status</div>
                    {propertySlide?.property?.property_status ==
                      "Under Construction" && (
                      <div className="undsctrnbtn">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                    {propertySlide?.property?.property_status ==
                      "Completed" && (
                      <div className="undsctrnbtn completed12">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                  </div>
                  <div className="bung">
                    {propertySlide?.property?.property_name}
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Price</div>
                    <div className="prpice">
                      {propertySlide?.property?.currency_symbol}
                      {FormatAmount(propertySlide?.property?.property_price)}
                    </div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Payment Type</div>
                    <div className="prpnme2">
                      {propertySlide?.payment_option}
                    </div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Application date</div>
                    <div className="prpnme3">30th October 2020</div>
                  </div>
                </div>
                <div className="mobilepropstatsdv">
                  <div className="propstatsdv rmpad">
                    <div className="savingsheader mobsavheader">
                      Property Status
                    </div>
                    {propertySlide?.property?.property_status ==
                      "Under Construction" && (
                      <div className="undsctrnbtn mobstatsrvbtn">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                    {propertySlide?.property?.property_status ==
                      "Completed" && (
                      <div className="undsctrnbtn completed12">
                        {propertySlide?.property?.property_status}
                      </div>
                    )}
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading"> Name </p>
                    <p className="mobprop">
                      {" "}
                      {propertySlide?.property?.property_name}{" "}
                    </p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Price</p>
                    <p className="mobprop">₦200,000,000.00</p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Payment Type</p>
                    <p className="mobprop">{propertySlide?.payment_option}</p>
                  </div>
                  <div className="mobbung lastprop">
                    <p className="mobsubheading">Date of Purchase</p>
                    <p className="mobprop">30th October 2020</p>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="equitywrapper ">
                  <div>
                    <p className="udashboadprimheader"> Affordability Status</p>
                    <p className="equitytext">Total Loanable Amount</p>
                    <p className="equityamt">₦70,000,000.00</p>
                  </div>
                  <div>
                    <img src={equity} className="equityimg" />
                  </div>
                </div>
                <div className="equityamtdivs2">
                  <div className="equityamtdivs">
                    <div className="eqleftdv">
                      <p className="equitytext">Monthly Repayment</p>
                      <p className="equityamt">₦40,000,000.00</p>
                    </div>
                    <div className="eqrghtdv">
                      <p className="equitytext">Monthly Income</p>
                      <p className="equityamt">₦30,000,000.00</p>
                    </div>
                  </div>
                  <div className="ddod">
                    <Link to="/mortgage-request">
                      <span className="mortgage-btn">Apply</span>
                    </Link>
                  </div>
                </div>
                <CreditReport />
              </Col>
            </Row>
            <Row>
              <Mortgagecards />
            </Row>
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
export default Userdashboard;
