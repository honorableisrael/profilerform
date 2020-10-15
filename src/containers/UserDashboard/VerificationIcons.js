import React from "react";
import {CheckCircle, AlertCircle} from "react-feather";

const VerificationIcon = ({file: {doc_name, is_uploaded}}) => {
  const style = {size: "30", color: is_uploaded ? "#7fc452" : "#bbbbbb"};
  return (
    <div className='fp-dashboard-mortgage-loan-requirement-status'>
      {is_uploaded ? <CheckCircle {...style} /> : <AlertCircle {...style} />}
      <h4>{doc_name}</h4>
    </div>
  );
};

export default VerificationIcon;
