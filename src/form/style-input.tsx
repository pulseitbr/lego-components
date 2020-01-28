import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Loader from "../loader/loader";
import Input, { InputTypes, MaskInputProps } from "./input";
import { Colors } from 'lego';

const onActive = "form-field__control form-field--is-active";
const onActiveError = "form-field__control form-field--is-active form-field__input-error";
const initialField = "form-field__control";
const initialFieldError = "form-field__control form-field__input-error";

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

type FloatInputType = React.InputHTMLAttributes<HTMLInputElement> & Props & MaskInputProps;

const changeType = (type: InputTypes, prev: string) => (type === "password" && type === prev ? "text" : "password");

const voidFn = () => "";

const StyleInput = React.forwardRef(
	(
		{
			className = "",
			disabled = false,
			divClassName = "",
			divStyle = {},
			error = false,
			hidePasswordIcon = <MdVisibility style={{ color: Colors.primaryLight }} />,
			labelClassName = "",
			labelColor = Colors.primaryLight,
			labelStyle,
			loaderColor = Colors.primary,
			loading = false,
			mask: maskType,
			message,
			name,
			onBlur = voidFn,
			onChange = voidFn,
			onFocus = voidFn,
			placeholder = "",
			type = "text",
			value = "",
			viewPasswordIcon = <MdVisibilityOff style={{ color: Colors.primaryLight }} />,
			...inputHtml
		}: FloatInputType,
		externalRef
	) => {
		const [field, setField] = useState(initialField);
		const [stateType, setType] = useState(type);
		const internalRef = useRef(null);
		useImperativeHandle(externalRef, () => internalRef.current);

		useEffect(() => {
			if (!!value || maskType === "currency") {
				return setField(`${initialField} ${onActive} ${divClassName}`);
			}
			if (value === "") {
				return setField(initialField);
			}
			if (error && value !== "") {
				return setField(`${initialFieldError} ${onActiveError} ${divClassName}`);
			}
			if (error && !!!value) {
				return setField(`${initialFieldError} ${divClassName}`);
			}
		}, [value, error, maskType, divClassName]);

		const blur = (e: React.FocusEvent<HTMLInputElement>) => {
			if (!e.target.value) {
				setField(error ? initialFieldError : initialField);
			}
			return onBlur(e);
		};

		const focus = (e: React.FocusEvent<HTMLInputElement>) => {
			setField(`${error ? onActiveError : onActive}`);
			return onFocus(e);
		};

		const change = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e);

		const toggle = () => setType(changeType(stateType, type) as InputTypes);

		if (type === "password") {
			return (
				<div style={divStyle} className={`${field} ${divClassName}`}>
					<label
						style={{
							width: "100%",
							color: labelColor,
							cursor: disabled ? "not-allowed" : "pointer",
							...labelStyle
						}}
						title={placeholder}
						htmlFor={name}
						className={`form-field__label ${labelClassName}`}
					>
						{placeholder}
					</label>
					<Input
						{...inputHtml}
						className={`form-field__input ${className}${disabled ? " not-allowed" : ""}`}
						disabled={disabled}
						id={name}
						mask={maskType}
						name={name}
						onBlur={blur}
						onChange={change}
						onFocus={focus}
						ref={internalRef}
						style={{ cursor: disabled ? "not-allowed" : "pointer", ...inputHtml.style }}
						type={stateType}
						value={value}
					/>
					<button disabled={disabled} type="button" onClick={toggle} className="toggle-password">
						{(stateType === "password" && viewPasswordIcon) || hidePasswordIcon}
					</button>
					{!!message && <small>{message}</small>}
				</div>
			);
		}

		return (
			<div style={divStyle} className={`${field} ${divClassName}`}>
				<label
					className={`form-field__label ${labelClassName}`}
					htmlFor={name}
					style={{ color: labelColor, width: "100%", ...labelStyle }}
					title={placeholder}
				>
					{placeholder}
				</label>
				<Input
					{...inputHtml}
					className={`form-field__input ${className}${disabled ? " not-allowed" : ""}`}
					disabled={disabled}
					ref={internalRef}
					id={name}
					mask={maskType}
					name={name}
					onBlur={blur}
					onChange={change}
					onFocus={focus}
					type={type}
					usePlaceholder={false}
					value={value}
				/>
				{loading && <Loader className="toggle-password" size={1.2} border={0.1} color={loaderColor} />}
				{!!message && <small>{message}</small>}
			</div>
		);
	}
);

export default StyleInput;
