import React from "react";
import styled from "styled-components";

const activeTabCSS = (props: any) => {
    if (props.isActive) {
        return `
            background-color: white;
            border-bottom: 2px solid ${props.color || "#00fff0"};
            color: ${props.color};
            font-weight: bold;
        `;
    }
    return "";
};

const ListItem = styled.li`
    display: inline-block;
    list-style: none;
    margin-bottom: -1px;
    padding: 0.5rem 0.75rem;
    ${(props) => activeTabCSS(props)}
`;

type Props = {
    color: string;
    label: string;
    activeTab: string;
    onClick: (label: string) => any;
};

const Tab = ({ label, onClick, activeTab }: Props) => {
    const triggerClick = () => {
        onClick(label);
    };

    const isActive = activeTab === label;

    return (
        //@ts-ignore
        <ListItem isActive={isActive} onClick={triggerClick}>
            {label}
        </ListItem>
    );
};

export default Tab;
