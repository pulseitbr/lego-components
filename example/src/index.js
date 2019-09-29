import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { SetupStyle, GlobalStyle } from "lego-components";
import "lego-components/dist/index.css";

SetupStyle();
ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
