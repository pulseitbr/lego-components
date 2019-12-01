import { Body, Drawer, Page } from "lego-components";
import React, { Fragment, useState } from "react";

export default function App() {
	const [state, setState] = useState(false);
	return (
		<Page>
			<Body>
				<Fragment>
					<button onClick={() => setState(true)}>Click</button>
				</Fragment>
			</Body>
			<Drawer title="Infos" visible={state} onClose={() => setState(false)}>
				MUITAS INFOSSSSSSSSSSSSSSSS
			</Drawer>
		</Page>
	);
}
