import React from "react";
import { timelineTestBorder } from "./";

export type TimeLineItemProps = {
	className?: string;
	color?: string;
	dot?: React.ReactNode;
	pending?: boolean;
	position?: string;
	style?: React.CSSProperties;
	isLast?: boolean;
	children: React.ReactNode;
};

const TimelineItem = ({ color = "primary", isLast, children, pending = false, dot, ...restProps }: TimeLineItemProps) => {
	const prefixCls = "timeline";
	const itemClassName = `${prefixCls}-item ${pending ? `${prefixCls}-item-pending` : ""}`;
	const dotClassName = `${`${prefixCls}-item-head`} ${dot ? `${prefixCls}-item-head-custom` : ""} ${prefixCls}-item-head-${color}`;
	return (
		<li {...restProps} className={itemClassName}>
			{!isLast && <div className={`${prefixCls}-item-tail`} />}
			{isLast && <div className={`${prefixCls}-item-last`} />}
			<div className={dotClassName} style={{ borderColor: timelineTestBorder(color) }}>
				{dot}
			</div>
			<div className={`${prefixCls}-item-content`}>{children}</div>
		</li>
	);
};

export default TimelineItem;
