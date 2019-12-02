import { Body, Drawer, Page } from "lego-components";
import React, { Fragment, useState } from "react";
import Table from "./table";
import { Uuid } from "lego";

const cols = [
	{ title: "Chave", key: "id" },
	{ title: "Nome", key: "name" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Chave", key: "id" },
];

const data = [
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" },
	{ id: Uuid(), name: "Fu", surname: "Ba" }
];

export default function App() {
	const [state, setState] = useState(false);
	return (
		<Page>
			<Body>
				<Table dataSource={data} columns={cols} />
			</Body>
			<Drawer title="Infos" visible={state} onClose={() => setState(false)}>
				MUITAS INFOSSSSSSSSSSSSSSSS
			</Drawer>
		</Page>
	);
}
