import React, { FunctionComponent } from "react";
export declare type TimeLineItemProps = {
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    position?: string;
    style?: React.CSSProperties;
    isLast?: boolean;
};
declare const TimelineItem: FunctionComponent<TimeLineItemProps>;
export default TimelineItem;
