import Loader from "../loader/Loader";
import Theme from "../styles";
import React, { useEffect, useState } from "react";
import Input, { InputTypes, MaskInputProps } from "./Input";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const onActive = "form-field__control form-field--is-active";
const onActiveError = "form-field__control form-field--is-active form-field__input-error";
const initialField = "form-field__control";
const initialFieldError = "form-field__control form-field__input-error";

type Props = {
    mainColor?: string;
    labelColor?: string;
    divColor?: string;
    inputColor?: string;
    inputErrorColor?: string;
    viewPasswordIcon?: React.ReactNode;
    hidePasswordIcon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
    divClassName?: string;
    divStyle?: React.CSSProperties;
    labelClassName?: string;
    labelStyle?: React.CSSProperties;
    name: string;
    error?: boolean;
    message?: React.ReactNode;
    loading?: boolean;
    loaderColor?: string;
};

type FloatInputType = React.InputHTMLAttributes<HTMLInputElement> & Props & MaskInputProps;

const changeType = (type: InputTypes, prev: string) => (type === "password" && type === prev ? "text" : "password");

const StyleInput = ({
    className = "",
    disabled = false,
    divClassName = "",
    divStyle = {},
    error = false,
    hidePasswordIcon = <MdVisibility style={{ color: Theme.primaryLight }} />,
    labelClassName = "",
    labelStyle,
    loading = false,
    mask: maskType,
    message,
    name,
    onBlur = () => "",
    onChange = () => "",
    onFocus = () => "",
    placeholder = "",
    type = "text",
    value = "",
    loaderColor = Theme.primary,
    viewPasswordIcon = <MdVisibilityOff style={{ color: Theme.primaryLight }} />,
    mainColor = Theme.primary,
    labelColor = Theme.primaryLight,
    divColor = Theme.primaryLight,
    inputColor = Theme.primary,
    inputErrorColor = Theme.danger,
    ...inputHtml
}: FloatInputType) => {
    const [field, setField] = useState(initialField);
    const [stateType, setType] = useState(type);

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
                    style={{
                        cursor: disabled ? "not-allowed" : "pointer",
                        ...inputHtml.style
                    }}
                    disabled={disabled}
                    value={value}
                    className={`form-field__input ${className}${disabled ? " not-allowed" : ""}`}
                    id={name}
                    type={stateType}
                    mask={maskType}
                    name={name}
                    onBlur={blur}
                    onFocus={focus}
                    onChange={change}
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
                style={{
                    width: "100%",
                    color: labelColor,
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
                value={value}
                disabled={disabled}
                className={`form-field__input ${className}${disabled ? " not-allowed" : ""}`}
                id={name}
                mask={maskType}
                name={name}
                type={type}
                onBlur={blur}
                onFocus={focus}
                onChange={change}
                usePlaceholder={false}
            />
            {loading && <Loader className="toggle-password" size={1.2} border={0.1} color={loaderColor} />}
            {!!message && <small>{message}</small>}
        </div>
    );
};

export default StyleInput;
