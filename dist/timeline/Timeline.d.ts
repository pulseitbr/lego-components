import React, { Component, FunctionComponent } from "react";
import { TimeLineItemProps } from "./TimelineItem";
export declare type TimelineProps = {
    className?: string;
    pending?: React.ReactNode;
    pendingDot?: React.ReactNode;
    style?: React.CSSProperties;
    reverse?: boolean;
    mode?: "left" | "alternate" | "right";
};
export default class Timeline extends Component<TimelineProps, any> {
    static Item: FunctionComponent<TimeLineItemProps>;
    static defaultProps: {
        reverse: boolean;
        mode: string;
    };
    renderTimeline: () => JSX.Element;
    render(): JSX.Element;
}
