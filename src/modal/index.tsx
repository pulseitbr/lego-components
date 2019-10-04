import React, { useEffect, useState } from "react";
import { Portal } from "react-portal";
import styled from "styled-components";
import { invert } from "polished";

const ModalPortal = styled.div.attrs((props: any) => {
    return { ...props, visible: !!props.visible ? "block" : "none", speed: props.speed };
})`
    display: ${(props) => props.visible};
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
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

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 1.2rem;
    min-width: 360px;
    max-width: 100%;
    width: 80%;
    border: 1px solid #888;
    top: 50%;
    left: 50%;
`;

const Close = styled.span`
    color: ${(props) => props.color};
    float: right;
    font-size: 28px;
    font-weight: bold;
    
    &:hover,
    &:focus {
        color: ${(props) => invert(props.color!)};
        text-decoration: none;
        cursor: pointer;
    }
`;

type Props = {
    visible?: boolean;
    children: React.ReactNode;
    animationTime?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const Modal = ({ visible = false, children, animationTime = 950, ...props }: Props) => {
    const [visibility, setVisibility] = useState(!!visible);

    useEffect(() => {
        setVisibility(!!visible);
    }, [visible]);

    const onClickMask = (e: any) => {
        setVisibility(false);
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <Portal>
            <ModalPortal onClick={onClickMask} visible={visibility} speed={animationTime}>
                <ModalContent>
                    <Close />
                    {children}
                </ModalContent>
            </ModalPortal>
        </Portal>
    );
};

export default Modal;
