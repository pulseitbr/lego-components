import { timelineTestBorder } from "./";
import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type TimeLineItemProps = {
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    position?: string;
    style?: React.CSSProperties;
    isLast?: boolean;
};

const TimelineItem: FunctionComponent<TimeLineItemProps> = ({
    className,
    color = "primary",
    children,
    pending = false,
    isLast = false,
    position = "",
    dot,
    ...restProps
}) => {
    const prefixCls = "timeline";
    const itemClassName = classNames(
        {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-pending`]: pending
        },
        className
    );

    const dotClassName = classNames({
        [`${prefixCls}-item-head`]: true,
        [`${prefixCls}-item-head-custom`]: dot,
        [`${prefixCls}-item-head-${color}`]: true
    });

    return (
        <li {...restProps} className={itemClassName}>
            {!isLast && <div className={`${prefixCls}-item-tail`} />}
            <div className={dotClassName} style={{ borderColor: timelineTestBorder(color) }}>
                {dot}
            </div>
            <div className={`${prefixCls}-item-content`}>{children}</div>
        </li>
    );
};

export default TimelineItem;
