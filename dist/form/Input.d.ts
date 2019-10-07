import { InputHTMLAttributes } from "react";
import { CurrencyInputType } from "./CurrencyInput";
export declare type InputTypes = "color" | "date" | "datetime-local" | "email" | "month" | "number" | "password" | "radio" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
declare type MasksTypes = "currency" | "cpf" | "creditCard" | "cellphone" | "cnpj" | "cep" | "telephone" | "date" | "matricula" | "cellTelephone" | "color" | "isoDate" | "cpfCnpj";
export declare type MaskInputProps = {
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
    usePlaceholder?: boolean;
    type?: InputTypes;
    mask?: MasksTypes | Array<string | RegExp>;
};
declare type Props = MaskInputProps & CurrencyInputType & InputHTMLAttributes<any>;
declare const Input: ({ title, type, mask, value, usePlaceholder, ...html }: Props) => JSX.Element;
export default Input;
