import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import DashboardBreadCrumb from "../DashboardBreadCrumb";
import TotalLoanAmount from "../TotalLoanAmount";
import LenderContactDetails from "../LenderContactDetails";
import SingleApplicationDetails from "../SingleApplicationDetails";
import CircularLoader from "../CircularLoader";

// import "./SingleApplication.css";
import { extractErrors, clearErrorStore } from "../../utils/errorUtils";
import setErrors from "../../store/actions/setErrors";
import setLoading from "../../store/actions/setLoading";
import { fetchApplicationData } from "../../utils/dashboardUtils";
import ErrorToaster from "../ErrorToaster";
import BrowserStorage from "../../utils/browserStorageUtils";

class SingleApplication extends Component {
  state = {
    application: null,
    uploads: []
  };

  componentDidMount() {
    document.title = "Application Details | Finance Plus";
    this.fetchApplicationData();
  };

  componentWillUnmount() {
    clearErrorStore();
  };

  fetchApplicationData = async () => {
    const { match: { params: { slug } } } = this.props;
    const { usertype } = BrowserStorage.getUserData();
    try {
      const url = `/${usertype}/application/view/${slug}`;
      const { application, doc_upload: uploads } = await fetchApplicationData(url);
      this.setState({ application, uploads });
    } catch (error) {}
  };

  render() {
    const { application, uploads } = this.state;
    const { isLoading } = this.props;
    return (
      <div className='container-fluid px-0'>
        <ErrorToaster />
        <CircularLoader isLoading={isLoading} />
        <DashboardHeader history={this.props.history} />
        <DashboardSidebar type='User' />
        <div className='fp-mortgage-content-wrapper'>
          <DashboardBreadCrumb
            type='Single Mortgage Application'
            title='Application Details'
          />
          <div className='container-fluid'>
            <div className='fp-dashboard-section'>
              {application ? (
                <div className='row'>
                  <div className='col-md-4 fp-mortgage-application-lender-info-wrapper'>
                    <LenderContactDetails data={{ ...application.lender }} />
                    <TotalLoanAmount loan_amount={application.loan_amount} />
                  </div>
                  <div className='col-md-8'>
                    <SingleApplicationDetails
                      data={{ ...application }}
                      uploads={uploads}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ root: state }, ownProps) => {
  return {
    errors: state.errors,
    isLoading: state.isLoading,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setErrors(errors) {
      dispatch(setErrors(errors));
    },
    setLoading(isLoading) {
      dispatch(setLoading(isLoading));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleApplication);
