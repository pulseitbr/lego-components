import { StyleSheet, useOnClickOutside, useKeyDown, Keyboard } from "lego-components";
import React, { useMemo, useRef } from "react";
import styled from "styled-components";

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    min-width: 10rem;
    box-shadow: 0px ${StyleSheet.hairlineWidth} 2px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const DropdownItem = styled.span`
    text-decoration: none;
    display: block;
`;

const DropdownMain = styled.span`
    display: inline-block;
    text-decoration: none;
`;

const Dropdown = ({ children, triggers = ["onClick"], ...props }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => (ref.current.style.display = "none"));

    const hide = () => (ref.current.style.display = "none");
    const show = () => (ref.current.style.display = "block");

    useKeyDown((e) => {
        if (e.keyCode === Keyboard.esc) {
            hide();
        }
    });

    const onClick = (event) => {
        show();
    };

    const triggerEvents = useMemo(() => triggers.reduce((acc, el) => ({ ...acc, [el]: onClick }), {}), triggers);

    return (
        <DropdownMain {...triggerEvents}>
            {children}
            <DropdownContent ref={ref}>
                <DropdownItem>Carai</DropdownItem>
                <DropdownItem>Bruxão</DropdownItem>
            </DropdownContent>
        </DropdownMain>
    );
};

export default Dropdown;
