import { Colors } from "lego";
import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styled from "styled-components";
import Loader from "../loader/Loader";
import Input, { InputTypes, MaskInputProps } from "./Input";

type Props = {
	className?: string;
	divClassName?: string;
	divColor?: string;
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
};

type WrapperType = {
	borderBottomColor: string;
	borderBottomActiveColor: string;
	labelColor: string;
};

const RightIcons = styled.span`
	background: none;
	border: none;
	position: absolute;
	right: 0.5rem;
	top: 10px;
	z-index: 5;
	cursor: pointer;
`;

const EyePassword = styled.button`
	background: none;
	border: none;
	cursor: pointer;
`;

const Wrapper = styled.div.attrs(
	({
		borderBottomActiveColor = Colors.primaryLight,
		labelColor = Colors.darkAlpha,
		borderBottomColor = Colors.darkLightest,
		...props
	}: WrapperType) => ({
		...props,
		labelColor,
		borderBottomColor,
		borderBottomActiveColor
	})
)`
	width: 100%;
	position: relative;
	margin-bottom: 2.8125rem;
	background-color: transparent;

	input {
		background-color: transparent;
		font-size: 1rem;
		padding: 1rem 0 0 0;
		display: block;
		width: 100%;
		border: none;
		border-bottom: 1px solid ${(props) => props.borderBottomColor};
	}

	input:focus {
		outline: none;
	}

	label {
		color: ${(props) => props.labelColor};
		font-size: 0.9rem;
		font-weight: bolder;
		position: absolute;
		pointer-events: none;
		top: 1.1rem;
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
		height: 1.5px;
		width: 0;
		bottom: 1.5px;
		position: absolute;
		background: ${(props) => props.borderBottomActiveColor};
		transition: 400ms ease all;
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
		animation: inputHighlighter 400ms ease;
	}

	@-webkit-keyframes inputHighlighter {
		from {
			background: ${(props) => props.borderBottomActiveColor};
		}
		to {
			width: 0;
			background: transparent;
		}
	}
	@-moz-keyframes inputHighlighter {
		from {
			background: ${(props) => props.borderBottomActiveColor};
		}
		to {
			width: 0;
			background: transparent;
		}
	}
	@keyframes inputHighlighter {
		from {
			background: ${(props) => props.borderBottomActiveColor};
		}
		to {
			width: 0;
			background: transparent;
		}
	}
`;

type FloatInputType = React.InputHTMLAttributes<HTMLInputElement> & Props & MaskInputProps;

const changeType = (type: InputTypes, prev: string) => (type === "password" && type === prev ? "text" : "password");

const voidFn = () => "";

const iconStyle = { color: Colors.primaryLight };

const MaterialInput = ({
	className = "",
	disabled = false,
	divClassName = "",
	divColor = Colors.primaryLight,
	divStyle = {},
	error = false,
	hidePasswordIcon = <MdVisibilityOff style={iconStyle} />,
	inputColor = Colors.primary,
	inputErrorColor = Colors.danger,
	labelClassName = "",
	labelColor = Colors.primaryLight,
	labelStyle,
	loaderColor = Colors.primary,
	loading = false,
	mainColor = Colors.primary,
	mask: maskType,
	message,
	name,
	onBlur = voidFn,
	onChange = voidFn,
	onFocus = voidFn,
	placeholder = "",
	type = "text",
	value = "",
	viewPasswordIcon = <MdVisibility style={iconStyle} />,
	...inputHtml
}: FloatInputType) => {
	const [stateType, setType] = useState(type);

	const change = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e);
	const toggle = () => setType(changeType(stateType, type) as InputTypes);

	if (type === "password") {
		return (
			<Wrapper className={divClassName}>
				<Input
					{...inputHtml}
					className={`${className}${disabled ? " not-allowed" : ""}`}
					disabled={disabled}
					id={name}
					mask={maskType}
					name={name}
					onChange={change}
					style={{ cursor: disabled ? "not-allowed" : "pointer", ...inputHtml.style }}
					type={stateType}
					value={value}
				/>
				<span className="bar" />
				<label
					style={{
						width: "100%",
						color: labelColor,
						cursor: disabled ? "not-allowed" : "pointer",
						...labelStyle
					}}
					title={placeholder}
					htmlFor={name}
					className={labelClassName}
				>
					{placeholder}
				</label>
				<RightIcons>
					{loading && <Loader size={0.9} border={0.075} color={loaderColor} />}
					<EyePassword disabled={disabled} type="button" onClick={toggle}>
						{(stateType === "password" && viewPasswordIcon) || hidePasswordIcon}
					</EyePassword>
				</RightIcons>
				{!!message && <small>{message}</small>}
			</Wrapper>
		);
	}

	return (
		<Wrapper style={divStyle} className={divClassName}>
			<Input
				{...inputHtml}
				className={`${className}${disabled ? " not-allowed" : ""}`}
				disabled={disabled}
				id={name}
				mask={maskType}
				name={name}
				onChange={change}
				type={type}
				usePlaceholder={false}
				value={value}
			/>
			<span className="bar" />
			<label
				className={labelClassName}
				htmlFor={name}
				style={{ color: labelColor, width: "100%", ...labelStyle }}
				title={placeholder}
			>
				{placeholder}
			</label>
			{loading && <Loader className="toggle-password" size={1.2} border={0.1} color={loaderColor} />}
			{!!message && <small>{message}</small>}
		</Wrapper>
	);
};

export default MaterialInput;
