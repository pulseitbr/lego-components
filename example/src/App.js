import { Button, Container, Tab, TabPanel, Title } from "lego-components";
import React, { Fragment, useRef, useState } from "react";
export default function App() {
	const ref = useRef(null);
	const [show, setShow] = useState(true);

	return (
		<TabPanel ref={ref} onClose={() => setShow((e) => !e)}>
			{show && (
				<Tab closable name="first" color="red" title={<Fragment>AEE</Fragment>}>
					<Title>Tab 11</Title>
					<Container>
						<input
							required=""
							id="cep"
							name="cep"
							pattern="[0-9]{5}-[0-9]{3}"
							title="Informe o CEP no padrão correto"
							type="text"
							placeholder=""
						/>
						<Button
							onPress={(e) => {
								ref.current.closeTab("first");

								// ref.current.goto("thi");
							}}
						>
							Add
						</Button>
					</Container>
				</Tab>
			)}
			<Tab name="sec" color="red" title={<Fragment>AEE</Fragment>}>
				<Title>Tab 22</Title>
				<Container>
					<Button>Add</Button>
				</Container>
			</Tab>
			<Tab name="thi" color="red" title={<Fragment>AEE</Fragment>}>
				<Title>Tab 33</Title>
				<Container>
					<Button>Add</Button>
				</Container>
			</Tab>
		</TabPanel>
	);
}
