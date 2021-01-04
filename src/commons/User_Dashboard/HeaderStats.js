import React from "react";
import badge from "../../assets/badge.svg";
import { API } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./animate.css";

const HeaderStats = (props) => {
  const [state, setState] = React.useState({
    loanable_amount: "",
    monthly_repayment: "",
    loan_tenure: "",
  });
  const notifyFailed = (message) => toast(message, { containerId: "f" });
  const { loanable_amount, loan_tenure, monthly_repayment } = state;
  React.useEffect(() => {
    window.scrollTo(-0, -0);
    const userToken = localStorage.getItem("jwtToken");
    const userData = localStorage.getItem("loggedInDetails");
    const currentUser = userData
      ? JSON.parse(userData)
      : window.location.assign("/login");
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
        axios.get(`${API}/user/get-profile`, {
          headers: { Authorization: `Bearer ${userToken}` },
        }),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res2.data.data);
          if (res.status === 200) {
            setState({
              ...state,
              ...res2.data.data,
              isloading: false,
            });
          }
          if (res.status == 400) {
            props.history.push("/login");
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
      });
  }, []);
  const FormatAmount = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <div className="gradwrap">
        <div className="mss">
          <div className="samry">Summary</div>
          <div className="maxa12">
            <div className="firs122">
              <div className="ton1">Maximum Loanable</div>
              {loanable_amount && (
                <div className="mza animated bounceIn">
                  ₦ {FormatAmount(loanable_amount)}
                </div>
              )}
            </div>
            <div className="sec122">
              <div className="ton1">Est. Monthly Repayment</div>
              {loan_tenure && (
                <div className="mza animated bounceIn">₦ {FormatAmount(loan_tenure)}</div>
              )}
            </div>
            <div className="sec122">
              <div className="ton1">Maximum Tenure</div>
              {loan_tenure && (
                <div className="mza animated bounceIn">
                  {loan_tenure} {loan_tenure == 1 ? "year" : "years"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <img src={badge} alt={"badge"} className="badge22" />
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
