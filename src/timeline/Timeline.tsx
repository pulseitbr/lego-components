import classNames from "classnames";
import React, { Component, Fragment, FunctionComponent } from "react";
import TimelineItem, { TimeLineItemProps } from "./TimelineItem";
import { MdSync } from "react-icons/md";

export type TimelineProps = {
    className?: string;
    pending?: React.ReactNode;
    pendingDot?: React.ReactNode;
    style?: React.CSSProperties;
    reverse?: boolean;
    mode?: "left" | "alternate" | "right";
};

const customizePrefixCls = "timeline";
const rightItem = "timeline-item-right";
const leftItem = "timeline-item-left";
const isLast = (items: number, index: number) => (items - 1 === index ? "timeline-item-last" : "");

export default class Timeline extends Component<TimelineProps, any> {
    public static Item: FunctionComponent<TimeLineItemProps> = TimelineItem;
    public static defaultProps = {
        reverse: false,
        mode: ""
    };

    public renderTimeline = () => {
        const { pending = null, pendingDot, children, className, reverse, mode, ...restProps } = this.props;
        const prefixCls = customizePrefixCls;
        const pendingNode = typeof pending === "boolean" ? null : pending;
        const classString = classNames(
            prefixCls,
            {
                [`timeline-pending`]: !!pending,
                [`timeline-reverse`]: !!reverse,
                [`timeline-${mode}`]: !!mode
            },
            className
        );
        const pendingItem = !!pending ? (
            //@ts-ignore
            <TimelineItem pending={!!pending} dot={pendingDot || <MdSync />}>
                {pendingNode}
            </TimelineItem>
        ) : null;
        const timeLineItems = !!reverse
            ? [pendingItem, ...React.Children.toArray(children).reverse()]
            : [...React.Children.toArray(children), pendingItem];
        const getPositionCls = (el: React.ReactElement<any>, index: number) => {
            if (mode === "alternate") {
                if (el.props.position === "right") {
                    return rightItem;
                }
                if (el.props.position === "left") {
                    return leftItem;
                }
                return index % 2 === 0 ? leftItem : rightItem;
            }
            if (mode === "left") {
                return leftItem;
            }
            if (mode === "right") {
                return rightItem;
            }
            return el.props.position === "right" ? rightItem : "";
        };
        const truthyItems: any[] = timeLineItems.filter((item) => !!item);
        const listSize = React.Children.count(truthyItems);
        const items = React.Children.map(truthyItems, (el: React.ReactElement<any>, index) =>
            React.cloneElement(el, {
                className: classNames([el.props.className, isLast(listSize, index), getPositionCls(el, index)])
            })
        );
        return (
            <ul {...restProps} className={classString}>
                {items}
            </ul>
        );
    };

    public render() {
        return <Fragment>{this.renderTimeline()}</Fragment>;
    }
}
