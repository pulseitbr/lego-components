import React from "react";
import Theme from "../styles";
import styled from "styled-components";

const SpanLoader = styled.span`
    @keyframes donut-spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    & {
        display: inline-block;
        border: ${(props: any) => props.border}rem solid rgba(0, 0, 0, 0.1);
        border-left-color: ${(props) => props.color};
        border-radius: 50%;
        width: ${(props: any) => props.size}rem;
        height: ${(props: any) => props.size}rem;
        animation: donut-spin ${(props: any) => props.velocity}s linear infinite;
    }
`;

export type Props = {
    size?: number;
    color?: string;
    border?: number;
    velocity?: number;
    className?: string;
};

const Loader = ({ color = Theme.primary, velocity = 1, border = 0.2, size = 2, className = "", ...props }: Props) => {
    return (
        //@ts-ignore
        <SpanLoader {...props} velocity={velocity} color={color} size={size} border={border} className={className} />
    );
};

export default Loader;
