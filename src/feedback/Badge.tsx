import { Colors } from "lego";
import { darken, transparentize } from "polished";
import React, { CSSProperties } from "react";
import styled from "styled-components";
import Constants from "../styles/Constants";
import StyleSheet from "../styles/StyleSheet";

const Dot = styled.span.attrs(({ size = 1, ...props }: any) => ({ ...props, size }))`
	background-color: ${(props) => props.color};
	display: inline-block;
	text-align: center;
	border-radius: 50%;
	min-height: ${(props) => 0.6 * props.size}rem;
	min-width: ${(props) => 0.6 * props.size}rem;
	margin-bottom: 4px;
`;

type Props = {
	type?: "dot" | "tag";
	children: React.ReactNode;
	color?: string;
	style?: CSSProperties;
	size?: number;
};

const styles = StyleSheet.create({
	margin: StyleSheet.marginHorizontal(Constants.UNIT_1),
	tag: {
		...StyleSheet.marginHorizontal(Constants.UNIT_1),
		...StyleSheet.marginVertical(Constants.UNIT_1),
		...StyleSheet.paddingHorizontal("0.75rem"),
		alignItems: "baseline",
		fontWeight: "bolder",
		textAlign: "center"
	}
});

const Badge = ({ children, size = 1, style = {}, type = "tag", color = Colors.info }: Props) => {
	if (type === "dot") {
		return (
			<span style={{ ...style, ...styles.margin }}>
				<Dot size={size} color={color} /> {children}
			</span>
		);
	}
	return (
		<span
			style={{
				...styles.tag,
				backgroundColor: transparentize(0.8, color),
				color: darken(0.1, color),
				border: `2px solid ${color}`,
				borderRadius: `${0.3 * size}rem`,
				padding: `${0.25 * size}rem`,
				fontSize: `${1.15 * size}rem`,
				...style
			}}
		>
			{children}
		</span>
	);
};

export default Badge;
