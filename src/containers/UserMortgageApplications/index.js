import React, { Component } from "react";
import { connect } from "react-redux";

import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import DashboardBreadCrumb from "../DashboardBreadCrumb";
import DashboardMortgageApplicationTable from "../DashboardMortgageApplicationTable";
import CircularLoader from "../CircularLoader";

import "./UserMortgageApplications.css";

import setIsAuthenticated from "../../store/actions/setIsAuthenticated";

class UserMortgageApplications extends Component {
  componentDidMount() {
    document.title = "All Mortgage Applications | Finance Plus";
  }

  render() {
    const {
      isLoading,
      history: { push },
      location: { search }
    } = this.props;

    return (
      <div className='container-fluid px-0'>
        <CircularLoader isLoading={isLoading} />
        <DashboardHeader history={this.props.history} />
        <DashboardSidebar type='User' />
        <div className='fp-mortgage-content-wrapper'>
          <DashboardBreadCrumb
            type='Mortgage Application'
            title='Mortgage Application'
          />
          <div className='container-fluid'>
            <div className='fp-dashboard-section'>
              <div className='row'>
                <div className='col-md-12'>
                  <DashboardMortgageApplicationTable
                    goToRoute={push}
                    query={search}
                  />
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
    setIsAuthenticated(isAuthenticated) {
      dispatch(setIsAuthenticated(isAuthenticated));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMortgageApplications);
