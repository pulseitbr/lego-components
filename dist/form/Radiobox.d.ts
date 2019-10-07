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
export declare type RadioboxTrigger = React.MouseEvent<HTMLInputElement, MouseEvent> & EventCustom & React.InputHTMLAttributes<any>;
declare type Props = OmitOnClick & {
    round?: boolean;
    checkColor?: string;
    value?: boolean;
    labelClassName?: string;
    name: string;
    onChange?(event: RadioboxTrigger): any;
    onClick?(event: RadioboxTrigger): any;
};
declare const Radiobox: ({ checkColor, color, onChange, onClick, className, value, checked, children, labelClassName, name, ...html }: Props) => JSX.Element;
export default Radiobox;
