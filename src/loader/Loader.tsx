import React from "react";
import Theme from "../styles";
import styled from "styled-components";

export type Props = {
    size?: number;
    color?: string;
    border?: number;
    velocity?: number;
    className?: string;
};

const SpanLoader = styled.span<Props>`
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
        border: ${(props: any) => props.border}rem solid ${Theme.disabledAlpha};
        border-left-color: ${(props) => props.color};
        border-radius: 50%;
        width: ${(props: any) => props.size}rem;
        height: ${(props: any) => props.size}rem;
        animation: donut-spin ${(props: any) => props.velocity}s linear infinite;
    }
`;

const Loader = ({ color = Theme.primary, velocity = 1, border = 0.2, size = 2, ...props }: Props) => {
    return <SpanLoader {...props} velocity={velocity} color={color} size={size} border={border} />;
};

export default Loader;
