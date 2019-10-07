import React from "react";
export declare type CurrencyInputType = React.InputHTMLAttributes<HTMLInputElement> & {
    prefix?: string;
    separator?: string;
    onChange?(e: React.ChangeEvent<HTMLInputElement> & {
        target: {
            rawValue: number;
        };
    }): any;
};
export declare const toCurrency: (value: string, separator?: string, prefix?: string) => string;
declare const CurrencyInput: ({ prefix, separator, defaultValue, ...props }: CurrencyInputType) => JSX.Element;
export default CurrencyInput;
