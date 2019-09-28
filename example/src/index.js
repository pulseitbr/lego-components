import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SetupStyle } from "lego-components";
import "lego-components/dist/index.css";

SetupStyle();
ReactDOM.render(<App />, document.getElementById("root"));
