import React, { useEffect } from "react";
import styled from "styled-components";
import Portal from "../utils/Portal";
import { useRef } from "react";

type PropsPortal = {
    speed: number;
    visible: boolean;
};

const ModalPortal = styled.div.attrs((props: PropsPortal) => ({
    ...props,
    speed: props.speed || 500,
    visible: !!props.visible ? "block" : "none"
}))`
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    transition: 550ms;
    display: ${(props: any) => props.visible};
    background-color: rgba(0, 0, 0, 0.65);
    animation: fading ${(props: PropsPortal) => props.speed}ms forwards ease-out;

    @keyframes fading {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const DrawerContainer = styled.div`
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    height: 100%;
    max-height: 100%;
    width: 0;
    transition: 550ms ease-out;
`;

type Props = {
    visible?: boolean;
    size?: string | number;
    children: React.ReactNode;
};

const Drawer = ({ visible, size = "60%", children }: Props) => {
    const ref = useRef(null) as any;

    useEffect(() => {
        if (ref.current !== null) {
            if (visible) {
                ref.current!.style.width = size;
            } else {
                ref.current!.style.width = 0;
            }
        }
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <Portal>
            <ModalPortal visible={visible}>
                <DrawerContainer ref={ref}>{children}</DrawerContainer>
            </ModalPortal>
        </Portal>
    );
};

export default Drawer;
