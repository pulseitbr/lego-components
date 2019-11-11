import { Body, Button, Container, Dropdown, Footer, Form, Page, Popover, View } from "lego-components";
import React, { Fragment, useRef, useState } from "react";

export default () => {
	const [show, setShow] = useState(false);
	const ref = useRef();
	return (
		<Page>
			<Body>
				<Container isCollapse show={show} time={200}>
					<View time={2000} style={{ backgroundColor: "red", padding: "2rem" }} span="100%">
						<Form
							onSubmit={(e) => {
								const target = e.target;
								const values = Object.values(target).reduce(
									(obj, field) => ({
										...obj,
										[field.name]: field.value
									}),
									{}
								);
								console.log(values);
							}}
						>
							<input type="checkbox" name="checkbox" />
							<input name="input" />
							<input name="submit" value="Submeter" type="submit" />
						</Form>
					</View>
				</Container>
				<Container>
					<Dropdown
						distance={250}
						position="right-end"
						animation="shift-toward"
						itens={
							<Fragment>
								<Button>Confirm</Button>
							</Fragment>
						}
					>
						<span>Hello world</span>
					</Dropdown>
				</Container>
			</Body>
			<Footer>
				<Popover
					onCreate={(i) => (ref.current = i)}
					itens={
						<div style={{ maxWidth: "15rem" }}>
							<p>Deseja mostrar como ficou o novo Collapse do lego-components?</p>
							<Button
								size={0.8}
								onPress={() => {
									setShow(true);
									ref.current.hide();
								}}
							>
								Sim, caralho
							</Button>{" "}
							<Button
								size={0.8}
								onPress={() => {
									setShow(false);
									ref.current.hide();
								}}
							>
								Não, porra
							</Button>
						</div>
					}
				>
					<Button>KOE MANÉ</Button>
				</Popover>
			</Footer>
		</Page>
	);
};
