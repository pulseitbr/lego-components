import { Colors, Uuid } from "lego";
import React, { useImperativeHandle, useRef, useState, CSSProperties } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styled from "styled-components";
import Loader from "../loader/loader";
import Input, { InputTypes, MaskInputProps } from "./input";
import { zIndex } from "../styles/style-sheet";
import { InputHighlight } from "../animation/styled-animations";

type Props = {
	lineAnimationTime?: number;
	rightIcons?: React.ReactNode;
	className?: string;
	divClassName?: string;
	divColor?: string;
	fontSize?: number;
	borderBottomActiveColor?: string;
	borderBottomColor?: string;
	divStyle?: React.CSSProperties;
	error?: boolean;
	hidePasswordIcon?: React.ReactNode;
	inputClassName?: string;
	inputColor?: string;
	inputErrorColor?: string;
	labelClassName?: string;
	labelColor?: string;
	labelStyle?: React.CSSProperties;
	loaderColor?: string;
	loading?: boolean;
	mainColor?: string;
	message?: React.ReactNode;
	name: string;
	viewPasswordIcon?: React.ReactNode;
	iconContainerProps?: Partial<{ className: string; style: CSSProperties }>;
};

type WrapperType = {
	borderBottomColor: string;
	borderBottomActiveColor: string;
	labelColor: string;
	size: number;
	transition: number;
};

const RightIcons = styled.span`
	background: none;
	border: none;
	position: absolute;
	right: 1rem;
	top: 10px;
	z-index: ${zIndex.two};
	cursor: pointer;
`;

const EyePassword = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const MaterialContainer = styled.div.attrs(
	({
		borderBottomActiveColor = Colors.primaryLight,
		labelColor = Colors.darkAlpha,
		borderBottomColor = Colors.darkLightest,
		size = 1,
		...props
	}: WrapperType) => ({
		...props,
		size,
		labelColor,
		borderBottomColor,
		borderBottomActiveColor
	})
)`
	width: 100%;
	position: relative;
	background-color: transparent;

	input {
		background-color: transparent;
		font-size: ${(props) => 1.4 * props.size}rem;
		padding: 1rem 0 0 0;
		display: block;
		width: 100%;
		border: none;
		border-bottom: 1px solid ${(props) => props.borderBottomColor};
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	input:focus {
		outline: none;
	}

	label {
		color: ${(props) => props.labelColor};
		font-size: ${(props) => props.size * 1.05}rem;
		font-weight: normal;
		position: absolute;
		pointer-events: none;
		top: 1.25rem;
		transition: 400ms ease all;
	}

	input:focus ~ label,
	input:not([value=""]) ~ label {
		top: -0.25rem;
		font-size: 0.75rem;
		color: ${(props) => props.borderBottomActiveColor};
	}

	.bar {
		position: relative;
		display: block;
		width: 100%;
	}

	.bar:before,
	.bar:after {
		content: "";
		height: 1px;
		width: 0;
		bottom: 1px;
		position: absolute;
		background: ${(props) => props.borderBottomActiveColor};
		transition: ${(props) => props.transition}ms ease all;
	}

	.bar:before {
		left: 50%;
	}

	.bar:after {
		right: 50%;
	}

	input:focus ~ .bar:before,
	input:focus ~ .bar:after {
		width: 50%;
	}

	.highlight {
		position: absolute;
		height: 1px;
		width: 100%;
		top: 25%;
		left: 0;
		pointer-events: none;
		opacity: 0.5;
	}

	input:focus ~ .highlight {
		animation: ${(props) => InputHighlight(props.borderBottomActiveColor)} ${(props) => props.transition}ms ease;
	}
`;

type FloatInputType = React.InputHTMLAttributes<HTMLInputElement> & Props & MaskInputProps;

const changeType = (type: InputTypes, prev: string) => (type === "password" && type === prev ? "text" : "password");

const iconStyle = { color: Colors.primaryLight };

const MaterialInput = React.forwardRef(
	(
		{
			rightIcons = null,
			className = "",
			disabled = false,
			fontSize = 1,
			divClassName = "",
			divStyle = {},
			hidePasswordIcon = <MdVisibilityOff style={iconStyle} />,
			labelClassName = "",
			labelColor = Colors.primaryLight,
			labelStyle,
			loaderColor = Colors.primary,
			loading = false,
			mask: maskType,
			borderBottomActiveColor,
			borderBottomColor,
			message,
			name,
			placeholder = "",
			lineAnimationTime = 500,
			type = "text",
			value = "",
			iconContainerProps,
			viewPasswordIcon = <MdVisibility style={iconStyle} />,
			...inputHtml
		}: FloatInputType,
		externalRef
	) => {
		const [id] = useState(`${name}-${Uuid()}`);
		const [stateType, setType] = useState(type);
		const internalRef = useRef<HTMLInputElement>(null);
		useImperativeHandle(externalRef, () => internalRef.current);

		const toggle = () => setType(changeType(stateType, type) as InputTypes);

		const labelInternalStyle: CSSProperties = {
			userSelect: "text" as "text",
			width: "100%",
			color: labelColor,
			cursor: disabled ? "not-allowed" : "pointer",
			...labelStyle
		};

		const containerProps = {
			style: divStyle,
			className: divClassName,
			size: fontSize,
			transition: lineAnimationTime,
			borderBottomActiveColor,
			borderBottomColor
		};
		const internalInputStyle = { cursor: disabled ? "not-allowed" : "pointer", ...inputHtml.style };

		const inputCommonProps = {
			className: `${className}${disabled ? " not-allowed" : ""}`,
			style: internalInputStyle,
			name,
			id,
			value,
			mask: maskType,
			disabled,
			ref: internalRef
		};

		const Label = (
			<label style={labelInternalStyle} title={placeholder} htmlFor={id} className={labelClassName}>
				{placeholder}
			</label>
		);

		const messageComponent = !!message ? <small>{message}</small> : null;

		const loader = loading ? <Loader size={0.9} border={0.075} color={loaderColor} /> : null;

		if (type === "password") {
			return (
				<MaterialContainer {...containerProps}>
					<Input {...inputHtml} {...inputCommonProps} type={stateType} />
					<span className="bar" />
					{Label}
					<RightIcons {...iconContainerProps}>
						{rightIcons}
						{loader}
						<EyePassword disabled={disabled} type="button" onClick={toggle}>
							{stateType === "password" ? viewPasswordIcon : hidePasswordIcon}
						</EyePassword>
					</RightIcons>
					{messageComponent}
				</MaterialContainer>
			);
		}

		return (
			<MaterialContainer {...containerProps}>
				<Input {...inputHtml} {...inputCommonProps} type={type} usePlaceholder={false} />
				<span className="bar" />
				{Label}
				<RightIcons {...iconContainerProps}>
					{rightIcons}
					{loader}
				</RightIcons>
				{messageComponent}
			</MaterialContainer>
		);
	}
);

export default MaterialInput;
