import styled from "styled-components";
import { SkeletonLoading } from '../animation/styled-animations';

type PropsSkeleton = {
	height: string;
	time?: number;
};

const commonCSS = `
	background: linear-gradient(-90deg, #f4f4f4, #e1e1e1, #e9f6fa, #ededed);
	background-size: 400% 400%;
`;

export const Skeleton = styled.div.attrs(({ time = 15000, ...props }: PropsSkeleton) => ({ ...props, time }))`
	width: 100%;
	height: ${(props) => props.height};
	animation: ${SkeletonLoading} ${(props) => props.time}ms ease-in-out infinite;
	${commonCSS}
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
	animation: ${SkeletonLoading} ${(props) => props.time}ms ease-in-out infinite;
	${commonCSS}
`;
