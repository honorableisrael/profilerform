import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import * as Icon from "react-feather";

import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import CircularLoader from "../CircularLoader";
import "./UserDashboard.css";
import "../Buttons/Buttons.css";

import {toTitleCase, formatDate, fetchFiles} from "../../utils/dashboardUtils";
import BrowserStorage from "../../utils/browserStorageUtils";
import ApplicationList from "./ApplicationList";
import setErrors from "../../store/actions/setErrors";
import VerificationIcon from "./VerificationIcons";
import {clearErrorStore} from "../../utils/errorUtils";
import ErrorToaster from "../ErrorToaster";

class UserDashboard extends Component {
  state = {menuVisibility: false, files: []};

  componentDidMount() {
    document.title = "Customer Dashboard | Finance Plus";
    this.fetchFiles();
  };

  componentWillUnmount() {
    clearErrorStore();
  };

  fetchFiles = async () => {
    try {
      const files = await fetchFiles();
      this.setState({files});
    } catch (error) {}
  };

  toggleMenu = () => {
    this.setState({
      menuVisibility: !this.state.menuVisibility
    });
  };

  render() {
    const userData = BrowserStorage.getUserData();
    const {files} = this.state;
    const uploadedFiles = files.filter(({is_uploaded}) => is_uploaded);
    return (
      <div className='container-fluid px-0'>
        <CircularLoader isLoading={this.props.isLoading} />
        <DashboardHeader
          history={this.props.history}
          toggleMenu={this.toggleMenu}
          menuVisibility={this.state.menuVisibility}
        />
        {this.state.menuVisibility ? (
          <DashboardSidebar menuVisibility={this.state.menuVisibility} />
        ) : (
          <DashboardSidebar />
        )}

        <ErrorToaster />
        
        <div className='fp-mortgage-content-wrapper'>
          <div className='container fp-mortgage-w100'>
            <div className='fp-dashboard-section'>
              <div className='row'>
                <div className='col-md-12'>
                  {files.length !== uploadedFiles.length ? (
                    <div className='fp-dashboard-section-error-wrapper d-flex justify-content-start'>
                      <Icon.Bell />
                      You have {files.length - uploadedFiles.length} required
                      documents to upload. click
                      <a className='mr-1 ml-1' href='/user/dashboard/uploads'>
                        here
                      </a>{" "}
                      to upload pending documents
                    </div>
                  ) : (
                    ""
                  )}
                  <div className='fp-welcome-box'>
                    <div className='row'>
                      <div className={`col-md-${files.length ? 5 : 12}`}>
                        <div className='fp-mortgage-date-caption-apply-for-mortgage-wrapper'>
                          <span>{formatDate(new Date(), "full")}</span>
                          <h2>Hi there, {toTitleCase(userData.firstname)}!</h2>
                          <p>Welcome back to your Finance+ account!</p>

                          <Link
                            className='fp-dashboard-mortgage-btn mr-3'
                            to='/user/dashboard/uploads'
                          >
                            {uploadedFiles.length === files.length
                              ? "Manage Uploads"
                              : "Upload Documents"}
                          </Link>
                        </div>
                      </div>
                      <div className={`col-md-${files.length ? 7 : 0}`}>
                        <div className='fp-mortgage-approval-status'>
                          <div className='fp-dashboard-mortgage-loan-requirement-status-wrap'>
                            {files.map(file => (
                              <VerificationIcon file={file} key={file.id} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='dashboard-section mt-4'>
              <ApplicationList
                orientation='horizontal'
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ root: state }, ownProps) => {
  return {
    isLoading: state.isLoading,
    ...ownProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setErrors(errors) {
      dispatch(setErrors(errors));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
