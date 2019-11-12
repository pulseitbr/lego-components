import styled from "styled-components";
export const Title = styled.h1`
	font-weight: bold;
	font-size: 2.25rem;
	font-family: "Comfortaa", Arial, Helvetica, sans-serif;
`;

export const SubTitle = styled.h3`
	font-weight: bold;
	font-size: 1.65rem;
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
