import { GlobalStyle, SetupStyle } from "lego-components";
import "lego-components/dist/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

SetupStyle();

ReactDOM.render(
	<React.Fragment>
		<App />
		<GlobalStyle />
	</React.Fragment>,
	document.getElementById("root")
);
