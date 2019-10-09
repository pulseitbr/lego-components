import React from "react";
import { TypeContainer } from "../base";
declare type Props = {
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
    maskPaddingVertical?: string;
    footerProps?: Partial<TypeContainer>;
} & React.HTMLAttributes<HTMLDivElement>;
declare const Modal: ({ visible, width, footer, onClose, maskPaddingVertical, headerProps, bodyProps, footerProps, title, closeOnEsc, children, animationTime }: Props) => JSX.Element;
export default Modal;
