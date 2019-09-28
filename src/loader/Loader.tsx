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
    border: 0.2rem solid rgba(0, 0, 0, 0.1);
    border-left-color: #5778f3;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    animation: donut-spin 1.2s linear infinite;
  }
`;

export type Props = {
  color?: string;
  velocity?: number;
  border?: number;
  className?: string;
  size?: number;
};

const Loader = ({ color = Theme.primary, velocity = 1, border = 0.2, size = 2, className = "", ...props }: Props) => {
  return (
    <SpanLoader
      {...props}
      style={{
        border: `${border}rem solid rgba(0, 0, 0, 0.1)`,
        borderLeftColor: color,
        animation: `donut-spin ${velocity}s linear infinite`,
        width: `${size}rem`,
        height: `${size}rem`
      }}
      className={className}
    />
  );
};
export default Loader;
