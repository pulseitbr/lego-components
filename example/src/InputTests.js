import { Body, Container, MaterialInput, Page, StyleInput, Switch } from "lego-components";
import React, { useState } from "react";

export default () => {
	const [value, setValue] = useState("");
	const [check, setCheck] = useState(true);

	const input = {
		loading: true,
		message: <span style={{ color: "#fd0000" }}>Erro</span>,
		mask: "cpf",
		name: "name",
		value,
		onChange: (e) => setValue(e.target.value),
		placeholder: "Digite seu nome"
	};

	return (
		<Page>
			<Body>
				<Container style={{ padding: 50, width: "60%" }}>
					<Switch round color="black" name="AEE" checked={check} onChange={() => setCheck(!check)}>
						Deseja pedir segunda via?
					</Switch>
				</Container>
				<Container style={{ padding: 50, width: "60%" }}>
					<StyleInput {...input} />
				</Container>
				<Container style={{ padding: 50, width: "60%" }}>
					<MaterialInput {...input} />
				</Container>
			</Body>
		</Page>
	);
};
