import React, { Fragment } from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "lego-components";

export default {
    title: "Button"
};

export const ButtonReference = () => (
    <Fragment>
        <Button danger onClick={action("clicked")}>
            Danger
        </Button>{" "}
        <Button loading danger onClick={action("clicked")}>
            Danger
        </Button>
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
            Success
        </Button>{" "}
        <Button transparent rippleColor="#ff0" onClick={action("clicked")}>
            Transparent
        </Button>{" "}
    </Fragment>
);
