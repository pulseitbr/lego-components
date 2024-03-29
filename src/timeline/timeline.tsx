import React from "react";
import { MdSync } from "react-icons/md";
import TimelineItem from "./timeline-item";

export type TimelineProps = {
	className?: string;
	pending?: React.ReactNode;
	pendingDot?: React.ReactNode;
	style?: React.CSSProperties;
	reverse?: boolean;
	mode?: "left" | "alternate" | "right";
	children: React.ReactNode;
};

const customizePrefixCls = "timeline";
const rightItem = "timeline-item-right";
const leftItem = "timeline-item-left";
const isLast = (items: number, index: number) => items - 1 === index;

const setClassName = (mode: string, pending: boolean, reverse: boolean) => {
	if (pending) {
		return "timeline-pending";
	}
	if (reverse) {
		return "timeline-reverse";
	}
	if (!!mode) {
		return `timeline-${mode}`;
	}
	return "";
};

const Timeline = ({ reverse = false, mode = "left", pending = null, pendingDot, children, className = "", ...props }: TimelineProps) => {
	const prefixCls = customizePrefixCls;
	const pendingNode = typeof pending === "boolean" ? null : pending;
	const clsCompose = setClassName(mode, !!pending, !!reverse);
	const classString = `${prefixCls} ${clsCompose} ${className}}`;
	const pendingItem = !!pending ? (
		<TimelineItem isLast pending={!!pending} dot={pendingDot || <MdSync />}>
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
	const items = React.Children.map(truthyItems, (el: React.ReactElement<any>, index) => {
		const last = isLast(listSize, index);
		return React.cloneElement(el, {
			isLast: last,
			className: `${el.props.className || ""} ${isLast ? "timeline-item-last" : ""} ${getPositionCls(el, index)}`
		});
	});
	return (
		<ul {...props} className={classString}>
			{items}
		</ul>
	);
};

export default Timeline;
