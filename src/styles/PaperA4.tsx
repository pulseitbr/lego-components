import { Colors } from "lego";
import styled from "styled-components";

type TypesPaperA4 = Partial<{
	color: string;
	footerBackground: string;
	footerForeground: string;
}>;

const PaperA4 = styled.div.attrs((props: TypesPaperA4) => ({
	...props,
	color: "black",
	footerBackground: Colors.primary,
	footerForeground: "white"
}))`
	width: 21cm;
	height: 29.7cm;
	position: relative;
	color: ${(props) => props.color};

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		background-color: transparent;
		border: 1px solid ${(props) => props.color};
		text-align: left;
		padding: 8px;
	}

	footer {
		position: absolute;
		bottom: 40px;
		width: 100%;
		padding: 2rem;
		background-color: ${(props) => props.footerBackground};

		p {
			color: ${(props) => props.footerForeground};
			text-align: center;
		}
	}
`;

export default PaperA4;