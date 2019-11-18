import { Body, Button, Container, Drawer, Page, useForm, Form } from "lego-components";
import React, { useState } from "react";

export default function App() {
	const [view, setView] = useState(false);
	const { state, onChange } = useForm(
		{ name: "", age: "" },
		{
			updateOnChange: true
		}
	);
	return (
		<Page>
			<Body>
				<Container>
					<Button onPress={() => setView(true)}>OpenModal</Button>
				</Container>
				<form>
					<input value={state.name} onChange={onChange} name="name" />
				</form>
			</Body>
			<Drawer width="90%" maskClickClose onClose={() => setView(false)} title="Modal Bolado" visible={view}>
				Drawer Body
			</Drawer>
		</Page>
	);
}
