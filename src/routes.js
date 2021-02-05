import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

// Auth Routes
import Form from "./Form/Form";


class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Form} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
