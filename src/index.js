import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./index.css";
import Routes from "./routes";
import "./responsive.css";

ReactDOM.render(
       
  <Routes />,
  document.getElementById("root")
);
// serviceWorker.unregister();
