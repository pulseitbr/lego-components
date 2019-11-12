import React, { useEffect, useState } from "react";
import Decimal from "decimal.js";

const formatBrlToFloat = (currency: string) => {
	const final = currency
		.replace(/,/g, ".")
		.replace(/(.*)\./, (x) => x.replace(/\./g, "") + ".")
		.replace(/[^0-9\.]/g, "");
	return new Decimal(final).toDP(2).toNumber();
};
export type CurrencyInputType = React.InputHTMLAttributes<HTMLInputElement> & {
	prefix?: string;
	name: string;
	value: string;
	separator?: string;
	onChange(e: React.ChangeEvent<HTMLInputElement> & { target: { rawValue: number } }): any;
};

const fromValue = (value = "") => value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "";

const padding = (digits: string) => {
	const minLength = 3;
	const currentLength = digits.length;
	if (currentLength >= minLength) {
		return digits;
	}
	const amountToAdd = minLength - currentLength;
	return `${"0".repeat(amountToAdd)}${digits}`;
};

const removeLeadingZeros = (num: string) => num.replace(/^0+([0-9]+)/, "$1");

const addDecimals = (num: string, separator = ",") => {
	const centsStart = num.length - 2;
	const amount = removeLeadingZeros(num.substring(0, centsStart));
	const cents = num.substring(centsStart);
	return amount + separator + cents;
};

export const toCurrency = (value: string, separator = ",", prefix = "R$ ") => {
	const valueToMask = padding(fromValue(value));
	return `${prefix}${addDecimals(valueToMask, separator)}`;
};

const safeConvert = (str: string | number | string[] = "0") => toCurrency(Number.parseFloat(`${str}`).toFixed(2));

const CurrencyInput = ({ prefix = "R$ ", separator = ",", defaultValue, ...props }: CurrencyInputType) => {
	const convert = safeConvert(props.value);
	const [value, setValue] = useState(convert);

	useEffect(() => {
		setValue(convert);
	}, [convert, props.value]);

	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const valueAsCurrency = toCurrency(e.target.value, separator, prefix);
		const realValue = formatBrlToFloat(valueAsCurrency);
		setValue(valueAsCurrency);
		if (props.onChange) {
			e.persist();
			return props.onChange({
				...e,
				target: {
					...e.target,
					name: props.name || "",
					rawValue: realValue,
					value: `${realValue}`
				}
			});
		}
	};
	return (
		<input
			{...props}
			type="text"
			value={value}
			name={props.name}
			onChange={change}
			inputMode="decimal"
			pattern="^[A-Z]{1,3}[0-9$,. ]+$"
		/>
	);
};

export default CurrencyInput;
