import { InputHTMLAttributes } from "react";
declare type Props = {
    round?: boolean;
    color?: string;
    name: string;
    value?: boolean;
    labelClassName?: string;
} & Omit<InputHTMLAttributes<any>, "value">;
declare const Switch: ({ round, color, onChange, className, labelClassName, name, children, value, checked, ...html }: Props) => JSX.Element;
export default Switch;
