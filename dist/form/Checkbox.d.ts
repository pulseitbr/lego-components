import React from "react";
declare type OmitValue = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "value">;
declare type OmitOnChange = Omit<OmitValue, "onChange">;
declare type OmitOnClick = Omit<OmitOnChange, "onClick">;
declare type EventCustom = EventTarget & {
    target: {
        name: string;
        value: boolean;
        checked: boolean;
        stopPropagation(): void;
        persist(): void;
    };
};
export declare type CheckboxTrigger = React.MouseEvent<HTMLInputElement, MouseEvent> & EventCustom & React.InputHTMLAttributes<any>;
declare type Props = OmitOnClick & {
    round?: boolean;
    checkColor?: string;
    value?: boolean;
    labelClassName?: string;
    name: string;
    onChange?(event: CheckboxTrigger): any;
    onClick?(event: CheckboxTrigger): any;
};
declare const Checkbox: ({ checkColor, color, onChange, onClick, className, value, checked, children, labelClassName, name, ...html }: Props) => JSX.Element;
export default Checkbox;
