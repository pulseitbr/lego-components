import React, { InputHTMLAttributes, useImperativeHandle, useRef } from "react";
import MaskedInput from "react-text-mask";
import CurrencyInput, { CurrencyInputType } from "./currency-input";
import { convertMaskToString, decimalKeyboard, maskConverter, masks } from "./form-utils/masks";

export type InputTypes =
	| "color"
	| "date"
	| "datetime-local"
	| "email"
	| "month"
	| "number"
	| "password"
	| "radio"
	| "search"
	| "submit"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week";

type MasksTypes =
	| ""
	| "cellphone"
	| "cellTelephone"
	| "cep"
	| "cnpj"
	| "color"
	| "cpf"
	| "cpfCnpj"
	| "creditCard"
	| "currency"
	| "date"
	| "isoDate"
	| "matricula"
	| "telephone";

export type MaskInputProps = {
	autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
	usePlaceholder?: boolean;
	type?: InputTypes;
	mask?: MasksTypes | Array<string | RegExp>;
	name: string;
	value: string;
	ref?: any;
	onChange(e: React.ChangeEvent<HTMLInputElement>): any;
};

type Props = MaskInputProps & CurrencyInputType & InputHTMLAttributes<any>;

type ValueType = string | number | string[] | undefined;

type MaskChar = string | RegExp | MasksTypes;
type MaskType = MaskChar[] | ((value: string) => MaskChar[]);

const createPlaceholder = (maskRegex: string) => convertMaskToString(maskRegex);

const instanceMaskValues = (mask: MasksTypes, usePl: boolean, html: any, value: ValueType, props: Props) => {
	const maskRegex = masks[mask];
	return {
		maskRegex,
		extraProps: decimalKeyboard.hasOwnProperty(mask)
			? decimalKeyboard[mask]
			: {
					title: props.title,
					pattern: props.pattern,
					inputMode: props.inputMode
			  },
		placeholder: usePl ? html.placeholder || createPlaceholder(maskRegex) : "",
		maskedValue: maskConverter.hasOwnProperty(mask) ? maskConverter[mask](`${value}`) : value
	};
};

const isMaskConstructor = (mask: MasksTypes | Array<string | RegExp>) => Array.isArray(mask) || typeof mask === "function";

const noMask = ["matricula"];

const Input = React.forwardRef(({ type = "text", mask = "", usePlaceholder = true, ...html }: Props, externalRef) => {
	const internalRef = useRef<HTMLInputElement>(null);
	useImperativeHandle(externalRef, () => internalRef.current);
	const { value } = html;
	if (mask === "currency") {
		return <CurrencyInput {...html} value={value} ref={internalRef} />;
	}
	const options = { mask, name: html.name, value, type };
	if (mask in masks) {
		const { extraProps, maskRegex, maskedValue, placeholder } = instanceMaskValues(mask as MasksTypes, usePlaceholder, html, value, html as any);
		return (
			<MaskedInput
				{...html}
				{...extraProps}
				{...options}
				guide={!noMask.includes(mask as MasksTypes)}
				mask={maskRegex}
				value={maskedValue}
				placeholder={placeholder}
				ref={internalRef}
			/>
		);
	}
	if (isMaskConstructor(mask)) {
		return <MaskedInput guide {...html} {...options} mask={mask as MaskType} />;
	}
	return <input {...html} {...options} ref={internalRef} />;
});

export default Input;
