import React, { CSSProperties } from "react";
import styled from "styled-components";

type TypeAvatar = {
	size?: number;
	src?: string;
	style?: CSSProperties;
} & HTMLSpanElement &
	HTMLImageElement;

export const Avatar = styled.span.attrs(({ size = 1, ...props }: TypeAvatar) => ({ ...props, size }))`
	font-weight: 600;
	text-emphasis: 100;
	font-style: normal;
	text-decoration: none;
	vertical-align: bottom;
	font-size: ${(props: TypeAvatar) => 1 * props.size!}rem;
	width: ${(props: TypeAvatar) => 1 * props.size!}rem;
	height: ${(props: TypeAvatar) => 1 * props.size!}rem;
`;

export const CircleAvatar = ({ src = "", style, ...props }: TypeAvatar) => {
	if (src === "") {
		//@ts-ignore{
		return <Avatar {...props} as="span" style={{ ...style, borderRadius: "100%" }} />;
	}
	//@ts-ignore
	return <Avatar src={src} {...props} as="img" style={{ ...style, borderRadius: "100%" }} />;
};
