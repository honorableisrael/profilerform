import React from "react";
import "./form.scss";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../config";
import axios from "axios";
import SweetAlert from "sweetalert2-react";

const ApplicationForm = (props) => {
  const [state, setState] = React.useState({
    user: {},
    propertyList: [],
    formError: "",
    applicationStatus: {},
    deleteModal: false,
    need_mortgage: "",
    file: "",
    propertySlide: {},
    Developement: [],
    isUploading: false,
    totalDoc: {},
    isloading: false,
    have_mortgage: "",
    isDeleting: false,
    isLoading: false,
    employer: "",
    show: false,
    developer: "",
    development: "",
    dob: "",
    dobError: "",
    property_subscribed: "",
    email: "",
    purchase_price: "",
    down_payment: "",
    employment_status: "",
    monthly_pay: "",
    joint_borrower: "",
    borrower_type: "",
    Developer: [],
    PropertyUnits: [],
    form_of_payment: "",
    current_apartment_status: "",
    ras_holder: "",
    Error: "",
    fullname: "",
    hide: false,
    no_of_dependents: "",
  });

  React.useEffect(() => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData ? JSON.parse(userData) : "";
    console.log(currentUser);
    setState({
      ...state,
      user: currentUser.user,
      isloading: true,
    });
    const urlParams = new URLSearchParams(window.location.search);
    let urlkey = urlParams.get("preview");

    axios
      .all([
        axios.get(`${API}/general/house-developers`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          // console.log(res2);
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              Developer: [...res.data.data],
              propertyList: res.data.data,
              user: currentUser.user,
              isloading: false,
              hide: urlkey == "userprofile" ? true : false,
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
          hide: urlkey == "userprofile" ? true : false,
        });
        notifyFailed("Sorry failed to fetch data");
      });
  }, []);
  const notify = (message) => toast(message, { containerId: "t" });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const {
    isLoading,
    dobError,
    Developer,
    property_subscribed,
    email,
    fullname,
    down_payment,
    dob,
    employment_status,
    current_apartment_status,
    Developement,
    developer,
    need_mortgage,
    purchase_price,
    development,
    ras_holder,
    employer,
    form_of_payment,
    formError,
    borrower_type,
    have_mortgage,
    PropertyUnits,
    joint_borrower,
    monthly_pay,
    no_of_dependents,
  } = state;
  const validateForm = () => {
    window.scrollTo(-0, -0);

    // date of birth validation
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
      !property_subscribed ||
      !down_payment ||
      // !dob ||
      !employment_status ||
      developer == "" ||
      development == "" ||
      !ras_holder ||
      !monthly_pay
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
    setState({
      ...state,
      isLoading: true,
    });
    const data = {
      developer_id: developer,
      property_id: development,
      unit_id: property_subscribed,
      name: fullname,
      down_payment,
      monthly_income: monthly_pay,
      employment_status,
      employer,
      dob,
      borrower_type,
      purchase_price,
      mode_of_payment: form_of_payment,
      interested_in_mortgage: need_mortgage,
      joint_borrower_monthly_income: joint_borrower,
      is_ras_holder: ras_holder,
      // have_mortgage,
    };
    console.log(data);
    axios
      .post(`${API}/general/house-owner-affordability-test`, data)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isLoading: false,
          show: true,
        });
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to process");
        console.log(err.response);
      });
  };
  const handleDeveloperId = (e) => {
    setState({
      ...state,
      developer: e.target.value,
    });
    getDeveloperProperties(e.target.value);
  };
  const handlePropertyUnit = (e) => {
    setState({
      ...state,
      development: e.target.value,
    });
    getPropertiesUnit(e.target.value);
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const getPropertiesUnit = (id) => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData ? JSON.parse(userData) : "";
    setState({
      ...state,
      isLoading: true,
    });
    axios
      .get(`${API}/general/property-units/${id}`)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isLoading: false,
          development: id,
          PropertyUnits: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          isLoading: false,
        });
        notifyFailed("Failed to fetch");
        console.log(err);
      });
  };
  const getDeveloperProperties = (id) => {
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData ? JSON.parse(userData) : "";
    setState({
      ...state,
      isLoading: true,
    });
    axios
      .get(`${API}/general/developer-properties/${id}`)
      .then((res) => {
        console.log(res);
        setState({
          ...state,
          isLoading: false,
          Developement: res.data.data,
          developer: id,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isLoading: false,
        });
        notify("Failed to fetch");
        console.log(err);
      });
  };
  const onInputChange = (e) => {
    const letterNumber = /^[A-Za-z]+$/;
    if (e.target.value) {
      return setState({
        ...state,
        [e.target.name]: e.target.value.replace(/[^0-9]+/g, ""), //only accept numbers
      });
    }
    if (e.target.value < 0) {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
    if (e.target.value === "") {
      return setState({
        ...state,
        [e.target.name]: 0,
      });
    }
  };
  const FormatAmount = (amount) => {
    if (amount) {
      return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };
  console.log(development);
  console.log(developer);
  return (
    <Container className="profileerr">
      <SweetAlert
        show={state.show}
        title="Successful"
        text="Your have successfully submitted the form"
        onConfirm={() => setState({ ...state, show: false })}
      />
      <Row>
        <Col>
          <div className="fgh">HSF Profiler and Affordability</div>
        </Col>
        <Col md={12} className="formwrapper1">
          <Form>
            <Row>
              <Col md={6} className="eachfield">
                <Form.Group>
                  <span
                    className={
                      formError && developer == ""
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Developer
                  </span>
                  <Form.Control
                    as={"select"}
                    onChange={handleDeveloperId}
                    required
                    className={
                      formError && developer == "" ? "fmc formerror" : "fmc"
                    }
                    name="developer"
                    placeholder=""
                  >
                    <option></option>
                    {Developer?.map((data, i) => (
                      <option value={data.id} key={i}>
                        {data.developer_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && development == ""
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Development
                  </span>
                  <Form.Control
                    as="select"
                    onChange={handlePropertyUnit}
                    required
                    className={
                      formError && development == "" ? "fmc formerror" : "fmc"
                    }
                    name="development"
                    placeholder=""
                  >
                    <option></option>
                    {Developement?.map((data, i) => (
                      <option value={data.id} key={i}>
                        {data?.property_name} {data.property_city}{" "}
                        {data.property_state}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="dapadd">
                <Form.Group>
                  <span
                    className={
                      formError && !property_subscribed
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Property Subscribed to
                  </span>
                  <Form.Control
                    as="select"
                    onChange={onchange}
                    required
                    value={property_subscribed}
                    className={
                      formError && !property_subscribed
                        ? "fmc formerror"
                        : "fmc"
                    }
                    name="property_subscribed"
                    placeholder=""
                  >
                    <option></option>
                    {PropertyUnits?.map((data, i) => (
                      <option value={data?.id} key={i}>
                        {data?.unit_bathrooms}-
                        {data?.unit_bathrooms == 1 ? "Bathroom" : "Bathrooms"}{" "}
                        {data?.unit_bedrooms}-
                        {data?.unit_bedrooms == 1 ? "Bedroom" : "Bedrooms"}
                        --Price-{"N" + "" + FormatAmount(data?.unit_price)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield">
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
              <Col md={12} className="dapadd">
                <Form.Group>
                  <span
                    className={
                      formError && !fullname
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Full name
                  </span>
                  <Form.Control
                    type="text"
                    onChange={onchange}
                    required
                    value={fullname}
                    className={formError && !fullname ? "fmc formerror" : "fmc"}
                    name="fullname"
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
                      formError && !purchase_price
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Purchase Price (₦)
                  </span>
                  <Form.Control
                    type="text"
                    onChange={onInputChange}
                    value={FormatAmount(purchase_price)}
                    className={
                      formError && !purchase_price ? "fmc formerror" : "fmc"
                    }
                    name="purchase_price"
                    placeholder=""
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && !down_payment
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Equity paid so far (₦)
                  </span>
                  <Form.Control
                    type="text"
                    onChange={onInputChange}
                    required
                    value={FormatAmount(down_payment)}
                    className={
                      formError && !down_payment ? "fmc formerror" : "fmc"
                    }
                    name="down_payment"
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
                      formError && !ras_holder
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    RSA Holder
                  </span>
                  <Form.Control
                    as="select"
                    onChange={onchange}
                    required
                    value={ras_holder}
                    className={
                      formError && !ras_holder ? "fmc formerror" : "fmc"
                    }
                    name="ras_holder"
                    placeholder=""
                  >
                    <option></option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && !employment_status
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Employment Status
                  </span>
                  <Form.Control
                    as="select"
                    className={
                      formError && !employment_status ? "fmc formerror" : "fmc"
                    }
                    name="employment_status"
                    onChange={handleChange}
                  >
                    <option>{employment_status}</option>

                    <option value={"Employed"} class="otherss">
                      Employed
                    </option>
                    <option value="Employer">Employer</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && !employer
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Employer
                  </span>
                  <Form.Control
                    value={employer}
                    className={formError && !employer ? "fmc formerror" : "fmc"}
                    name="employer"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="eachfield">
                <Form.Group>
                  <span
                    className={
                      formError && !monthly_pay
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Monthly Income (₦)
                  </span>
                  <Form.Control
                    type={"text"}
                    className={
                      formError && !monthly_pay ? "fmc formerror" : "fmc"
                    }
                    value={FormatAmount(monthly_pay)}
                    name="monthly_pay"
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && !borrower_type
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Borrower Type
                  </span>
                  <Form.Control
                    as="select"
                    className={
                      formError && !borrower_type ? "fmc formerror" : "fmc"
                    }
                    name="borrower_type"
                    onChange={onchange}
                  >
                    <option></option>
                    <option value="Single">Single</option>
                    <option value="Joint">Joint</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {borrower_type == "Joint" && (
                <Col md={6} className="eachfield">
                  <Form.Group>
                    <span
                      className={
                        formError && !joint_borrower
                          ? "userprofile formerror1"
                          : "userprofile"
                      }
                    >
                      Joint Borrower (₦)
                    </span>
                    <Form.Control
                      type="text"
                      className={
                        formError && !joint_borrower ? "fmc formerror" : "fmc"
                      }
                      name="joint_borrower"
                      value={FormatAmount(joint_borrower)}
                      onChange={onInputChange}
                      placeholder="Enter amount"
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={6} className="eachfield2">
                <Form.Group>
                  <span
                    className={
                      formError && !form_of_payment
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Form of Payments
                  </span>
                  <Form.Control
                    as="select"
                    className={
                      formError && !form_of_payment ? "fmc formerror" : "fmc"
                    }
                    name="form_of_payment"
                    onChange={onchange}
                  >
                    <option></option>
                    <option value="Direct Deduction">Direct Deduction</option>
                    <option value="Transfer or Cash Payment">
                      Transfer or Cash Payment
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="eachfield">
                <Form.Group>
                  <span
                    className={
                      formError && !have_mortgage
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Do you have mortgage ?
                  </span>
                  <Form.Control
                    as="select"
                    className={
                      formError && !have_mortgage ? "fmc formerror" : "fmc"
                    }
                    name="have_mortgage"
                    onChange={onchange}
                  >
                    <option></option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} className="eachfield">
                <Form.Group>
                  <span
                    className={
                      formError && !need_mortgage
                        ? "userprofile formerror1"
                        : "userprofile"
                    }
                  >
                    Interested in a Mortgage
                  </span>
                  <Form.Control
                    as="select"
                    className={
                      formError && !need_mortgage ? "fmc formerror" : "fmc"
                    }
                    name="need_mortgage"
                    onChange={onchange}
                  >
                    <option></option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="dapadd">
                <Button className="continue1 nomargn" onClick={validateForm}>
                  {!isLoading ? "Submit" : "Processing..."}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </Container>
  );
};

export default ApplicationForm;
