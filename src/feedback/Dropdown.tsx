import React, { useMemo, useRef } from "react";
import Keyboard from "../utils/Keyboard";
import styled from "styled-components";
import StyleSheet from "../utils/StyleSheet";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useKeyDown from "../hooks/useKeyDown";
import Theme from "../styles";

const DropdownMain = styled.span`
    display: inline-block;
    text-decoration: none;
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    min-width: 10rem;
    box-shadow: 0px ${StyleSheet.hairlineWidth} 2px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

export const DropdownItem = styled.span`
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: ${Theme.lightAlpha};
    }
`;

type Trigger = "onClick" | "onHover" | "onContextMenu";
type Props = {
    children: React.ReactNode;
    triggers?: Trigger[];
    itens: typeof DropdownItem[];
    onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any;
};

const Dropdown = ({ children, onClick, itens, triggers = ["onClick"] }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const hide = () => {
        if (ref.current !== null) {
            ref.current!.style.display = "none";
        }
    };
    const show = () => {
        if (ref.current !== null) {
            ref.current!.style.display = "block";
        }
    };
    useOnClickOutside(ref, hide);

    useKeyDown((e) => {
        if (e.keyCode === Keyboard.esc) {
            hide();
        }
    });

    const click = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        show();
        if (!!onClick) {
            onClick(event);
        }
    };

    const triggerEvents = useMemo(() => triggers.reduce((acc, el) => ({ ...acc, [el]: click }), {}), triggers);

    return (
        <DropdownMain {...triggerEvents}>
            {children}
            <DropdownContent ref={ref}>{itens}</DropdownContent>
        </DropdownMain>
    );
};

export default Dropdown;
