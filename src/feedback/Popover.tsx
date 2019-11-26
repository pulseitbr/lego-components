import Tippy from "@tippy.js/react";
import React from "react";
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
export type PopoverTheme = "dark" | "light";
type Props = {
	arrow?: boolean;
	onCreate?: any;
	theme?: PopoverTheme;
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
export const Popover = ({
	children,
	className = "",
	triggers = ["click"],
	itens,
	arrow = true,
	onCreate,
	theme = "light",
	animation = "shift-away",
	position = "bottom-end"
}: Props) => (
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
		<span>{children as any}</span>
	</Tippy>
);
