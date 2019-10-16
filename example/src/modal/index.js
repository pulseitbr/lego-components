import React, { useEffect } from "react";
import styled from "styled-components";
import { Portal } from "lego-components";
import { useRef } from "react";

const ModalPortal = styled.div.attrs((props) => ({
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
    display: ${(props) => props.visible};
    background-color: rgba(0, 0, 0, 0.65);
    animation: fading ${(props) => props.speed}ms forwards ease-out;

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
    position: absolute;
    display: block;
    max-width: 0;
    max-height: 100%;
    /* animation: max-height 1250ms forwards ease-out; */
    /* animation: max-width 1250ms forwards ease-out; */
`;

// type directions = "top" |"bottom" | "left" | "right"

const openDirections = {
    default: {
        originX: "right",
        originY: "top",
        animate: "max-width"
    },
    left: {
        originX: "left",
        originY: "top",
        animate: "max-width"
    }
};

const getReverseAnimation = (animation) => (animation === "maxWidth" ? "maxH2eight" : "maxWidth");

const Drawer = ({ visible, animation = "maxWidth", size = "60%" }) => {
    const ref = useRef(null);
    const reverseAnimation = getReverseAnimation(animation);

    useEffect(() => {
        if (!!ref.current && !visible) {
            ref.current.style.top = 0;
            ref.current.style.right = 0;
        }
    }, []);

    useEffect(() => {
        if (!!ref.current && visible) {
            ref.current.style.maxWidth = size;
            ref.current.style.width = size;
        } else if (!visible) {
            ref.current.style[animation] = 0;
        }
    }, [visible]);

    return (
        <Portal>
            <ModalPortal visible={visible}>
                <DrawerContainer ref={ref}>AEEEEEEEEEEEEEEEEEE</DrawerContainer>
            </ModalPortal>
        </Portal>
    );
};

export default Drawer;
