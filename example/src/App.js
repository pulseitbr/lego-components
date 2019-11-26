import { Badge, Body, Button, Container, Modal, Notification, Page, Snackbar, useForm } from "lego-components";
import React, { useEffect, useState } from "react";
import Tippy from "@tippy.js/react";
import { sticky } from "tippy.js";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/dist/svg-arrow.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export const tippyPlugins = [sticky];
export const Popover = ({
	children,
	className = "",
	triggers = ["click"],
	itens,
	arrow = true,
	onCreate = () => {},
	theme = "light",
	animation = "shift-away",
	position = "bottom-end"
}) => (
	<Tippy
		lazy
		flip
		sticky
		inertia
		interactive
		followCursor
		hideOnClick
		onCreate={onCreate}
		theme={theme}
		arrow={arrow}
		content={itens}
		maxWidth="30rem"
		boundary="viewport"
		duration={[350, 200]}
		placement={position}
		className={className}
		animation={animation}
		plugins={tippyPlugins}
		trigger={triggers.join(" ")}
	>
		<span>{children}</span>
	</Tippy>
);

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
					<Popover itens={"AEEE"}>
						<Badge size={0.8} color="orange">
							Aguardando Pagamento
						</Badge>
					</Popover>
				</Container>
				<form>
					<input value={state.name} onChange={onChange} name="name" />
				</form>
			</Body>
			<Modal width="40%" onClose={() => setView(false)} title="Modal Bolado" visible={view}>
				Drawer Body
			</Modal>
		</Page>
	);
}
