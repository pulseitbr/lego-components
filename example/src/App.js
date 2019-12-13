import { Body, Container, Form, MaterialInput, Page, CheckBox as RadioBox } from "lego-components";
import React from "react";
import useForm from "./useForm";

export default function App() {
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
	return (
		<Page>
			<Body>
				<Form onSubmit={(e) => console.log("SUBMIT", e)}>
					<Container>
						<RadioBox>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
					</Container>
					<Container className="pa4">
						<MaterialInput
							required
							onInvalid={(e) => console.log(e.target.setCustomValidity(""))}
							type="email"
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
			</Body>
		</Page>
	);
}
