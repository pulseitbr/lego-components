import React from "react";
import { Colors } from "@pulseitbr/lego";
import styled from "styled-components";
import { Spin } from '../animation/styled-animations';

export type Props = {
	size?: number;
	color?: string;
	border?: number;
	velocity?: number;
	className?: string;
};

const SpanLoader = styled.span<Props>`
	@keyframes donut-spin {

	}

	& {
		display: inline-block;
		border: ${(props: any) => props.border}rem solid ${Colors.disabledAlpha};
		border-left-color: ${(props) => props.color};
		border-radius: 50%;
		width: ${(props: any) => props.size}rem;
		height: ${(props: any) => props.size}rem;
		animation: ${Spin} ${(props: any) => props.velocity}s linear infinite;
	}
`;

const Loader = ({ color = Colors.primary, velocity = 1, border = 0.2, size = 2, ...props }: Props) => (
	<SpanLoader {...props} velocity={velocity} color={color} size={size} border={border} />
);

export default Loader;
