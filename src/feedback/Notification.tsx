// @ts-ignore
import RcNotify from "rc-notification";
import React from "react";
import themes, { NotifyTheme } from "./feedback-utils/themes";
import positions from "./feedback-utils/positions";
import { MdInfoOutline } from "react-icons/md";

const notificationInstance: { [key: string]: any } = {};
const prefixCls = "notify";

// tslint:disable-next-line: prefer-const
let defaultGetContainer: () => HTMLElement;

function instanceNotify(placement: string, callback: (n: any) => void): any {
    const cacheKey = `${prefixCls}-${placement}`;
    if (notificationInstance[cacheKey]) {
        callback(notificationInstance[cacheKey]);
        return;
    }
    return RcNotify.newInstance(
        {
            prefixCls,
            style: positions[placement],
            getContainer: defaultGetContainer
        },
        (notification: any) => {
            notificationInstance[cacheKey] = notification;
            callback(notification);
        }
    );
}

const destroy = (canDestroy: boolean) =>
    canDestroy
        ? Object.keys(notificationInstance).forEach((cacheKey) => {
              notificationInstance[cacheKey].destroy();
              delete notificationInstance[cacheKey];
          })
        : null;

export type NotifyType = {
    always?: boolean;
    center?: boolean;
    children: string | React.ReactNode;
    clickClose?: boolean;
    closable?: boolean;
    containerClass?: string;
    duration?: number | null;
    hasIcon?: boolean;
    icon?: string;
    maxNotifications?: number;
    onClick?: Function;
    onClose?: Function;
    position?: "default" | "center" | "topLeft" | "topCenter" | "bottomRight" | "bottomLeft" | "bottomCenter";
    style?: React.CSSProperties;
    theme?: "info" | "success" | "warn" | "danger" | "default" | "dark" | NotifyTheme;
    title: string | React.ReactNode;
    titleClassName?: string;
};

const getTitle = (props: NotifyType & { styles: any }) => {
    if (typeof props.title === "string") {
        if (props.title !== "") {
            return (
                <div className={`${prefixCls}-description f4 mb2 ${props.titleClassName || ""}`}>
                    {props.hasIcon && (
                        <div className="mb2" style={{ color: props.styles.icon.color }}>
                            {(!!props.icon && props.icon) || (
                                <MdInfoOutline
                                    style={{
                                        fontSize: "0.95em",
                                        color: props.styles.icon.color
                                    }}
                                    type="info-circle"
                                />
                            )}{" "}
                            {props.title}
                        </div>
                    )}
                </div>
            );
        }
    }
    return props.title;
};

export function Notification({
    hasIcon = true,
    clickClose = false,
    maxNotifications = 6,
    duration = 5,
    containerClass = "",
    onClick = () => {},
    onClose = () => {},
    position = "default",
    always = false,
    center = false,
    closable = true,
    icon,
    theme = "default",
    titleClassName = "",
    ...props
}: NotifyType) {
    const styles = typeof theme === "string" ? themes(theme) : theme;
    const title = getTitle({ ...props, hasIcon, theme, styles, icon });
    const click = () => {
        destroy(clickClose);
        onClick();
    };
    return instanceNotify(position, (notification: any) =>
        notification.notice({
            duration: always ? 0 : duration,
            maxCount: maxNotifications,
            onClose,
            closable,
            style: { right: "50%", ...props.style, ...styles.box, textAlign: center ? "center" : "inherit" },
            content: (
                <div role="alert" onClick={click} style={{ zIndex: Number.MAX_SAFE_INTEGER }}>
                    {title}
                    <div style={{ textAlign: center ? "center" : "inherit" }} className={`${prefixCls}-description tc center ${containerClass}`}>
                        {props.children}
                    </div>
                </div>
            )
        })
    );
}

Notification.error = (props: NotifyType) =>
    Notification({
        theme: "danger",
        ...props
    });

Notification.success = (props: NotifyType) =>
    Notification({
        theme: "success",
        ...props
    });

Notification.info = (props: NotifyType) =>
    Notification({
        theme: "info",
        ...props
    });

Notification.warn = (props: NotifyType) =>
    Notification({
        theme: "warn",
        ...props
    });

Notification.danger = (props: NotifyType) =>
    Notification({
        theme: "danger",
        ...props
    });

export default Notification;
