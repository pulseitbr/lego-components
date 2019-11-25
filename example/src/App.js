import { Body, Button, Container, Drawer, Notification, Snackbar, Page, useForm, Badge } from "lego-components";
import React, { useEffect, useState } from "react";

export default function App() {
	const [view, setView] = useState(false);
	const { state, onChange } = useForm(
		{ name: "", age: "" },
		{
			updateOnChange: true
		}
	);
	useEffect(() => {
		Notification({
			title: "AEEEE",
			theme: "dark",
			message: "Mensagem"
		});
		Snackbar({
			title: "AEEEE",
			theme: "info",
			message: "Mensagem"
		});
	}, []);

	return (
		<Page>
			<Body>
				<Container>
					<Button onPress={() => setView(true)}>OpenModal</Button>
				</Container>
				<Container>
					<Badge size={0.8} color="orange">Aguardando Pagamento</Badge>
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
