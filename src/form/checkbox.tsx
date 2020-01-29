import { Colors } from "lego";
import React from "react";
import styled from "styled-components";
import { Fade } from '../animation/styled-animations';

const Label = styled.label`
	cursor: pointer;
	position: relative;
	padding: 0 1rem;
	margin-bottom: 0;
	font-size: 1rem;
	user-select: none;

	& input {
		cursor: pointer;
		opacity: 0;
		height: 0;
		width: 0;
	}

	.checkmark {
		border-radius: 0.2rem;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: ${Colors.disabledLight};
	}

	&:hover input ~ .checkmark {
		background-color: ${Colors.disabled};
	}

	& input:checked ~ .checkmark {
		background-color: ${(props: any) => props.color};
	}

	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	& input:checked ~ .checkmark:after {
		display: block;
	}

	& .checkmark:after {
		left: 0.4rem;
		top: 0.2rem;
		width: 0.35rem;
		height: 0.625rem;
		border: solid ${(props: any) => props.checkColor};
		border-width: 0 0.1rem 0.1rem 0;
		transform: rotate(40deg);
		animation: ${Fade} 450ms cubic-bezier(0.28, 0.65, 0.64, 0.95);
	}

	@keyframes fade {

	}
`;

type OmitValue = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value">;
type OmitOnChange = Omit<OmitValue, "onChange">;
type OmitOnClick = Omit<OmitOnChange, "onClick">;

type EventCustom = EventTarget & {
	target: { name: string; value: boolean; checked: boolean; stopPropagation(): void; persist(): void };
};
export type CheckboxTrigger = React.MouseEvent<HTMLInputElement, MouseEvent> & EventCustom & React.InputHTMLAttributes<any>;
type Props = OmitOnClick & {
	round?: boolean;
	checkColor?: string;
	value?: boolean;
	labelClassName?: string;
	name: string;
	onChange?(event: CheckboxTrigger): any;
	onClick?(event: CheckboxTrigger): any;
};

const nullFn = () => {};

const Checkbox = ({
	checkColor = Colors.lightLight,
	color = Colors.primary,
	onChange,
	onClick,
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
		//@ts-ignore
		<Label className={`${labelClassName} pointer`} color={color} checkColor={checkColor}>
			<input
				{...html}
				name={name}
				type="checkbox"
				onChange={change}
				//@ts-ignore
				value={checkedValue}
				checked={checkedValue}
				aria-checked={valString}
			/>
			<span className="checkmark" role="checkbox" aria-checked={valString} /> {children}
		</Label>
	);
};

export default Checkbox;
