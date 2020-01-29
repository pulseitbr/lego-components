import { keyframes } from "styled-components";

export const Fade = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

export const InputHighlight = (color: string) => keyframes`
	from {
		background: ${color};
	}
	to {
		width: 0;
		background: transparent;
	}
`;

export const Spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

export const SkeletonLoading = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
