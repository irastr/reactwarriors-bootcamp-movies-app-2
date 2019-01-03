import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { formStore } from "./store/formStore";
import { userStore } from "./store/userStore";
import { Provider } from "mobx-react";

ReactDOM.render(
  <Provider formStore={formStore} userStore={userStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
