import React from "react";
import "./user_dashboard.scss";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreviewPage = (props) => {
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
    isLoading: false,
    Error: false,
    documentId: "",
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    phone: "",
    dob: "",
    state_of_origin: "",
    married_status: "",
    home_status: "",
    mode_of_contact: "",
    number_of_dependants: "",
    middlename: "",
    mother_middle_name: "",
    age: "",
    sex: "",
    nationality: "",
    place_of_birth: "",
    profession: "",
    highest_education: "",
    means_of_identification: "",
    id_number: "",
    id_issue_date: "",
    id_expire_date: "",
  });

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
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              ...res.data.data,
              user: currentUser?.user,
              // id_issue_date:formatDate(res?.data?.data?.id_issue_date),
              // id_expire_date:formatDate(res?.data?.data?.id_expire_date),
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
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const {
    Error,
    state_of_origin,
    totalDoc,
    address,
    email,
    phone,
    dob,
    profession,
    home_status,
    firstname,
    lastname,
    mode_of_contact,
    deleteModal,
    formError,
    isloading,
    isLoading,
    means_of_identification,
    number_of_dependants,
    sex,
    nationality,
    mother_middle_name,
    age,
    highest_education,
    place_of_birth,
    middlename,
    id_expire_date,
    id_issue_date,
    id_number,
  } = state;
  return (
    <>
      <div className="printwrapp">
        <div className="pagetitlepr">
          Affordability Test - Finance Plus | Real Estate, Apartments, Mortgages
          & Home Values
        </div>
        <div className="textlf">
          <span onClick={() => window.print()}>Print Page</span>
        </div>
        <div className="personalinfo">
          <div className="personlatitle">PERSONAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Title</div>
              <div className="printbody">Mr</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">FIRST NAME</div>
              <div className="printbody">{firstname}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LAST NAME</div>
              <div className="printbody">{lastname}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MIDDLE NAME</div>
              <div className="printbody">{middlename}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Email</div>
              <div className="printbody">{email}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Phone Number</div>
              <div className="printbody">{phone}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">{dob}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Sex</div>
              <div className="printbody">{sex}</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">Address</div>
              <div className="printbody">{address}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">State of origin</div>
              <div className="printbody">{state_of_origin}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Highest education</div>
              <div className="printbody">{highest_education}</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">DATE OF BIRTH</div>
              <div className="printbody">12/3/1944</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">OTHER PERSONAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">CURRENT HOME TYPE</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">OTHERS</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ANNUAL RENT</div>
              <div className="printbody">JOHN</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MARITAL STATUS</div>
              <div className="printbody">Single</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE’S EMPLOYER</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS EMPLOYED</div>
              <div className="printbody">12</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S RELATIONSHIP</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">NEXT-OF-KIN’S RELATIONSHIP</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS EMPLOYED</div>
              <div className="printbody">12</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROFESSION OF SPOUSE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SPOUSE'S ANNUAL INCOME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg"></div>
            <div className="nnxg"></div>
          </div>
          <div className="printtitle printood">CHILDREN/OTHER DEPENDENTS</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">Name</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Age</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">Relationship</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">EMPLOYMENT INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">Porro doloremque odi</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY EMAIL ADDRESS</div>
              <div className="printbody">israel@yahoo.com</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">EMPLOYER PHONE NO</div>
              <div className="printbody">08012345678</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">ADDRESS OF EMPLOYER</div>
              <div className="printbody">Laudanum ex labor</div>
            </div>
          </div>
          <div className="printtitle printood">OTHER EMPLOYMENTS:</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">COMPANY NAME</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY PHONE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">FINANCIAL INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">TOTAL ANNUAL PAY</div>
              <div className="printbody">N300,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY GROSS PAY</div>
              <div className="printbody">N20,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle"> MONTHLY NET PAY</div>
              <div className="printbody">1,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">MONTHLY EXPENSES</div>
              <div className="printbody">200,000</div>
            </div>
          </div>
          <div className="printtitle printood">OTHER SOURCE(S) OF INCOME</div>
          <div className="frntrowtable">
            <div className="nnxg">
              <div className="printtitle">SOURCE</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">SOURCE AMOUNT/YEAR (N)</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">COMPANY ADDRESS</div>
              <div className="printbody">N/A</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">YEARS</div>
              <div className="printbody">N/A</div>
            </div>
          </div>
          <div className="divvder"></div>
          <div className="personlatitle">LOAN INFORMATION</div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPOSED EQUITY CONTRIBUTION</div>
              <div className="printbody">N5,750,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">LOAN AMOUNT</div>
              <div className="printbody">₦ 4,603,117.24</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY VALUE</div>
              <div className="printbody">N1,000,000</div>
            </div>
            <div className="nnxg">
              <div className="printtitle">PROPERTY ADDRESS</div>
              <div className="printbody">Culpa dolor sed rem</div>
            </div>
          </div>
          <div className="frntrow">
            <div className="nnxg">
              <div className="printtitle">PROPERTY TITLE</div>
              <div className="printbody">Culpa dolor sed rem</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={"f"}
        toastClassName="bg-danger text-white"
        hideProgressBar={true}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  );
};

export default PreviewPage;
