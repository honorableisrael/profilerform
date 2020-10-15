import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";

import Toaster from "../../Toaster";
import CircularLoader from "../CircularLoader";
// import BioDataInfo from "../BioDataInfo";
import "./DocumentUploadsPage.css";
import { extractErrors, clearErrorStore } from "../../utils/errorUtils";
import setLoading from "../../store/actions/setLoading";
import UploadsTableRowItem from "./UploadsTableRowItem";
import { fetchFiles } from "../../utils/dashboardUtils";
import setErrors from "../../store/actions/setErrors";
import ErrorToaster from "../ErrorToaster";

class DocumentUploadsPage extends Component {
  state = {
    showToast: false,
    toastContent: "",
    files: []
  };

  componentDidMount() {
    document.title = "Documents Uploads | Finance Plus";
    this.fetchFiles();
  }

  componentWillUnmount() {
    clearErrorStore();
  }

  setStateValues = pairs => this.setState(pairs);

  fetchFiles = async () => {
    try {
      const data = await fetchFiles();
      const files = data.map(file => ({ uploaded: false, file }));
      this.setState({ files });
    } catch (error) {}
  };

  setToasterState = (showToast, toastContent) =>
    this.setState({ showToast, toastContent });

  render() {
    const { isLoading } = this.props;
    const { showToast, toastContent, files } = this.state;
    return (
      <div className='container-fluid px-0'>
        <ErrorToaster />
        <Toaster content={toastContent} showToast={showToast} />
        <CircularLoader isLoading={isLoading} />
        <DashboardHeader history={this.props.history} />
        <DashboardSidebar type='User' />
        <div className='fp-mortgage-content-wrapper'>
          <div className='container-fluid'>
            <div className='fp-dashboard-section'>
              <div className='row'>
                {/* <div className='col-md-4 fp-mortgage-application-lender-info-wrapper'>
                  <BioDataInfo />
                  <div className='fp-mortgage-application-credit-score'>
                    <p>CREDIT RATING</p>
                    <h2>8.90</h2>
                  </div>
                </div> */}
                <div className='col-md-12'>
                  <div className='fp-mortgage-application-settings-form mt-4'>
                    <h2 className='fp-mortgage-application-settings-form-title'>
                      Upload Documents
                    </h2>
                    <p>
                      Please upload the following documents for speedy
                      processing of mortgage.
                    </p>

                    <div className='fp-documents-upload-wrapper'>
                      <div className='table-responsive'>
                        <table className='table table-bordered'>
                          <thead>
                            <tr>
                              <th
                                className='fp-upload-file-header'
                                data-priority='1'
                              >
                                Documents
                              </th>
                              <th
                                className='fp-upload-file-header'
                                data-priority='2'
                              ></th>
                              <th
                                className='fp-upload-file-header'
                                data-priority='3'
                              >
                                Status
                              </th>
                              <th
                                className='fp-upload-file-header'
                                data-priority='4'
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {files.map((file, index) => (
                              <UploadsTableRowItem
                                fileData={file}
                                uploads={files}
                                index={index}
                                setParentState={this.setStateValues}
                                key={file.file.id}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    setLoading(isLoading) {
      dispatch(setLoading(isLoading));
    },
    setErrors(errors) { dispatch(setErrors(errors)); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentUploadsPage);
