import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import useKeyDown from "../hooks/useKeyDown";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Theme from "../styles";
import Keyboard from "../utils/Keyboard";
import StyleSheet from "../utils/StyleSheet";

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
    itens: React.ReactNode;
    onShow?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any;
};

type Callback = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;

const triggerRemap = (x: Trigger): { name: string; callback: Callback } => {
    if (x === "onHover") {
        return {
            name: "onMouseOver",
            callback: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                e.persist();
                e.stopPropagation();
            }
        };
    }
    if (x === "onContextMenu") {
        return {
            name: "onContextMenu",
            callback: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                e.persist();
                e.preventDefault();
                e.stopPropagation();
            }
        };
    }
    return {
        name: "onClick",
        callback: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            e.persist();
            e.stopPropagation();
        }
    };
};

const viewDisplay = "block";

const Dropdown = ({ children, onShow, itens, triggers = ["onClick"] }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const click = (callback: Callback) => (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        show();
        callback(event);
        if (!!onShow) {
            onShow(event);
        }
    };

    const triggerEvents = useMemo(
        () => triggers.map(triggerRemap).reduce((acc, el) => ({ ...acc, [el.name]: click(el.callback) }), {}),
        triggers
    );

    const hide = () => {
        if (ref.current !== null) {
            ref.current!.style.display = "none";
        }
    };

    const show = () => {
        if (ref.current !== null) {
            ref.current!.style.display = viewDisplay;
        }
    };

    useOnClickOutside(ref, hide);

    useKeyDown((e) => {
        if (e.keyCode === Keyboard.esc) {
            hide();
        }
    });

    return (
        <DropdownMain {...triggerEvents}>
            {children}
            <DropdownContent ref={ref}>{itens}</DropdownContent>
        </DropdownMain>
    );
};

export default Dropdown;
