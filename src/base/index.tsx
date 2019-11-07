import { FlexDirectionProperty } from "csstype";
import React, { useEffect, useRef } from "react";
import styled, { StyledComponent } from "styled-components";
import { HtmlTag } from "../@types";

type Value = number | string;

export type LegoMediaQuery = {
	span?: Value;
	xsmall?: Value;
	small?: Value;
	medium?: Value;
	large?: Value;
	xlarge?: Value;
};

export type TypeContainer = LegoMediaQuery &
	React.HTMLAttributes<HTMLElement> & {
		time?: Value;
		direction?: FlexDirectionProperty;
	};

const Flex = styled.div.attrs(({ direction = "row", ...props }: TypeContainer) => {
	const span = props.span || 0;
	const xsmall = props.xsmall || "100%";
	const small = props.small || "100%";
	const medium = props.medium || span;
	const large = props.large || span;
	const xlarge = props.xlarge || span;
	return { ...props, span, xsmall, medium, large, small, xlarge, direction };
})`
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

const Collapse = styled(Flex).attrs(({ time = 450, ...props }: TypeContainer) => ({ ...props, time }))`
	max-height: 0;
	overflow: hidden;
	transition: max-height ${(props: any) => props.time}ms cubic-bezier(0.45, 0.27, 0.63, 0.51);
`;

type ResponsiveProps = {
	isCollapse?: boolean;
	show?: boolean;
	htmlTag?: HtmlTag;
	Component: StyledComponent<"div", any, any>;
} & TypeContainer;

const Responsive = ({
	isCollapse = false,
	show = true,
	Component = Flex,
	children,
	htmlTag = "div",
	...props
}: ResponsiveProps) => {
	const ref: React.RefObject<HTMLDivElement> = useRef(null);
	useEffect(() => {
		if (!!ref.current) {
			if (!!isCollapse) {
				if (show) {
					ref.current.style.maxHeight = "100%";
				} else {
					ref.current.style.maxHeight = null;
				}
			}
		}
	}, [isCollapse, show]);

	if (!isCollapse) {
		return (
			<Component as={htmlTag} {...props}>
				{children}
			</Component>
		);
	}

	return (
		<Collapse as={htmlTag} ref={ref} {...props}>
			{children}
		</Collapse>
	);
};

export const Left = styled(Responsive)`
	flex: 1;
	text-align: left;
	align-items: flex-start;
	align-self: center;
`;

export const Right = styled(Responsive)`
	flex: 1;
	text-align: right;
	align-items: flex-end;
	align-self: center;
`;

export const View = styled(Responsive)`
	justify-items: center;
	flex-wrap: wrap;
`;
export const Page = styled(Responsive)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	min-width: 100%;
	min-height: 100%;
	align-items: center;
	align-content: center;
	flex-direction: column;
`;
export const Body = styled(Responsive)`
	flex: 1 0 auto;
	width: 100%;
	min-width: 100%;
	flex-wrap: wrap;
	align-items: center;
	align-self: center;
`;
export const Container = styled(Responsive)`
	display: flex;
	justify-items: center;
	flex-wrap: wrap;
	min-width: 100%;
`;
export const Footer = styled(Container)`
	flex: 0;
	flex-shrink: 0;
	flex-wrap: wrap;
	align-self: center;
	align-items: center;
	align-content: center;
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
	column-gap: ${(props) => props.spacing};
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
