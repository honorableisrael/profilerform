import React from 'react';
import GetStartedForm from '../GetStartedForm';


const PreFooter = () => {
  return (
    <section className="pre-footer">
      <div className="separator"></div>
      <div>
        <h3 className="step-info-heading">Ready to begin?</h3>

        <GetStartedForm />
      </div>
    </section>
  );
}
 
export default PreFooter;