import { Colors } from "@pulseitbr/lego";
import React, { Fragment, InputHTMLAttributes } from "react";
import styled from "styled-components";

type Props = {
	name: string;
	color?: string;
	round?: boolean;
	value?: boolean;
	animationTime?: number;
	dotCheckColor?: string;
	labelClassName?: string;
} & Omit<InputHTMLAttributes<any>, "value">;

type LabelType = { color: string; animationTime: number; dotCheckColor: string };

const Label = styled.label.attrs(({ color = Colors.primary, animationTime = 400, ...props }: LabelType) => ({
	...props,
	color,
	animationTime
}))`
	position: relative;
	display: inline-block;
	width: 2.25rem;
	height: 1rem;

	& input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: ${Colors.disabled};
		transition: ${(props) => props.animationTime}ms;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 0.8rem;
		width: 0.8rem;
		left: 0.15rem;
		bottom: 0.1rem;
		background-color: ${(props) => props.dotCheckColor};
		transition: ${(props) => props.animationTime}ms;
	}

	input:checked + .slider {
		background-color: ${(props) => props.color};
	}

	input:focus + .slider {
		box-shadow: 0 0 0px ${(props) => props.color};
	}

	input:checked + .slider:before {
		transform: translateX(1.2rem);
	}

	.slider.round {
		border-radius: 2rem;
	}

	.slider.round:before {
		border-radius: 50%;
	}
`;

const Switch = ({
	round = true,
	color = Colors.primary,
	onChange = () => {},
	animationTime = 400,
	className = "",
	labelClassName = "",
	name,
	children,
	value = false,
	dotCheckColor = Colors.lightLightest,
	checked = false,
	...html
}: Props) => {
	const isChecked = value || checked;
	const roundClassName = round ? "slider round" : "slider";
	const ariaChecked = value.toString() as "false" | "true";

	const change = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		const internalCheck = event.target.checked;
		return onChange({ ...event, target: { ...event.target, name, value: internalCheck } });
	};

	return (
		<Fragment>
			<Label dotCheckColor={dotCheckColor} className={labelClassName} color={color} animationTime={animationTime}>
				<input {...html} name={name} type="checkbox" onChange={change} checked={isChecked} aria-checked={ariaChecked} />
				<span className={roundClassName} />
			</Label>
			<span style={{ lineHeight: 1, marginLeft: "0.2rem" }}>{children}</span>
		</Fragment>
	);
};

export default Switch;
