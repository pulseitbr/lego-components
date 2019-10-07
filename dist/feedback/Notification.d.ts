import React from "react";
import { NotifyTheme } from "./feedback-utils/themes";
export declare type NotifyType = {
    closable?: boolean;
    center?: boolean;
    always?: boolean;
    children: string | React.ReactNode;
    clickClose?: boolean;
    duration?: number | null;
    hasIcon?: boolean;
    icon?: string;
    maxNotifications?: number;
    onClick?: Function;
    onClose?: Function;
    position?: "default" | "center" | "topLeft" | "topCenter" | "bottomRight" | "bottomLeft" | "bottomCenter";
    theme?: "info" | "success" | "warn" | "danger" | "default" | "dark" | NotifyTheme;
    style?: React.StyleHTMLAttributes<any>;
    title: string | React.ReactNode;
    titleClassName?: string;
    containerClass?: string;
};
export declare function Notification({ hasIcon, clickClose, maxNotifications, duration, containerClass, onClick, onClose, position, always, center, closable, theme, titleClassName, ...props }: NotifyType): any;
export declare namespace Notification {
    var error: (props: NotifyType) => any;
    var success: (props: NotifyType) => any;
    var info: (props: NotifyType) => any;
    var warn: (props: NotifyType) => any;
    var danger: (props: NotifyType) => any;
}
export default Notification;
