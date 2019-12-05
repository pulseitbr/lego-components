import { Body, Container, Drawer, Page, Skeleton } from "lego-components";
import React, { Fragment, useState } from "react";
import Table from "./table";
import { Uuid, Colors } from "lego";
import RadioBox from "./radio";

const cols = [
	{ title: "Chave", key: "id" },
	{ title: "Nome", key: "name" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Sobrenome", key: "surname" },
	{ title: "Chave", key: "id" }
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
			<Body style={{ backgroundColor: Colors.light }}>
				<Container className="pa4">
					<RadioBox name="numeroDocumento" checked>
						<span className="ml1">CPF</span>
					</RadioBox>
				</Container>
				<Table dataSource={data} columns={cols} />
				<Container className="pa3">
					{Array(5)
						.fill(0)
						.map((x) => (
							<Skeleton style={{ marginTop: "1rem" }} key={Uuid()} height="5rem" />
						))}
				</Container>
			</Body>
			<Drawer title="Infos" visible={state} onClose={() => setState(false)}>
				MUITAS INFOSSSSSSSSSSSSSSSS
			</Drawer>
		</Page>
	);
}
