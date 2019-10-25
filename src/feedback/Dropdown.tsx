import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import useKeyDown from "../hooks/useKeyDown";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Theme from "../styles";
import Keyboard from "../utils/Keyboard";
import StyleSheet from "../styles/StyleSheet";

type Placements = "right" | "left";
type Trigger = "onClick" | "onHover" | "onContextMenu";
type Props = {
    contentProps?: React.DetailedHTMLProps<any, HTMLDivElement>;
    position?: Placements;
    children: React.ReactNode;
    triggers?: Trigger[];
    itens: React.ReactChild;
    onShow?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => any;
};

type Callback = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;

type ContentProps = HTMLDivElement & { position: Placements };

const DropdownMain = styled.span`
    position: relative;
    display: inline-block;
    text-decoration: none;
`;

const DropdownContent = styled.div.attrs(({ position = "left", ...props }: ContentProps) => ({ ...props, position }))`
    display: none;
    position: absolute;
    ${(props: Props) => props.position}: 0;
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

const Dropdown = ({ children, position = "left", contentProps, onShow, itens, triggers = ["onClick"] }: Props) => {
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
            <DropdownContent {...contentProps} position={position} ref={ref}>
                {itens}
            </DropdownContent>
        </DropdownMain>
    );
};

export default Dropdown;
