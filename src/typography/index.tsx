import styled from "styled-components";

export const Title = styled.h1`
	font-weight: bold;
	font-size: 2.25rem;
	font-family: "Comfortaa", Arial, Helvetica, sans-serif;
`;

export const SubTitle = styled.h3.attrs(({ size = 1, ...props }: { size: number }) => ({ ...props, size }))`
	font-weight: bold;
	font-size: ${(props: any) => 1.65 * props.size}rem;
	font-family: "Comfortaa", Arial, Helvetica, sans-serif;
`;
type TextType = {
	paragraph: boolean | string;
};
export const Text = styled.p.attrs(({ paragraph, ...props }: TextType) => {
	const size = paragraph === true ? "1rem" : typeof paragraph === "string" ? paragraph : "0";
	return { ...props, paragraph: size };
})`
	text-anchor: bottom;
	line-height: 1.5rem;
	text-shadow: 0.5px 0.5px #20202010;
	text-indent: ${(props) => props.paragraph};
`;
