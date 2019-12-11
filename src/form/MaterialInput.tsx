import { Colors } from "lego";
import React, { useImperativeHandle, useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styled from "styled-components";
import Loader from "../loader/Loader";
import Input, { InputTypes, MaskInputProps } from "./Input";

type Props = {
	className?: string;
	divClassName?: string;
	divColor?: string;
	fontSize?: number;
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
	size: number;
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
	margin-bottom: 2.8125rem;
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
		font-size: ${(props) => props.size * 1.1}rem;
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
		height: 1px;
		width: 0;
		bottom: 1px;
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

const iconStyle = { color: Colors.primaryLight };

const MaterialInput = React.forwardRef(
	(
		{
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
			message,
			name,
			placeholder = "",
			type = "text",
			value = "",
			viewPasswordIcon = <MdVisibility style={iconStyle} />,
			...inputHtml
		}: FloatInputType,
		externalRef
	) => {
		const [stateType, setType] = useState(type);
		const internalRef = useRef<HTMLInputElement>(null);
		useImperativeHandle(externalRef, () => internalRef.current);

		const toggle = () => setType(changeType(stateType, type) as InputTypes);

		const labelInternalStyle = {
			width: "100%",
			color: labelColor,
			cursor: disabled ? "not-allowed" : "pointer",
			...labelStyle
		};

		const containerProps = { style: divStyle, className: divClassName, size: fontSize };
		const internalInputStyle = { cursor: disabled ? "not-allowed" : "pointer", ...inputHtml.style };

		const inputCommonProps = {
			className: `${className}${disabled ? " not-allowed" : ""}`,
			style: internalInputStyle,
			name,
			id: name,
			value,
			mask: maskType,
			disabled,
			ref: internalRef
		};

		if (type === "password") {
			return (
				<MaterialContainer {...containerProps}>
					<Input {...inputHtml} {...inputCommonProps} type={stateType} />
					<span className="bar" />
					<label style={labelInternalStyle} title={placeholder} htmlFor={name} className={labelClassName}>
						{placeholder}
					</label>
					<RightIcons>
						{loading && <Loader size={0.9} border={0.075} color={loaderColor} />}
						<EyePassword disabled={disabled} type="button" onClick={toggle}>
							{(stateType === "password" && viewPasswordIcon) || hidePasswordIcon}
						</EyePassword>
					</RightIcons>
					{!!message && <small>{message}</small>}
				</MaterialContainer>
			);
		}

		return (
			<MaterialContainer {...containerProps}>
				<Input {...inputHtml} {...inputCommonProps} usePlaceholder={false} />
				<span className="bar" />
				<label className={labelClassName} htmlFor={name} style={labelInternalStyle} title={placeholder}>
					{placeholder}
				</label>
				<RightIcons>{loading && <Loader size={0.9} border={0.075} color={loaderColor} />}</RightIcons>
				{!!message && <small>{message}</small>}
			</MaterialContainer>
		);
	}
);

export default MaterialInput;
