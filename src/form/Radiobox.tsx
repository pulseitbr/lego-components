import Theme from "../styles";
import React from "react";
import styled from "styled-components";

const Label = styled.label`
	cursor: pointer;
	position: relative;
	padding: 0 1rem;
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
		height: 1.2rem;
		width: 1.2rem;
		background-color: #eee;
		border-radius: 50%;
	}

	&:hover input ~ .checkmark {
		background-color: #ccc;
	}

	& input:checked ~ .checkmark {
		background-color: ${(props) => props.color};
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
		top: 5.2px;
		left: 5.2px;
		width: 8px;
		height: 8px;
		animation: fade 1250ms ease-out;
		border-radius: 50%;
		background: ${(props: any) => props.checkColor};
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		40% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}
`;

type OmitValue = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value">;
type OmitOnChange = Omit<OmitValue, "onChange">;
type OmitOnClick = Omit<OmitOnChange, "onClick">;

type EventCustom = EventTarget & {
	target: { name: string; value: boolean; checked: boolean; stopPropagation(): void; persist(): void };
};
export type RadioboxTrigger = React.MouseEvent<HTMLInputElement, MouseEvent> &
	EventCustom &
	React.InputHTMLAttributes<any>;
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
	checkColor = Theme.lightLight,
	color = Theme.primary,
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
		//@ts-ignore
		<Label className={`${labelClassName} pointer`} color={color} checkColor={checkColor}>
			<input
				{...html}
				name={name}
				type="radio"
				onChange={change}
				checked={checkedValue}
				aria-checked={valString}
			/>
			<span className="checkmark" role="checkbox" aria-checked={valString} /> {children}
		</Label>
	);
};

export default Radiobox;
