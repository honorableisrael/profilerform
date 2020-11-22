import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// Auth Routes
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";

// Normal Routes
// import HomePage from "./containers/HomePage";

import {LOGIN_PAGE_URL, REGISTER_URL} from "./constants";
import Error404Page from "./containers/Error404Page";
import store from "./store";
import setLoading from "./store/actions/setLoading";
import NewHomepage from "./containers/NewHomepage";
import GetStartedPage from "./containers/GetStartedPage";
import NewApplicationPage from "./containers/NewApplicationPage";
import ProfilePage from "./containers/ProfilePage";
import ResetPassword from "./containers/ResetPassword";
import NewAffordabilityForm from "./containers/NewAffordabilityForm";

class Routes extends Component {
  componentDidMount() {
    store.dispatch(setLoading(false));
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={NewHomepage} />

            {/* AUTH Routes */}
            <Route exact path={LOGIN_PAGE_URL} component={LoginPage} />

            <Route exact path={REGISTER_URL} component={RegisterPage} />
            <Route
              exact
              path='/get-started'
              component={GetStartedPage}
            />
            <Route
              exact
              path='/auth/password/reset'
              component={ResetPassword}
            />

            {/* <Route
              exact
              path='/application'
              component={NewApplicationPage}
            />
            
            <Route
              exact
              path='/application/nhf'
              component={NewApplicationPage}
            /> */}

            <Route
              exact
              path='/application'
              component={NewApplicationPage}
            />            
            
            {/* <Route
              exact
              path='/application/profile'
              component={ProfilePage}
            /> */}
            {/* <Route
              exact
              path='/application/affordability'
              component={NewAffordabilityForm}
            />             */}
            <Route component={Error404Page} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
