import React from "react";
declare type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    onSubmit(event: React.FormEvent<HTMLFormElement>, formValues: unknown): any;
};
declare const Form: ({ children, onSubmit, ...props }: Props) => JSX.Element;
export default Form;
