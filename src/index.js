import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import './index.css'
import Routes from "./routes";
import store from "./store";
import {persistedStore} from "./store";
import * as serviceWorker from "./serviceWorker";
import "./responsive.css";
import CircularLoader from "./containers/CircularLoader";
// import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  // <CookiesProvider>
    <Provider store={store}>
      <PersistGate
        loading={<CircularLoader isLoading={true} />}
        persistor={persistedStore}
      >
        <Routes />
      </PersistGate>
    </Provider>,
//  </CookiesProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
