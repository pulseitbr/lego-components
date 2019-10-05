import { invert } from "polished";
import React, { CSSProperties, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { TypeContainer, View } from "../base";
import Theme from "../styles";
import Portal from "../utils/Portal";

const ModalPortal = styled.div.attrs((props: any) => ({ ...props, visible: !!props.visible ? "block" : "none", speed: props.speed }))`
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

type Content = ThemedStyledFunction<"div", any, any, any> & { width: string | number };

const ModalContent = styled.div.attrs((props: Content) => ({
    ...props,
    width: props.width
}))`
    background-color: #fefefe;
    margin: auto;
    min-width: 360px;
    max-width: 100%;
    width: ${(props) => props.width};
    border: 1px solid ${Theme.darkAlpha};
    /* top: 50%; */
    /* left: 50%; */
`;

const Close = styled.span`
    color: ${(props) => props.color};
    margin-top: -10px;
    font-size: 1.35rem;
    font-weight: bold;
    float: right;

    &:hover,
    &:focus {
        color: ${(props) => invert(props.color!)};
        text-decoration: none;
        cursor: pointer;
    }
`;

type Props = {
    title?: React.ReactNode;
    visible?: boolean;
    children: React.ReactNode;
    animationTime?: number;
    width?: string | number;
    headerProps?: Partial<TypeContainer>;
    bodyProps?: Partial<TypeContainer>;
    closeOnEsc?: boolean;
    footerProps?: Partial<TypeContainer>;
} & React.HTMLAttributes<HTMLDivElement>;

const defaultModalPartProps = {
    span: "100%",
    style: {
        padding: "1rem"
    } as CSSProperties
} as Partial<TypeContainer>;

const Modal = ({
    visible = false,
    width = "60%",
    headerProps = defaultModalPartProps,
    bodyProps = defaultModalPartProps,
    footerProps = defaultModalPartProps,
    title,
    closeOnEsc = true,
    children,
    animationTime = 950
}: Props) => {
    const [visibility, setVisibility] = useState(!!visible);
    const toggleVisibility = (e: any) => {
        if (e.key === "Escape" && closeOnEsc) {
            setVisibility(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", toggleVisibility);
        return () => window.removeEventListener("keydown", toggleVisibility);
    }, []);

    useEffect(() => {
        setVisibility(!!visible);
    }, [visible]);

    const onClickMask = (e: any) => {
        e.stopPropagation();
        // setVisibility(false);
        // if (props.onClick) {
        //     props.onClick(e);
        // }
    };

    const onModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        event.stopPropagation();
    };

    const headerViewProps = {
        ...headerProps,
        style: { ...defaultModalPartProps.style, ...headerProps.style, borderBottom: `1px solid ${Theme.darkAlpha}` }
    };
    const bodyViewProps = { ...bodyProps, style: { ...defaultModalPartProps.style, ...bodyProps.style } };
    const footerViewProps = { ...footerProps, style: { ...defaultModalPartProps.style, ...footerProps.style } };

    return (
        <Portal>
            <ModalPortal onClick={onClickMask} visible={visibility} speed={animationTime}>
                <ModalContent onClick={onModalClick} width={width}>
                    <View {...headerViewProps}>
                        <Close color="#121212">
                            <MdClose />
                        </Close>
                        {title}
                    </View>
                    <View {...bodyViewProps}>{children}</View>
                    <View {...footerViewProps}>Footer</View>
                </ModalContent>
            </ModalPortal>
        </Portal>
    );
};

export default Modal;
