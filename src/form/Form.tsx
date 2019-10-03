import React from "react";
type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
  onSubmit(event: React.FormEvent<HTMLFormElement>, formValues: unknown): any;
};

const Form = ({ children, onSubmit, ...props }: Props) => {
  const submitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.persist();
    console.log(event.target);
    if (!!onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form {...props} onSubmit={submitEvent}>
      {children}
    </form>
  );
};

export default Form;
