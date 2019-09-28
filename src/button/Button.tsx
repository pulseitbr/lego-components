import { Loader } from "../";
import Theme from "../styles";
import React, { CSSProperties } from "react";
import styled from "styled-components";

type THEMES = "danger" | "primary" | "info" | "success" | "warn" | "transparent" | "light" | "none" | "dark";
export type ButtonProps = {
  stopPropagation?: boolean;
  size?: string;
  full?: boolean;
  circle?: boolean;
  loading?: boolean;
  squared?: boolean;
  loadingHeight?: number;
  danger?: boolean;
  primary?: boolean;
  info?: boolean;
  success?: boolean;
  warn?: boolean;
  transparent?: boolean;
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
    color: ${Theme.darkAlpha};
    background-color: ${Theme.disabled};
    border-color: ${Theme.disabledDark};
  }
`;

const ParentButton = styled(ThinButton)`
  padding: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  ${(props: any) => props.theme};
  ${(props: any) => props.size}
`;

const ghostStyle = (primaryColor: string, hoverColor: string, bgColor: string) => `
	color: ${primaryColor};
	background-color: transparent;
	border-color: ${bgColor};
	&:hover { color: ${hoverColor}; background-color: ${bgColor}; }
	&:active { color: ${hoverColor}; background-color: ${bgColor}; }
`;

const sizes: { [key: string]: any } = {
  normal: `
		padding: 0.5rem;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		`,
  small: `
		padding: 0.25rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		`
};

const createSize = (sizeName: string) => sizes[sizeName];

const styledProps = {
  warn: ghostStyle(Theme.warn, Theme.light, Theme.warn),
  info: ghostStyle(Theme.info, Theme.light, Theme.info),
  dark: ghostStyle(Theme.dark, Theme.light, Theme.dark),
  light: ghostStyle(Theme.light, Theme.light, Theme.light),
  danger: ghostStyle(Theme.danger, Theme.light, Theme.danger),
  primary: ghostStyle(Theme.primary, Theme.light, Theme.primary),
  success: ghostStyle(Theme.success, Theme.light, Theme.success),
  disabled: `${ghostStyle(Theme.disabled, Theme.darkAlpha, Theme.disabled)} cursor: not-allowed;`
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
    background-image: radial-gradient(circle, ${Theme.primary} 10%, transparent 10.01%);
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

const themeRnStyleProperty = ["danger", "primary", "info", "success", "warn", "transparent", "light", "none", "dark"];

const defineTheme = (props: ButtonProps, styleType: string, theme: string): string => {
  for (const key of themeRnStyleProperty) {
    //@ts-ignore
    if (key in props && !!props[key]) {
      return key;
    }
  }
  return styleType || theme;
};

const Button = ({
  full = false,
  circle = false,
  loading = false,
  squared = false,
  loadingHeight = 35,
  style = {},
  styleType = "primary",
  theme,
  size = "normal",
  children,
  onClick,
  stopPropagation = true,
  ...html
}: ButtonProps) => {
  const themeDefined = defineTheme(html as any, styleType, theme as string);

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (stopPropagation) {
      event.stopPropagation();
      event.persist();
    }
    if (!!onClick) {
      return onClick(event);
    }
  };

  if (themeDefined === "transparent") {
    return (
      <RippleButton {...html} onClick={onClickButton}>
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
  const cursor: CSSProperties = html.disabled ? { cursor: "not-allowed" } : { cursor: "pointer" };
  return (
    //@ts-ignore
    <ParentButton
      {...html}
      //@ts-ignore
      style={{ cursor, ...style }}
      full={full}
      size={createSize(size)}
      pill={!!!squared}
      bColor={Theme.primary}
      bgColor={Theme.primary}
      onClick={onClickButton}
      textColor={Theme.lightLight}
      //@ts-ignore
      theme={styledProps[ifDisable]}
      disabled={loading ? true : !!html.disabled}
    >
      {loading && (
        <React.Fragment>
          <Loader size={0.8} color={Theme.disabledDark} />{" "}
        </React.Fragment>
      )}
      {children}
    </ParentButton>
  );
};

export default Button;
