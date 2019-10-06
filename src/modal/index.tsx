import { lighten } from "polished";
import React, { CSSProperties, useEffect } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { TypeContainer, View } from "../base";
import Theme from "../styles";
import Portal from "../utils/Portal";

const lightenClose = lighten(0.6);

const ModalPortal = styled.div.attrs((props: any) => ({ ...props, visible: !!props.visible ? "block" : "none", speed: props.speed }))`
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    padding-top: 3rem;
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
`;

const Close = styled.span`
    color: ${(props) => props.color};
    font-size: 1.35rem;
    font-weight: bold;
    margin-top: -10px;
    float: right;

    &:hover,
    &:focus {
        color: ${(props) => lightenClose(props.color!)};
        text-decoration: none;
        cursor: pointer;
    }
`;

type Props = {
    onClose: () => any;
    title?: React.ReactNode;
    footer?: React.ReactNode;
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
    footer,
    onClose,
    headerProps = defaultModalPartProps,
    bodyProps = defaultModalPartProps,
    footerProps = defaultModalPartProps,
    title,
    closeOnEsc = true,
    children,
    animationTime = 950
}: Props) => {
    const toggleVisibility = (e: any) => {
        if (e.key === "Escape" && closeOnEsc) {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", toggleVisibility);
        return () => window.removeEventListener("keydown", toggleVisibility);
    }, []);

    const onClickMask = (e: any) => {
        e.stopPropagation();
        onClose();
    };

    const onModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.persist();
        event.stopPropagation();
    };

    const headerViewProps = {
        ...headerProps,
        style: { borderBottom: `1px solid ${Theme.darkAlpha}`, ...defaultModalPartProps.style, ...headerProps.style }
    };
    const bodyViewProps = { ...bodyProps, style: { ...defaultModalPartProps.style, ...bodyProps.style } };
    const footerViewProps = { ...footerProps, style: { textAlign: "right" as "right", ...defaultModalPartProps.style, ...footerProps.style } };

    return (
        <Portal>
            <ModalPortal onClick={onClickMask} visible={visible} speed={animationTime}>
                <ModalContent onClick={onModalClick} width={width}>
                    <View {...headerViewProps}>
                        <Close color="#121212" onClick={onClose}>
                            <MdClose />
                        </Close>
                        {title}
                    </View>
                    <View {...bodyViewProps}>{children}</View>
                    {!!footer && <View {...footerViewProps}>{footer}</View>}
                </ModalContent>
            </ModalPortal>
        </Portal>
    );
};

export default Modal;
