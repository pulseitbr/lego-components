import React from "react";
type Query = {
	link: string;
	minWidth?: string;
	maxWidth?: string;
} & React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
	alt: string;
	queries: Query[];
};
const createSourceElement = ({ minWidth, maxWidth, link, ...props }: Query) => {
	if (minWidth === "" && maxWidth === "") {
		throw new Error("error/Image: minWidth or maxWidth cannot be null, specify one of both");
	}
	const media = minWidth !== "" ? `(min-width: ${minWidth})` : `(max-width: ${maxWidth})`;
	return <source {...props} key={link} media={media} srcSet={link} />;
};
const Image = ({ alt, queries, ...props }: Props) => (
	<picture>
		{queries.map(createSourceElement)}
		<img {...props} alt={alt} />
	</picture>
);
export default Image;
