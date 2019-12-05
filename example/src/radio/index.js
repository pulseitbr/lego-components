import { Colors } from "lego";
import React from "react";
import styled from "styled-components";

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
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: transparent;
		border: 0.1rem solid ${Colors.disabled};
	}

	&:hover input ~ .checkmark {
		background-color: transparent;
		border: 0.1rem solid ${Colors.disabled};
	}

	& input:checked ~ .checkmark {
		background-color: transparent;
		border: 0.1rem solid ${(props) => props.color};
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
		top: 0.08rem;
		left: 0.08rem;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 50%;
		animation: fade 500ms ease-out;
		text-rendering: geometricPrecision;
		background: ${(props) => props.color};
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
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
}) => {
	const triggerEvent = onClick || onChange || nullFn;
	const checkedValue = !!(value || checked);
	const valString = `${checkedValue}`;
	const change = (event) => {
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
		<Label className={`${labelClassName} pointer`} color={color}>
			<input {...html} name={name} type="radio" onChange={change} checked={checkedValue} aria-checked={valString} />
			<span className="checkmark" role="checkbox" aria-checked={valString} /> {children}
		</Label>
	);
};

export default Radiobox;
