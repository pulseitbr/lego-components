import { Body, Page } from "lego-components";
import React from "react";
import ScrollComponent from "./scrollToTop/ScrollToTop";

export default function App() {
	return (
		<Page>
			<Body>
				<div style={{ width: "100%", minHeight: 1500, background: "red" }}></div>
				<div style={{ width: "100%", minHeight: 1500, background: "green" }}></div>
				<div style={{ width: "100%", minHeight: 1500, background: "blue" }}></div>
				<ScrollComponent scrollStepInPx={5000} />
			</Body>
		</Page>
	);
}
