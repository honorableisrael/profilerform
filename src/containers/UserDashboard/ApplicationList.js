import React, {Component} from "react";
import {connect} from "react-redux";

import setErrors from "../../store/actions/setErrors";
import setLoading from "../../store/actions/setLoading";
import {BASE_URL} from "../../constants";
import {extractErrors, clearErrorStore} from "../../utils/errorUtils";
import HorizontalApplicationList from "./HorizontalApplicationList";
import VerticalApplicationList from "../DashboardMortgageApplicationTable/VerticalApplicationList";
import {fetchApplications} from "../../utils/dashboardUtils";
import setEditApplicationData from "../../store/actions/setEditApplicationData";

class ApplicationList extends Component {
  state = {
    applications: []
  };

  /**
   * Fetches all applications from the server
   */
  fetchApplications = async () => {
    try {
      const applications = await fetchApplications('/user/applications');
      this.setState({applications});
    } catch (error) {}
  };

  componentDidMount() {
    this.fetchApplications();
  }

  componentWillUnmount() {
    clearErrorStore();
  }

  render() {
    const {
      orientation, errors, goToRoute, query, setLoading, setErrors, setEditApplicationData, history, isLoading
    } = this.props;
    const {applications} = this.state;

    return (
      <div className='dashboard-section'>
        {orientation === "horizontal" ? (
          <HorizontalApplicationList
            {...{ applications, errors, setLoading, setErrors, setEditApplicationData, history, isLoading }}
          />
        ) : (
          <VerticalApplicationList
            {...{ applications, errors, setLoading, setErrors, setEditApplicationData, query, goToRoute }}
          />
        )}
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
    },
    setEditApplicationData(editApplicationData) {
      dispatch(setEditApplicationData(editApplicationData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);
