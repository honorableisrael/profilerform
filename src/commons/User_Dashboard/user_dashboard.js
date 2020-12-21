import React, { useRef } from "react";
import { Container, Row, Col, Dropdown, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./user_dashboard.css";
import plus from "../../assets/plus.png";
import line from "../../assets/sidnavline.png";
import grid from "../../assets/grid.png";
import gridwhite from "../../assets/whitegrid.png";
import male from "../../assets/superhero.png";
import userimg from "../../assets/user-img.png";
import arrowhead from "../../assets/arrowhead.png";
import eye from "../../assets/show.png";
import statusline from "../../assets/statusline.png";
import searchImage from "../../assets/search.png";
import "./animate.css";
import loader from "../../assets/loader.png";
import caretdwn from "../../assets/caret_down.png";
import equity from "../../assets/equity.png";
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
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import eye2 from "../../assets/eye2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner"


const Userdashboard = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    documentPath: "",
    imageName: "",
    applicationStatus: {},
    file: "",
    propertySlide:{},
    isUploading:false,
    totalDoc: {},
  });
  let fileRef = useRef(null);
  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    console.log(userToken);
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/auth/signin");
    console.log(currentUser);
    setState({
      ...state,
      user: currentUser.user,
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
        axios.spread((res, res1, res2,res3) => {
          console.log(res3);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              user: currentUser.user,
              applicationStatus: res1.data.data,
              totalDoc: res2.data.data,
              propertySlide:res3.data.data
            });
          }
          if (res.status == 400) {
            props.history.push("/auth/signin");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
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
  const checkIfIsOdd = (n) => {
    return Math.abs(n % 2) == 1;
  };

  const { user, propertyList, totalDoc, applicationStatus,isUploading,propertySlide } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <Col md={3} className="dashbdsidenav">
            <h2 className="dshbdlogo">LOGO</h2>
            <div className="strtbtn">
              <img src={plus} className="sidenvimg" />
              Start new Application
            </div>
            <div className="sdenavline">
              <img src={line} className="img-fluid" />{" "}
            </div>
            <div className="mrginbttm">
              <div className="sidnavoptions">
                <img src={grid} className="sidenvimg" />
                Dashboard
              </div>
              <div className="sidnavoptionsna">
                <img src={gridwhite} className="sidenvimg" />
                Option 1
              </div>
              <div>
                <Accordion defaultActiveKey="" className="sidenavacc">
                  <Accordion.Toggle
                    as={Card.Header}
                    className="sidenavaccheader"
                    eventKey="5"
                  >
                    <img src={gridwhite} className="sidenvimg" /> Multiple
                    Option
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="5" className="">
                    <Card.Body className="sidenavaccbody">Option 1</Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              </div>
              <div className="sidnavoptionsna ">
                <img src={gridwhite} className="sidenvimg" />
                Option 2
              </div>
            </div>
            <div className="sdenavline2">
              <img src={line} className="img-fluid" />{" "}
            </div>
            <div className="sidnavsavingsdv">
              <h5 className="savingsheader">Easy way to Equity Saving</h5>
              <div className="savingspgphdiv">
                {" "}
                <p className="savingsprgrph">
                  with our all in one platform you can organise all your savings
                  in one place and on the go
                </p>
              </div>
              <img src={male} className="img-fluid" />
              <span className="sdenavsavingsbtn">Get the App</span>
            </div>
          </Col>
          <Col md={9} className="udshboard">
            <Row className="udashsearchdiv">
              <Col md={8}>
                <form className="dxxa">
                  <span className="sassa">
                    <img
                      src={searchImage}
                      alt="search"
                      className="searchImage"
                    />
                  </span>
                  <input
                    type="search"
                    size="80"
                    placeholder="Search"
                    className="dshbdsearchbar form-control"
                  />
                </form>
              </Col>
              <Col md={4}>
                <div className="userdashids">
                  <Dropdown className="uddrpdwndiv">
                    <img src={arrowhead} className="arrimg" />
                    <img src={userimg} className="uimg" />
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="usernavdrpdwn"
                    />
                    <Dropdown.Menu className="animated fadeIn">
                      <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Navbar />
                </div>
              </Col>
            </Row>
            <div className="userdahbdname">
              Good Morning{" "}
              <span>
                {user?.firstname} {user.lastname}
              </span>
            </div>
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
              <Col md={7}>
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
                                    Uploaded {" "}{isUploading && <span className="blank1w"> <Spinner animation="grow" className="qloading" variant="success"/></span>}
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
                                  <img src={cross} />
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
                    <div className="undsctrnbtn">Under Construction</div>
                  </div>
                  <div className="bung">{propertySlide?.property?.property_name}</div>
                  <div className="propprice">
                    <div className="prpnme">Price</div>
                    <div className="prpice">₦200,000,000.00</div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Payment Type</div>
                    <div className="prpnme2">Mortgage</div>
                  </div>
                  <div className="propprice">
                    <div className="prpnme">Date of Purchase</div>
                    <div className="prpnme3">30th October 2020</div>
                  </div>
                </div>
                <div className="mobilepropstatsdv">
                  <div className="propstatsdv rmpad">
                    <div className="savingsheader mobsavheader">
                      Property Status
                    </div>
                    <div className=" mobstatsrvbtn">Not Started</div>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading"> Name </p>
                    <p className="mobprop"> 5 Bedroom Detached Bungalow </p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Price</p>
                    <p className="mobprop">₦200,000,000.00</p>
                  </div>
                  <div className="mobbung">
                    <p className="mobsubheading">Payment Type</p>
                    <p className="mobprop">Mortgage</p>
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
                    <p className="udashboadprimheader"> Equity Savings</p>
                    <p className="equitytext">Total Equity Needed</p>
                    <p className="equityamt">₦70,000,000.00</p>
                  </div>
                  <div>
                    <img src={equity} className="equityimg" />
                  </div>
                </div>
                <div className="equityamtdivs">
                  <div className="eqleftdv">
                    <p className="equitytext">Total Saved</p>
                    <p className="equityamt">₦30,000,000.00</p>
                  </div>
                  <div className="eqrghtdv">
                    <p className="equitytext">Current Balance</p>
                    <p className="equityamt">₦40,000,000.00</p>
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
    </div>
  );
};
export default Userdashboard;
