import React from 'react';
import { connect } from 'react-redux';
import Toaster from '../../Toaster';
import { clearErrorStore } from '../../utils/errorUtils';


const ErrorToaster = ({ errors }) => {
  const showToast = Boolean(errors && errors.length);
  if (showToast) {
    const timeout = setTimeout(() => {
      clearErrorStore();
      clearTimeout(timeout);
    }, 5000);    
  }
  
  const errorList = (errors || []).map((error, index) => <li key={index}>{error}</li>);
  const content = (
    <ul
      style={{
        display: 'flex', justifyContent: 'flex-start',
        color: '#ff0000', alignItems: 'center', marginBottom: '0px'
      }}
    >
      {errorList}
    </ul>
  );
  return <Toaster {...{ showToast, content }} />;
};


const mapStateToProps = ({ root: state }, ownProps) => {
  return { errors: state.errors, ...ownProps };
};

export default connect(mapStateToProps)(ErrorToaster);
