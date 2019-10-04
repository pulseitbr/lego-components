import React from "react";
import styled from "styled-components";
import Theme from "../styles";

const Dot = styled.span`
    background-color: ${(props) => props.color};
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    min-height: 0.6rem;
    min-width: 0.6rem;
    margin-bottom: 1px;
`;

type Props = {
    children: React.ReactNode;
    color?: string;
};

const Badge = ({ children, color = Theme.info }: Props) => {
    return (
        <span className="mh1">
            <Dot color={color} /> {children}
        </span>
    );
};

export default Badge;
