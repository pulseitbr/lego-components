import { Colors } from "lego";
import { Body, Container, Drawer, Form, MaterialInput, Page, Tab, Tabs, Timeline, TimelineItem, useForm } from "lego-components";
import React, { useState } from "react";

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
				<Form onSubmit={(e) => console.log("SUBMIT", e)}>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa4">
						<MaterialInput
							required
							onInvalid={(e) => console.log(e.target.setCustomValidity(""))}
							mask="cnpj"
							name="email"
							fontSize={1}
							placeholder="Digite seu email"
							onBlur={blurEvents.email}
							onChange={onChange}
							value={state.email}
							message={
								errors.email.hasError ? (
									<span style={{ color: "red" }}>{errors.email.message}</span>
								) : (
									<span style={{ color: "green" }}>Tudo certo - {errors.email.blurEventTrigger.toString()}</span>
								)
							}
						/>
					</Container>
				</Form>
				<Container>
					<Tabs currentTab={tab} onChange={(e) => setTab(e)}>
						<Tab title="Um" name="first" key="first">
							First content
						</Tab>
						<Tab title="Dois" name="second" key="a">
							Second content
						</Tab>
						<Tab title="Três" name="third" key="b">
							Third content
						</Tab>
					</Tabs>
				</Container>
			</Body>
			<Drawer
				visible={visible}
				title="Koe família"
				maskClickClose
				onClose={() => {
					console.log("FECHANDO");
					setVisible(false);
				}}
			>
				AEEEEEEEEEEE
			</Drawer>
		</Page>
	);
}
