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
    monthlygross: "",
    annual_salary: "",
    fap_number: "",
    Rank: "",
    annual_salary: "",
    StateofDeployment: "",
    Command: "",
    number_of_dependants: "",
    do_you_have_equity: "",
    displaymoreInfo: false,
    selectPopUp: false,
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
      annual_salary == "" ||
      monthlygross == "" ||
      BVN == "" ||
      state_of_origin == "" ||
      Command == "" ||
      fap_number == "" ||
      Rank == "" ||
      do_you_have_equity == "" ||
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
      annual_salary,
      phone,
      BVN,
      date_of_birth,
      number_of_dependants,
      monthlygross,
      do_you_have_equity,
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
    setState({
      ...state,
      displaymoreInfo: true,
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
    do_you_have_equity,
    totalDoc,
    address,
    annual_salary,
    phone,
    date_of_birth,
    state_of_origin,
    home_status,
    fap_number,
    monthlygross,
    lastname,
    Command,
    Rank,
    StateofDeployment,
    mode_of_contact,
    selectPopUp,
    displaymoreInfo,
    isloading,
    BVN,
    number_of_dependants,
  } = state;
  console.log(totalDoc);
  return (
    <div>
      <Container fluid>
        <Row className="sdnnavrow">
          <SideBarProfile request={true} />
          <Col md={9} className="udshboard">
            <NavComponent hideSearch={true} />
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
                      <div className="slidewrapp">
                        <div className="viewmorr">
                          <img
                            src={viewmore}
                            className="viewmore1"
                            alt="viewmore"
                            onClick={openMoreinfoModal}
                          />
                        </div>
                        <div className="imageContainer">
                          <img
                            src={sliderImg}
                            alt="propertyslider"
                            className="propertyslider"
                          />
                        </div>
                        <div className="cardtextsection">
                          <div className="Detachedo1">
                            {" "}
                            4 Bd Detached House for Rent at Osapa London Lekki,
                            Lagos
                          </div>
                          <div className="Detachedo">₦ 70,000,000.00</div>
                          <div className="bedsbaths">
                            <span className="biid1">
                              <img src={beds} className="baths" /> 4 beds{" "}
                            </span>
                            <span>
                              <img src={baths} className="baths" /> 4 baths{" "}
                            </span>
                          </div>
                          <div className="statuss1">
                            <span>
                              Finance status :{" "}
                              <span className="textred12"> Not Available</span>
                            </span>
                            <div className="firstspam">
                              Property Status :{" "}
                              <span className="textggrn"> Off Plan</span>
                            </div>
                          </div>
                          <Button className="proptybtn">
                            Choose this Property
                          </Button>
                        </div>
                      </div>
                      <div className="slidewrapp">
                        <div className="viewmorr">
                          <img
                            src={viewmore}
                            className="viewmore1"
                            alt="viewmore"
                          />
                        </div>
                        <div className="imageContainer">
                          <img
                            src={sliderImg}
                            alt="propertyslider"
                            className="propertyslider"
                          />
                        </div>
                        <div className="cardtextsection">
                          <div className="Detachedo1">
                            {" "}
                            4 Bd Detached House for Rent at Osapa London Lekki,
                            Lagos
                          </div>
                          <div className="Detachedo">₦60,900,000.00</div>
                          <div className="bedsbaths">
                            <span className="biid1">
                              <img src={beds} className="baths" /> 4 beds{" "}
                            </span>
                            <span>
                              <img src={baths} className="baths" /> 4 baths{" "}
                            </span>
                          </div>
                          <div className="statuss1">
                            <span>
                              Finance status :{" "}
                              <span className="textred12"> Not Available</span>
                            </span>
                            <div className="firstspam">
                              Property Status :{" "}
                              <span className="textggrn"> Off Plan</span>
                            </div>
                          </div>
                          <Button className="proptybtn">
                            Choose this Property
                          </Button>
                        </div>
                      </div>
                    </Carousel>
                  </Col>
                </Row>
                <Row className="poll878 polz2">
                  <Col md={6}>
                    <Link to="/user-profile">
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
        <div className="containffe">
          <div className="slidewrapplarge">
            <img src={mkshift} alt="slide" className="largeimgslide" />
            <div className="housee1a">
              <div className="housee11">
                <div className="housee">
                  4 Bd Detached House for Rent at Osapa London Lekki, Lagos
                </div>
                <div className="aamt">₦ 70,000,000.00</div>
              </div>

              <div className="flxc">
                <div className="biid1">
                  <img src={beds} className="baths" /> 4 beds{" "}
                </div>
                <div>
                  <img src={baths} className="baths" /> 4 baths{" "}
                </div>
                <div className="fina11">
                  Finance status :{" "}
                  <span className="textred12"> Not Available</span>
                </div>
                <div className="fina112">
                  Property Status : <span className="textggrn"> Off Plan</span>
                </div>
              </div>
              <div className="ffdda1">
                <div className="ffdda">Description</div>
                <div className="ffdaa11">
                  The Address Homes-Femi Okunnu, 4 bed room semi-detached
                  house.This comprises of 20(NOS) beautiful contemporary 4
                  bedrooms luxury semi-detached and 4 fully detached homes with
                  1 bedroom QB on 3 floors where intelligent design that meets
                  aesthetics to create the perfect backdrop for the modern
                </div>
              </div>
              <div className="newhomes">
                View on <a href="https://newhomes.ng"> newhomes.ng</a>
              </div>
              <div>
                <Button className="continue1 nomargn">
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
              <div className="moddtitle ">Hmmm!You have not selected any property</div>
              <div className="exvited">
                we are excited you made it this far, however just
                a few step to your dream home... You need to choose a property
                from the options we provided or request a property if you didnt
                find your preferred
              </div>
            </Col>
          </Row>
          <div className="pdkd flex23">
            <div className="pdkd2">
              <Link to="/">
                <Button className="nue1a nue1b polld mgoo">Go Back</Button>
              </Link>
            </div>
            <div className="pdkd2">
              <Button className="nue1a mgoo" onClick={validateForm}>
                Request a property
              </Button>
            </div>
          </div>
        </Container> 
      </Modal>
    </div>
  );
};
export default Profile_4;
