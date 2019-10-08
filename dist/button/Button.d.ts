import React from "react";
declare type THEMES = "danger" | "primary" | "info" | "success" | "warn" | "transparent" | "light" | "none" | "dark" | "disabledTransparent";
export declare type ButtonProps = {
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
declare const Button: ({ full, circle, loading, square, loadingHeight, style, styleType, rippleColor, theme, size, children, onClick, stopPropagation, ...html }: ButtonProps) => JSX.Element;
export default Button;