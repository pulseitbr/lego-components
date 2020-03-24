import Tippy from "@tippy.js/react";
import { Colors } from "@pulseitbr/lego";
import React, { CSSProperties, useMemo } from "react";
import styled from "styled-components";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/dist/backdrop.css";
import { Container } from "../base";

export type Triggers = "mouseenter" | "focus" | "click" | "manual";
type Placements =
	| "auto-start"
	| "auto"
	| "auto-end"
	| "top-start"
	| "top"
	| "top-end"
	| "right-start"
	| "right"
	| "right-end"
	| "bottom-end"
	| "bottom"
	| "bottom-start"
	| "left-end"
	| "left"
	| "left-start";

export type Animations = "perspective" | "fade" | "scale" | "shift-away" | "shift-toward";
type Props = {
	distance?: number;
	className?: string;
	animation?: Animations;
	theme?: "dark" | "light";
	contentProps?: React.DetailedHTMLProps<any, HTMLDivElement>;
	position?: Placements;
	bgColor?: string;
	children: React.ReactNode;
	triggers?: Triggers[];
	itens: React.ReactChild;
	onShow?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any;
};

export const DropdownItem = styled.li`
	text-decoration: none;
	display: block;
	cursor: pointer;
	width: 100%;

	&:hover {
		background-color: ${Colors.lightAlpha};
	}
`;

export const Dropdown = ({
	children = "",
	className = "",
	triggers = ["click"],
	bgColor = Colors.lightLight,
	itens = "",
	theme = "light",
	animation = "perspective",
	position = "bottom-end"
}: Props) => {
	const style: CSSProperties = { backgroundColor: bgColor, width: "100%", padding: "0.4rem", listStyle: "none" };
	const triggerString = useMemo(() => triggers.join(" "), [triggers]);

	const content = (
		<Container style={{ backgroundColor: bgColor }}>
			<ul style={style}>{itens}</ul>
		</Container>
	);

	return (
		<Tippy
			animation={animation}
			arrow={false}
			className={className}
			content={content}
			inertia
			inlinePositioning
			interactive
			lazy
			maxWidth="30rem"
			placement={position}
			sticky
			theme={theme}
			touch
			trigger={triggerString}
		>
			{children as any}
		</Tippy>
	);
};
