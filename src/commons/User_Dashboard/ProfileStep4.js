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
import sliderImg from "../../assets/sampleslide.png";
import viewmore from "../../assets/viewmore.png";
import baths from "../../assets/bath.png";
import beds from "../../assets/beds.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import mkshift from "../../assets/mkshift.png";
import SecondNavComponent from "./SecondNavComponent";
import { data } from "jquery";
import "../styles.css"


const Profile_4 = (props) => {
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
    displaymoreInfo: false,
    selectPopUp: false,
    data1: {},
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
        axios.get(`${API}/user/user-files`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
        axios.get(`${API}/general/properties-suggestion`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res1) => {
          console.log(res1);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res1.data.data.flat(Infinity),
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
  const closeMoreinfoModal = () => {
    setState({
      ...state,
      displaymoreInfo: false,
    });
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
  const openMoreinfoModal = (id) => {
    propertyList.forEach((x) => {
      if (x.id == id) {
        setState({
          ...state,
          displaymoreInfo: true,
          documentId: id,
          data1: x,
        });
      }
    });
  };
  const saveProperty = (id) => {
    propertyList.forEach((x) => {
      if (x.id == id) {
        localStorage.setItem("SelectedProperty", JSON.stringify(x));
        props.history.push("/user-request-form-view");
      }
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
    do_you_have_equity,
    totalDoc,
    address,
    annual_salary,
    home_status,
    monthlygross,
    lastname,
    data1,
    selectPopUp,
    displaymoreInfo,
    isloading,
    propertyList,
    number_of_dependants,
  } = state;
  console.log(propertyList[0]);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile request={true} />
          <Col md={9} className="udshboard">
            <SecondNavComponent hideSearch={true} />
            {isloading && (
              <div className="text-center">
                <Spinner animation="grow" variant="info" />
              </div>
            )}
            <div className="proffl">Select a Property</div>
            <div className="selg">Check how much you can afford to borrow</div>
            <HeaderStats />
            <Col md={12} className="formwrapper1">
              <Form>
                <Row>
                  <Col md={12} className="mainwrapp2">
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
                          items: 2,
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
                          items: 1,
                          paritialVisibilityGutter: 30,
                        },
                      }}
                      showDots={false}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                      className="center-changed"
                    >
                      {propertyList.map((data, i) => (
                        <div className="slidewrapp" key={i}>
                          <div className="viewmorr">
                            <img
                              src={viewmore}
                              className="viewmore1"
                              alt="viewmore"
                              onClick={() => openMoreinfoModal(data.id)}
                            />
                          </div>
                          <div className="imageContainer">
                            <img
                              src={sliderImg}
                              // src={data.property_cover_image}
                              alt="propertyslider"
                              className="propertyslider"
                            />
                          </div>
                          <div className="cardtextsection">
                            <div className="Detachedo1">
                              {" "}
                              {data.property_name} {data.property_state}
                            </div>
                            <div className="Detachedo">
                              ₦ {FormatAmount(data.property_price)}
                            </div>
                            <div className="bedsbaths">
                              <span className="biid1">
                                <img src={beds} className="baths" />{" "}
                                {data.property_bedrooms}{" "}
                                {data.property_bedrooms == 1
                                  ? "bedroom"
                                  : "beds"}{" "}
                              </span>
                              <span>
                                <img src={baths} className="baths" />{" "}
                                {data.property_bathrooms}{" "}
                                {data.property_bathrooms == 1
                                  ? "baths"
                                  : "baths"}{" "}
                              </span>
                            </div>
                            <div className="statuss1">
                              {data.property_finance_option && (
                                <span>
                                  Finance status :{" "}
                                  <span className="textred12">
                                    {" "}
                                    {data.property_finance_option}
                                  </span>
                                </span>
                              )}
                              <div className="firstspam">
                                Property Status :{" "}
                                <span className="textggrn">
                                  {" "}
                                  {data.property_status}
                                </span>
                              </div>
                            </div>
                            <Button
                              className="proptybtn"
                              onClick={() => saveProperty(data.id)}
                            >
                              Choose this Property
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </Col>
                </Row>
                <Row className="poll878 polz2">
                  <Col md={6}>
                    <Link to="/user-affordability-test">
                      <Button className="continue1 polld">Previous</Button>
                    </Link>
                  </Col>
                  <Col md={6}>
                    <Button className="continue1" onClick={openSelectPopUp}>
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
        show={displaymoreInfo}
        className="modcomplete fixmodal"
        centered={true}
        onHide={closeMoreinfoModal}
      >
        {" "}
        <div className="textright22">
          <span className="times42" onClick={closeMoreinfoModal}>
            &times;
          </span>
        </div>
        <div className="containffe">
          <div className="slidewrapplarge descro1">
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
                  items: 1,
                  paritialVisibilityGutter: 30,
                },
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
              className="center-changed1"
            >
              {data1?.propertyphoto?.map((data, i) => (
                <div className="slidewrapplarge3">
                  {/* <img
                    src={data.filename}
                    alt="slide"
                    className="largeimgslide"
                  /> */}
                  <img src={mkshift} alt="slide" className="largeimgslide" />
                </div>
              ))}
            </Carousel>
            <div className="housee1a">
              <div className="housee11">
                <div className="housee">
                  {data1.property_name} {data1.property_state}
                </div>
                <div className="aamt">
                  {" "}
                  ₦ {FormatAmount(data1.property_price)}
                </div>
              </div>

              <div className="flxc">
                <div className="biid1">
                  <img src={beds} className="baths" /> {data1.property_bedrooms}{" "}
                  {data1.property_bedrooms == 1 ? "bedroom" : "beds"}{" "}
                </div>
                <div>
                  <img src={baths} className="baths" />{" "}
                  {data1.property_bathrooms}{" "}
                  {data1.property_bathrooms == 1 ? "baths" : "baths"}{" "}
                </div>
                <div className="fina11">
                  Finance status :{" "}
                  <span className="textred12">
                    {data1.property_finance_option}
                  </span>
                </div>
                <div className="fina112">
                  Property Status :{" "}
                  <span className="textggrn"> {data1.property_status}</span>
                </div>
              </div>
              <div className="ffdda1">
                <div className="ffdda">Description</div>
                <div
                  className="ffdaa11"
                  dangerouslySetInnerHTML={{
                    __html: `${data1.property_description}`,
                  }}
                ></div>
              </div>
              <div className="newhomes">
                View on <a href="https://newhomes.ng"> newhomes.ng</a>
              </div>
              <div>
                <Button
                  className="continue1 nomargn"
                  onClick={() => saveProperty(data1.id)}
                >
                  Choose this property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        show={selectPopUp}
        className="modd"
        centered={true}
        size={"md"}
        onHide={closeSelectPopUp}
      >
        <Container className="intmod">
          <Row>
            <Col md={12}>
              <div className="moddtitle ">
                Hmmm!You have not selected any property
              </div>
              <div className="exvited">
                we are excited you made it this far, however just a few step to
                your dream home... You need to choose a property from the
                options we provided or request a property if you didnt find your
                preferred
              </div>
            </Col>
          </Row>
          <div className="pdkd flex23">
            <div className="pdkd2">
              <Button
                className="nue1a nue1b polld mgoo"
                onClick={closeSelectPopUp}
              >
                Go Back
              </Button>
            </div>
            <div className="pdkd2">
              <Link to="/user-request-form">
                <Button className="nue1a mgoo">Request a property</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
};
export default Profile_4;
