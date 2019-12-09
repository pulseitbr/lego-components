import React, { useRef, useEffect } from "react";
import { Tab, Tabs, Page, Body, Button } from "lego-components";

export default function App() {
	const ref = useRef({});

	useEffect(() => {
		ref.current.goto("second");
	}, []);

	return (
		<Page>
			<Body>
				<Button onPress={() => ref.current.goto("third")}>Click</Button>
				<Tabs onChange={(e) => console.log("CHANGED TAB", e)} ref={ref}>
					<Tab title="Koe" name="first">
						Primeiro Tab
					</Tab>
					<Tab title="Blz" name="second">
						Segunda Tab
					</Tab>
					<Tab title="Eai" name="third">
						Terceira tab
					</Tab>
				</Tabs>
			</Body>
		</Page>
	);
}
