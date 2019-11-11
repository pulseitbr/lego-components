import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import { Button, Container, Colors } from "lego-components";

export default {
	title: "Button"
};

export const ButtonReference = () => (
	<Container style={{ backgroundColor: Colors.lightAlpha, padding: "2rem 0" }}>
		<Button danger onClick={() => action("clicked")}>
			Danger
		</Button>{" "}
		<Button loading danger onClick={action("clicked")}>
			Loading
		</Button>{" "}
		<Button disabled onClick={action("clicked")}>
			Disabled
		</Button>{" "}
		<Button light onClick={action("clicked")}>
			Success
		</Button>{" "}
		<Button success onClick={action("clicked")}>
			Success
		</Button>{" "}
		<Button info onClick={action("clicked")}>
			Info
		</Button>{" "}
		<Button dark onClick={action("clicked")}>
			Dark
		</Button>{" "}
		<Button transparent rippleColor="cyan" onPress={action("clicked")}>
			Transparent
		</Button>{" "}
		<Button disabledTransparent onClick={action("clicked")}>
			Disabled Transparent
		</Button>{" "}
	</Container>
);
