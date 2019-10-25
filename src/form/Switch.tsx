import Theme from "../styles";
import Constants from "../styles/Constants";
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

const Label = styled.label`
    position: relative;
    display: inline-block;
    width: 2rem;
    height: 1.3rem;

    & input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${Theme.disabledLight};
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 0.9rem;
        width: 0.9rem;
        left: ${Constants.UNIT_1};
        bottom: ${Constants.UNIT_1};
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: ${(props) => props.color};
    }

    input:focus + .slider {
        box-shadow: 0 0 0.0625rem ${(props) => props.color};
    }

    input:checked + .slider:before {
        transform: translateX(0.65rem);
    }

    .slider.round {
        border-radius: 2.125rem;
    }

    .slider.round:before {
        border-radius: 50%;
    }
`;

type Props = {
    round?: boolean;
    color?: string;
    name: string;
    value?: boolean;
    labelClassName?: string;
} & Omit<InputHTMLAttributes<any>, "value">;

const Switch = ({
    round = true,
    color = Theme.primary,
    onChange = () => {},
    className = "",
    labelClassName = "",
    name,
    children,
    value = false,
    checked = false,
    ...html
}: Props) => {
    const isChecked = value || checked;
    const roundClassName = round ? "slider round" : "slider";
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const internalCheck = event.target.checked;
        return onChange({ ...event, target: { ...event.target, name, value: internalCheck } });
    };
    return (
        <Label className={labelClassName} color={color}>
            <input
                {...html}
                name={name}
                type="checkbox"
                onChange={change}
                checked={isChecked}
                aria-checked={value.toString() as "false" | "true"}
            />
            <span className={roundClassName} />
            {children}
        </Label>
    );
};

export default Switch;
