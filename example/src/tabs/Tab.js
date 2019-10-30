import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Tab extends Component {
    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    onClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    };

    render() {
        const {
            onClick,
            props: { activeTab, label }
        } = this;

        const isActive = () => {
            if (activeTab === label) {
                // className += " tab-list-active";
                return true;
            }
        };

        const ListItem = styled.li`
            display: inline-block;
            list-style: none;
            margin-bottom: -1px;
            padding: 0.5rem 0.75rem;

            ${isActive() &&
                `
            background-color: white;
            border-bottom: 2px solid #005099;
            color: #005099;
            font-weight: bold;
            `}
        `;

        // let className = "tab-list-item";

        return (
            <ListItem onClick={onClick}>
                {label}
            </ListItem>
        );
    }
}

export default Tab;

