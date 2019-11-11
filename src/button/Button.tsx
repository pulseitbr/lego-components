import React from "react";
import styled from "styled-components";
import Loader from "../loader/Loader";
import Theme from "../styles";
import { ThemeProperty, defineTheme } from "../styles/ThemeProperty";

interface IButtonProps {
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

const ThinButton = styled.button<ButtonProps & { pill?: boolean }>`
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
	border-radius: ${(props: any) => (props.pill ? "9999px" : "5px")};

	&:disabled {
		cursor: wait;
		pointer-events: none;
		color: ${Theme.darkAlpha};
		background-color: ${Theme.disabled};
		border-color: ${Theme.disabledDark};
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
	warn: ghostStyle(Theme.warn, Theme.light, Theme.warn, Theme.warnDark),
	info: ghostStyle(Theme.info, Theme.light, Theme.info, Theme.infoDark),
	dark: ghostStyle(Theme.dark, Theme.light, Theme.dark, Theme.darkDarkest),
	light: ghostStyle(Theme.light, Theme.light, Theme.light, Theme.lightDark),
	danger: ghostStyle(Theme.danger, Theme.light, Theme.danger, Theme.dangerDark),
	primary: ghostStyle(Theme.primary, Theme.light, Theme.primary, Theme.primaryDark),
	success: ghostStyle(Theme.success, Theme.light, Theme.success, Theme.successDark),
	disabled: `${ghostStyle(Theme.disabled, Theme.darkAlpha, "transparent", "transparent")} cursor: not-allowed;`,
	disabledTransparent: `${ghostStyle(
		Theme.disabled,
		Theme.disabled,
		"transparent",
		"transparent"
	)} cursor: not-allowed; &:disabled {
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
	color: ${Theme.primary};
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

const Button = ({
	full = false,
	circle = false,
	loading = false,
	square = false,
	loadingHeight = 35,
	style = {},
	styleType = "primary",
	rippleColor = Theme.primaryAlpha,
	theme,
	size = 1,
	children,
	type = "button",
	onClick,
	onPress,
	stopPropagation = true,
	...html
}: ButtonProps) => {
	const themeDefined = defineTheme(html, styleType, theme) || "primary";
	const clickPressAction = onClick || onPress;
	const ifDisable = html.disabled ? "disabled" : themeDefined;
	const cursor = html.disabled ? ("not-allowed" as "not-allowed") : ("pointer" as "pointer");

	const onClickButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (stopPropagation) {
			event.stopPropagation();
		}
		event.persist();
		if (!!clickPressAction) {
			return clickPressAction(event);
		}
	};

	if (themeDefined === "transparent") {
		return (
			<RippleButton {...html} onClick={onClickButton} rippleColor={rippleColor}>
				{children}
			</RippleButton>
		);
	} else if (themeDefined === "none") {
		return (
			<Transparent {...html} onClick={onClickButton}>
				{children}
			</Transparent>
		);
	}

	return (
		<ParentButton
			{...html}
			type={type}
			full={full}
			size={size}
			pill={!square}
			bgColor={Theme.primary}
			onClick={onClickButton}
			style={{ cursor, ...style }}
			textColor={Theme.lightLight}
			theme={styledProps[ifDisable]}
			disabled={loading ? true : !!html.disabled}
		>
			{loading && (
				<React.Fragment>
					<Loader border={0.05} size={0.5} color={Theme.disabledDark} />{" "}
				</React.Fragment>
			)}
			{children}
		</ParentButton>
	);
};

export default Button;
