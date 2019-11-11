import React from "react";
type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
	onSubmit(event: React.FormEvent<HTMLFormElement>, formValues: unknown): any;
	canSubmit?: () => boolean;
};

const Form = ({ children, canSubmit, onSubmit, ...props }: Props) => {
	const submitEvent = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.persist();
		const submit = () => {
			if (!!onSubmit) {
				onSubmit(event);
			}
		};
		if (canSubmit === undefined) {
			submit();
		} else if (!!canSubmit && canSubmit()) {
			submit();
		}
	};

	return (
		<form {...props} onSubmit={submitEvent}>
			{children}
		</form>
	);
};

export default Form;
