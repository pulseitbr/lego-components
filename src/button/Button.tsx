import React from "react";
import styled from "styled-components";
import Loader from "../loader/Loader";
import Theme from "../styles";

type THEMES = "danger" | "primary" | "info" | "success" | "warn" | "transparent" | "light" | "none" | "dark" | "disabledTransparent";
export type ButtonProps = {
    rippleColor?: string;
    stopPropagation?: boolean;
    size?: number;
    full?: boolean;
    circle?: boolean;
    loading?: boolean;
    square?: boolean;
    loadingHeight?: number;
    danger?: boolean;
    primary?: boolean;
    info?: boolean;
    success?: boolean;
    warn?: boolean;
    transparent?: boolean;
    disabledTransparent?: boolean;
    light?: boolean;
    none?: boolean;
    dark?: boolean;
    theme?: THEMES;
    styleType?: THEMES;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThinButton = styled.button`
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

const ParentButton = styled(ThinButton)`
    padding: ${(props: any) => 0.25 * props.size}rem;
    padding-left: ${(props: any) => 0.5 * props.size}rem;
    padding-right: ${(props: any) => 0.5 * props.size}rem;
    padding-top: ${(props: any) => 0.5 * props.size}rem;
    padding-bottom: ${(props: any) => 0.5 * props.size}rem;
    font-size: ${(props: any) => 1 * props.size}rem;
    ${(props: any) => props.theme};
`;

const ghostStyle = (primaryColor: string, hoverColor: string, bgColor: string) => `
	color: ${primaryColor};
	background-color: transparent;
	border-color: ${bgColor};
	&:hover { color: ${hoverColor}; background-color: ${bgColor}; }
	&:active { color: ${hoverColor}; background-color: ${bgColor}; }
`;

const styledProps = {
    warn: ghostStyle(Theme.warn, Theme.light, Theme.warn),
    info: ghostStyle(Theme.info, Theme.light, Theme.info),
    dark: ghostStyle(Theme.dark, Theme.light, Theme.dark),
    light: ghostStyle(Theme.light, Theme.light, Theme.light),
    danger: ghostStyle(Theme.danger, Theme.light, Theme.danger),
    primary: ghostStyle(Theme.primary, Theme.light, Theme.primary),
    success: ghostStyle(Theme.success, Theme.light, Theme.success),
    disabled: `${ghostStyle(Theme.disabled, Theme.darkAlpha, "transparent")} cursor: not-allowed;`,
    disabledTransparent: `${ghostStyle(Theme.disabled, Theme.disabled, "transparent")} cursor: not-allowed; &:disabled {
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
        background-image: radial-gradient(circle, ${(props: any) => props.rippleColor} 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform 0.5s, opacity 1s;
    }
    &:active:after {
        transform: scale(0, 0);
        opacity: 0.3;
        transition: 0s;
    }
`;

const themeRnStyleProperty = [
    "danger",
    "primary",
    "info",
    "success",
    "warn",
    "transparent",
    "light",
    "none",
    "dark",
    "disabled",
    "disabledTransparent"
];

const defineTheme = (props: ButtonProps & Object, styleType: string, theme: string = ""): string => {
    for (const key of themeRnStyleProperty) {
        const hasProp = props.hasOwnProperty(key);
        if (hasProp && !!props[key]) {
            return key;
        }
    }
    return styleType || theme;
};

const Button = ({
    full = false,
    circle = false,
    loading = false,
    square = false,
    loadingHeight = 35,
    style = {},
    styleType = "primary",
    rippleColor = Theme.primary,
    theme,
    size = 1,
    children,
    onClick,
    stopPropagation = true,
    ...html
}: ButtonProps) => {
    const themeDefined = defineTheme(html, styleType, theme);

    const onClickButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (stopPropagation) {
            event.stopPropagation();
        }
        event.persist();
        if (!!onClick) {
            return onClick(event);
        }
    };

    if (themeDefined === "transparent") {
        return (
            // @ts-ignore
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

    const ifDisable = html.disabled ? "disabled" : themeDefined;
    const cursor = html.disabled ? ("not-allowed" as "not-allowed") : ("pointer" as "pointer");

    return (
        //@ts-ignore
        <ParentButton
            {...html}
            full={full}
            size={size}
            pill={!square}
            bColor={Theme.primary}
            bgColor={Theme.primary}
            onClick={onClickButton}
            style={{ cursor, ...style }}
            textColor={Theme.lightLight}
            theme={styledProps[ifDisable]}
            disabled={loading ? true : !!html.disabled}
        >
            {loading && (
                <React.Fragment>
                    <Loader border={0.05} size={0.55} color={Theme.disabledDark} />{" "}
                </React.Fragment>
            )}
            {children}
        </ParentButton>
    );
};

export default Button;
