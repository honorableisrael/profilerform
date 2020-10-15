import React from "react";
import withNewStyles from "../../hocs/withNewStyles";

import NewHeader from "../NewHeader";

const StyledHeader = withNewStyles(NewHeader);

const Error404Page = ({ location: { pathname }, history }) => {
  return (
    <div className='container-fluid px-0'>
      <StyledHeader history={ history } />
      <section className='fp-404-error'>
        <div className='fp-error-404-bg'></div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 text-center'>
              <div className='fp-error-404-wrapper'>
                <h1>404</h1>
                <h2>We couldn’t find this page.</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404Page;
