import { Colors } from "lego";
import { Body, Container, Drawer, Form, MaterialInput, Page, Tab, Tabs, Timeline, TimelineItem, useForm } from "lego-components";
import React, { useState } from "react";
import ScrollToTop from "./scrollToTop/ScrollToTop";

export default function App() {
	const [visible, setVisible] = useState(true);
	const { state, onChange, errors, blurEvents } = useForm(
		{ email: "" },
		{
			updateOnChange: true,
			validations: {
				email: (email) => ({ isValid: email === "allan.f.garcez@gmail.com", msg: "Email não é o meu" })
			},
			blurs: { email() {} }
		}
	);

	const [tab, setTab] = useState("second");

	return (
		<Page>
			<Body>
				<div style={{ minHeight: 10000 }}></div>
				<div style={{ minHeight: 10000 }}></div>
				<div style={{ minHeight: 10000 }}></div>
				<ScrollToTop />
			</Body>
		</Page>
	);
}
