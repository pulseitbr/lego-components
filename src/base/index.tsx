import { FlexDirectionProperty } from "csstype";
import React from "react";
import Collapse from "./collapse";
import styled, { StyledComponent } from "styled-components";
import { HtmlTag, TypeText } from "../@types";

export type LegoMediaQuery = {
	span?: TypeText;
	xsmall?: TypeText;
	small?: TypeText;
	medium?: TypeText;
	large?: TypeText;
	xlarge?: TypeText;
};

export type TypeContainer = LegoMediaQuery &
	React.HTMLAttributes<HTMLElement> & {
		time?: TypeText;
		direction?: FlexDirectionProperty;
	};

const Flex = styled.div.attrs(({ direction = "row", ...props }: TypeContainer) => {
	const span = props.span || "100%";
	const xsmall = props.xsmall || "100%";
	const small = props.small || "100%";
	const medium = props.medium || span;
	const large = props.large || span;
	const xlarge = props.xlarge || span;
	return { ...props, span, xsmall, medium, large, small, xlarge, direction };
})`
	display: flex;
	flex: 0 0 ${(props: TypeContainer) => props.span};
	flex-wrap: wrap;
	flex-direction: ${(props: TypeContainer) => props.direction};

	@media only screen and (max-width: 600px) {
		flex: 0 0 ${(props: TypeContainer) => props.xsmall};
	}

	@media only screen and (min-width: 600px) {
		flex: 0 0 ${(props: TypeContainer) => props.small};
	}

	@media only screen and (min-width: 768px) {
		flex: 0 0 ${(props: TypeContainer) => props.medium};
	}

	@media only screen and (min-width: 992px) {
		flex: 0 0 ${(props: TypeContainer) => props.large};
	}

	@media only screen and (min-width: 1200px) {
		flex: 0 0 ${(props: TypeContainer) => props.xlarge};
	}
`;

type ResponsiveProps = {
	isCollapse?: boolean;
	show?: boolean;
	htmlTag?: HtmlTag;
	Component?: StyledComponent<"div", any, any>;
} & TypeContainer;

const Responsive = React.forwardRef(
	({ children, Component = Flex, htmlTag = "div", isCollapse = false, show = true, time = 750, ...props }: ResponsiveProps, ref) => {
		if (!isCollapse) {
			return (
				<Component as={htmlTag} {...props} ref={ref}>
					{children}
				</Component>
			);
		}
		return (
			<Collapse isOpened={show} time={time}>
				<Component as={htmlTag} {...props} ref={ref}>
					{children}
				</Component>
			</Collapse>
		);
	}
);

export const Left = styled(Responsive)`
	text-align: left;
	align-items: flex-start;
	align-self: center;
`;

export const Right = styled(Responsive)`
	text-align: right;
	align-items: flex-end;
	align-self: center;
`;

export const View = styled(Responsive)`
	justify-items: center;
	flex-wrap: wrap;
`;
export const Page = styled(Responsive)`
	align-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	min-width: 100%;
`;
export const Body = styled(Responsive)`
	align-items: center;
	align-self: center;
	flex-wrap: wrap;
	flex: 1 0 auto;
	min-width: 100%;
	width: 100%;
`;
export const Container = styled(Responsive)`
	display: flex;
	flex-wrap: wrap;
	justify-items: center;
	min-width: 100%;
`;
export const Footer = styled(Container)`
	align-content: center;
	align-items: center;
	align-self: center;
	flex-shrink: 0;
	flex-wrap: wrap;
	flex: 0;
	justify-content: center;
`;

const GridComponent = styled.div`
	*zoom: 1;
	&:before,
	&:after {
		content: " ";
		display: table;
	}
	&:after {
		clear: both;
	}
`;

type RowProps = {
	spacing: string | number;
} & React.HTMLAttributes<HTMLElement>;

export const Row = styled(GridComponent).attrs((props: RowProps) => ({
	...props,
	spacing: props.spacing
}))`
	width: 100%;
	column-gap: ${(props: RowProps) => props.spacing};
`;
export const Col = styled(GridComponent).attrs((props: LegoMediaQuery) => {
	const span = props.span || 0;
	const xsmall = props.xsmall || "100%";
	const small = props.small || "100%";
	const medium = props.medium || span;
	const large = props.large || span;
	const xlarge = props.xlarge || span;
	return { ...props, span, xsmall, medium, large, small, xlarge };
})`
	width: ${(props: TypeContainer) => props.span};

	@media only screen and (max-width: 600px) {
		width: ${(props: TypeContainer) => props.xsmall};
	}

	@media only screen and (min-width: 600px) {
		width: ${(props: TypeContainer) => props.small};
	}

	@media only screen and (min-width: 768px) {
		width: ${(props: TypeContainer) => props.medium};
	}

	@media only screen and (min-width: 992px) {
		width: ${(props: TypeContainer) => props.large};
	}

	@media only screen and (min-width: 1200px) {
		width: ${(props: TypeContainer) => props.xlarge};
	}
`;
