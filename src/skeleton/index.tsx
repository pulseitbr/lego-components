import styled from "styled-components";

type PropsSkeleton = {
	height: string;
	time?: number;
};

export const Skeleton = styled.div.attrs(({ time = 15000, ...props }: PropsSkeleton) => ({ ...props, time }))`
	width: 100%;
	height: ${(props) => props.height};
	background: linear-gradient(-90deg, #f4f4f4, #e1e1e1, #e9f6fa, #ededed);
	background-size: 400% 400%;
	animation: gradientBG ${(props) => props.time}ms ease-in-out infinite;

	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`;

type PropsAvatarSkeleton = {
	size: string;
	circle?: boolean;
	time?: number;
};

export const AvatarSkeleton = styled.div.attrs(({ circle = true, size = "3rem", ...props }: PropsAvatarSkeleton) => ({ ...props, circle, size }))`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: ${(props) => (!!props.circle ? "50%" : "0.1rem")};
	background: linear-gradient(-90deg, #f4f4f4, #e1e1e1, #e9f6fa, #ededed);
	background-size: 400% 400%;
	animation: gradientBG ${(props) => props.time}ms ease-in-out infinite;

	@keyframes gradientBG {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
`;
