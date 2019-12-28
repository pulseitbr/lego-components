import styled from "styled-components";

type TextType = {
	paragraph: boolean | string;
};

export const Title = styled.h1.attrs(({ size = 1, ...props }: { size: number }) => ({ ...props, size }))`
	font-weight: bold;
	font-size: ${(props: any) => 2.25 * props.size}rem;
`;

export const SubTitle = styled.h3.attrs(({ size = 1, ...props }: { size: number }) => ({ ...props, size }))`
	font-weight: bold;
	font-size: ${(props: any) => 1.65 * props.size}rem;
`;
export const Text = styled.p.attrs(({ paragraph, ...props }: TextType) => {
	const size = paragraph === true ? "1rem" : typeof paragraph === "string" ? paragraph : "0";
	return { ...props, paragraph: size };
})`
	text-anchor: bottom;
	line-height: 1.5rem;
	text-shadow: 0.5px 0.5px #20202010;
	text-indent: ${(props) => props.paragraph};
`;
