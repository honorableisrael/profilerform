import React from "react";
import badge from "../../assets/badge.svg";


const HeaderStats = (props) => {
  return (
    <>
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
    </>
  );
};

export default HeaderStats;
