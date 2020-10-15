import React from 'react';

import './Toaster.css';


const Toaster = ({ showToast, content }) => {
  return showToast ? (
    <div className="toaster-wrapper">
      <div className="toaster-body">{ content }</div>
    </div>
  ) : '';
}
 
export default Toaster;