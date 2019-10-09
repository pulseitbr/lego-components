import React from "react";
declare type Value = number | string;
export declare type LegoMediaQuery = {
    span?: Value;
    xsmall?: Value;
    small?: Value;
    medium?: Value;
    large?: Value;
    xlarge?: Value;
};
export declare type TypeContainer = LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: Value;
};
declare type ResponsiveProps = {
    isCollapse?: boolean;
    show?: boolean;
} & TypeContainer;
export declare const Left: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Right: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const View: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Container: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Page: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Body: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Footer: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: ResponsiveProps) => JSX.Element, any, {}, never>;
export {};
