import { Colors } from "lego";
import React from "react";
import styled from "styled-components";
import { Fade } from '../animation/styled-animations';

const Label = styled.label`
	cursor: pointer;
	position: relative;
	padding: 0 0.8rem;
	margin-bottom: 0;
	font-size: 1rem;
	user-select: none;

	& input {
		opacity: 0;
		cursor: pointer;
		position: absolute;
	}

	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: transparent;
		border: 2px solid ${Colors.disabled};
	}

	&:hover input ~ .checkmark {
		background-color: transparent;
		border: 2px solid ${Colors.disabled};
	}

	& input:checked ~ .checkmark {
		background-color: transparent;
		border: 2px solid ${(props) => props.color};
	}

	.checkmark:after {
		content: "";
		display: none;
		position: absolute;
	}

	& input:checked ~ .checkmark:after {
		display: block;
	}

	& .checkmark:after {
		top: 1px;
		left: 1px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		animation: ${Fade} 500ms ease-out;
		text-rendering: geometricPrecision;
		background: ${(props: any) => props.color};
	}
`;

type OmitValue = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value">;
type OmitOnChange = Omit<OmitValue, "onChange">;
type OmitOnClick = Omit<OmitOnChange, "onClick">;

type EventCustom = EventTarget & {
	target: { name: string; value: boolean; checked: boolean; stopPropagation(): void; persist(): void };
};
export type RadioboxTrigger = React.MouseEvent<HTMLInputElement, MouseEvent> & EventCustom & React.InputHTMLAttributes<any>;
type Props = OmitOnClick & {
	round?: boolean;
	checkColor?: string;
	value?: boolean;
	labelClassName?: string;
	name: string;
	onChange?(event: RadioboxTrigger): any;
	onClick?(event: RadioboxTrigger): any;
};

const nullFn = () => {};

const Radiobox = ({
	checkColor = Colors.lightLight,
	color = Colors.primary,
	onChange,
	onClick,
	className = "",
	value = false,
	checked = false,
	children,
	labelClassName = "",
	name,
	...html
}: Props) => {
	const triggerEvent = onClick || onChange || nullFn;
	const checkedValue = !!(value || checked);
	const valString = `${checkedValue}` as "false" | "true";
	const change = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		const isChecked = !checkedValue;
		return triggerEvent({
			...event,
			//@ts-ignore
			target: { ...event.target, name, value: isChecked },
			stopPropagation: event.stopPropagation,
			persist: event.persist
		});
	};
	return (
		<Label className={`pointer`} color={color}>
			<input {...html} name={name} type="radio" onChange={change} checked={checkedValue} aria-checked={valString} />
			<span className="checkmark" role="checkbox" aria-checked={valString} /> <span className={`${labelClassName}`}>{children}</span>
		</Label>
	);
};

export default Radiobox;
