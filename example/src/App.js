import { Body, Button, Container, Drawer, Page } from "lego-components";
import React, { useState } from "react";

export default function App() {
	const [view, setView] = useState(false);
	return (
		<Page>
			<Body>
				<Container>
					<Button onPress={() => setView(true)}>OpenModal</Button>
				</Container>
			</Body>
			<Drawer width="90%" maskClickClose onClose={() => setView(false)} title="Modal Bolado" visible={view}>
				Drawer Body
			</Drawer>
		</Page>
	);
}
