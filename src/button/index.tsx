import React, { useRef, useImperativeHandle } from "react";
import styled from "styled-components";
import Loader from "../loader/loader";
import { Colors } from "@pulseitbr/lego";
import { ThemeProperty, defineTheme } from "../styles/theme-property";

interface IButtonProps {
	textOnLoading?: boolean;
	circle?: boolean;
	danger?: boolean;
	dark?: boolean;
	disabledTransparent?: boolean;
	full?: boolean;
	info?: boolean;
	light?: boolean;
	loading?: boolean;
	loadingHeight?: number;
	none?: boolean;
	onPress?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
	primary?: boolean;
	rippleColor?: string;
	size?: number;
	square?: boolean;
	stopPropagation?: boolean;
	styleType?: ThemeProperty;
	success?: boolean;
	theme?: ThemeProperty;
	transparent?: boolean;
	warn?: boolean;
}

export type ButtonProps = IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const getRadius = (props: any) => {
	if (props.circle) {
		return "50%";
	}
	return props.pill ? "0.5rem" : "3px";
};

const ThinButton = styled.button<ButtonProps & { pill?: boolean }>`
	height: fit-content;
	outline: none;
	font-size: 0.9rem;
	box-shadow: none;
	border-width: 1px;
	position: relative;
	outline-style: none;
	border-style: solid;
	border-width: 0.1rem;
	transition: background-color 0.35s ease-in-out;
	width: ${(props: any) => (props.full ? "100%" : "auto")};
	cursor: ${(props: any) => (props.loading ? "wait" : "pointer")};
	border-radius: ${(props) => getRadius(props)};

	&:disabled {
		cursor: not-allowed;
		pointer-events: none;
		color: ${Colors.darkAlpha};
		background-color: transparent;
		border-color: ${Colors.disabled};
	}
`;

const ParentButton = styled(ThinButton)<ButtonProps & { bgColor: string; textColor: string }>`
	padding: ${(props: any) => 0.25 * props.size}rem;
	padding-left: ${(props: any) => 0.5 * props.size}rem;
	padding-right: ${(props: any) => 0.5 * props.size}rem;
	padding-top: ${(props: any) => 0.5 * props.size}rem;
	padding-bottom: ${(props: any) => 0.5 * props.size}rem;
	font-size: ${(props: any) => 1 * props.size}rem;
	${(props: any) => props.theme};
`;

const ghostStyle = (primaryColor: string, hoverColor: string, bgColor: string, clickColor: string) => `
	color: ${primaryColor};
	background-color: transparent;
	border-color: ${bgColor};
	&:hover { color: ${hoverColor}; background-color: ${bgColor}; }
	&:active { color: ${hoverColor}; background-color: ${clickColor}; }
`;

const styledProps = {
	danger: ghostStyle(Colors.danger, Colors.light, Colors.danger, Colors.dangerDark),
	dark: ghostStyle(Colors.dark, Colors.light, Colors.dark, Colors.darkDarkest),
	disabled: `${ghostStyle(Colors.disabled, Colors.darkAlpha, "transparent", "transparent")} cursor: not-allowed;`,
	info: ghostStyle(Colors.info, Colors.light, Colors.info, Colors.infoDark),
	light: ghostStyle(Colors.light, Colors.lightDark, Colors.light, Colors.lightDark),
	primary: ghostStyle(Colors.primary, Colors.light, Colors.primary, Colors.primaryDark),
	success: ghostStyle(Colors.success, Colors.light, Colors.success, Colors.successDark),
	transparent: ghostStyle("transparent", "transparent", "transparent", "transparent"),
	warn: ghostStyle(Colors.warn, Colors.light, Colors.warn, Colors.warnDark),
	disabledTransparent: `${ghostStyle(Colors.disabled, Colors.disabled, "transparent", "transparent")}
	cursor: not-allowed; &:disabled {
    	background-color: transparent;
    	border-color: transparent;
  	}`
};

const Transparent = styled(ThinButton)`
	background-color: transparent;
	display: inline-block;
	position: relative;
	background-color: transparent;
	outline: 0;
	border: 1px solid transparent;
	cursor: pointer;
`;

const RippleButton = styled(Transparent)`
	overflow: hidden;
	transform: translate3d(0, 0, 0);
	&:after {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		background-image: radial-gradient(circle, ${(props: any) => props.rippleColor} 10%, transparent 15%);
		background-repeat: no-repeat;
		background-position: center;
		transform: scale(10, 10);
		opacity: 0;
		transition: transform 500ms, opacity 1s;
	}

	&:active:after {
		transform: scale(0, 0);
		opacity: 0.4;
		transition: 0s;
	}
`;

const Button = React.forwardRef(
	(
		{
			textOnLoading = true,
			full = false,
			loading = false,
			square = false,
			style = {},
			styleType = "primary",
			rippleColor = Colors.primary,
			theme,
			circle = false,
			disabled,
			size = 1,
			children,
			type = "button",
			onClick,
			onPress,
			stopPropagation = true,
			...html
		}: ButtonProps,
		forwardRef
	) => {
		const ref = useRef(null);
		const themeDefined = defineTheme(html, styleType, theme) || "primary";
		const clickPressAction = onClick || onPress;
		const ifDisable = !!disabled ? "disabled" : themeDefined;

		useImperativeHandle(forwardRef, () => ref.current);

		const onClickButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			if (stopPropagation) {
				event.stopPropagation();
			}
			event.persist();
			if (!!clickPressAction) {
				return clickPressAction(event);
			}
		};

		const commonProps = {
			disabled: loading ? true : !!disabled,
			onClick: onClickButton,
			style,
			type
		};

		if (themeDefined === "transparent") {
			return (
				<RippleButton {...html} {...commonProps} circle={circle} rippleColor={rippleColor}>
					{children}
				</RippleButton>
			);
		} else if (themeDefined === "none") {
			return (
				<Transparent {...html} {...commonProps} circle={circle}>
					{children}
				</Transparent>
			);
		}

		const childrenRender = (() => {
			if (loading && textOnLoading) {
				return (
					<React.Fragment>
						<Loader border={0.05} size={0.5} color={Colors.disabledDark} /> {children}
					</React.Fragment>
				);
			}
			if (loading) {
				return (
					<React.Fragment>
						<Loader border={0.05} size={0.5} color={Colors.disabledDark} />
					</React.Fragment>
				);
			}
			return children;
		})();

		return (
			<ParentButton
				{...html}
				{...commonProps}
				ref={ref.current}
				circle={circle}
				full={full}
				size={size}
				pill={!square}
				bgColor={Colors.primary}
				textColor={Colors.lightLight}
				theme={styledProps[ifDisable]}
			>
				{childrenRender}
			</ParentButton>
		);
	}
);

export default Button;
