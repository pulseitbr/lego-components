import Tippy from "@tippy.js/react";
import React, { CSSProperties } from "react";
import styled from "styled-components";
import { inlinePositioning, sticky } from "tippy.js";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/dist/backdrop.css";
import { Container } from "../base";
import Colors from "../styles";

export const tippyPlugins = [sticky, inlinePositioning];

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
	children,
	className = "",
	triggers = ["click"],
	bgColor = Colors.lightLight,
	itens,
	animation = "perspective",
	position = "bottom-end"
}: Props) => {
	const style: CSSProperties = { backgroundColor: bgColor, width: "100%", padding: "0.4rem", listStyle: "none" };
	const triggerString = triggers.join(" ");

	const content = (
		<Container>
			<ul style={style}>{itens}</ul>
		</Container>
	);

	return (
		<Tippy
			lazy
			sticky
			inertia
			interactive
			maxWidth="30rem"
			inlinePositioning
			content={content}
			placement={position}
			className={className}
			animation={animation}
			plugins={tippyPlugins}
			trigger={triggerString}
		>
			{children as any}
		</Tippy>
	);
};
