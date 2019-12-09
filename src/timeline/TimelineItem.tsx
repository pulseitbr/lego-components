import React, { FunctionComponent } from "react";
import { timelineTestBorder } from "./";

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
	className = "",
	color = "primary",
	children,
	pending = false,
	isLast = false,
	position = "",
	dot,
	...restProps
}) => {
	const prefixCls = "timeline";
	const itemClassName = `${prefixCls}-item ${pending ? `${prefixCls}-item-pending` : ""}`;

	const dotClassName = `${`${prefixCls}-item-head`} ${dot ? `${prefixCls}-item-head-custom` : ""} ${prefixCls}-item-head-${color}`;

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
