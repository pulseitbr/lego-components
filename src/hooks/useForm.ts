import { useEffect, useMemo, useRef } from "react";
import useReducer from "./useReducer";

type MessageField = string | number | React.ReactNode;
type FieldMessage = { [key: string]: { message: MessageField; hasError: boolean; blurEventTrigger: boolean } };

type Blur<T> = {
	[key: string]: (
		event: React.FocusEvent<HTMLInputElement>,
		state: T,
		setState: (newProps: Partial<T>) => any,
		setError: (errorsObject: FieldMessage) => any
	) => void;
};
type InternalState<T> = {
	fields: T;
	errors: FieldMessage;
};
type Errors = { isValid: boolean; msg: string };
type InputTypes = string | number | boolean | string[];
type UseFormType<State> = {
	blurs?: Blur<State>;
	updateOnChange?: boolean;
	validations?: { [key: string]: (fieldValue: InputTypes, state: State) => Errors } & Object;
};

const getKeys = Object.keys;

const fill = <T>(obj: T, etc: unknown) => getKeys(obj).reduce((acc, e) => ({ ...acc, [e]: etc }), {});

const checkKeys = (o1: Object, o2: Object, key: string) => o1.hasOwnProperty(key) && o2.hasOwnProperty(key);

const actions = {
	onChange: <T>(state: InternalState<T>, { event }: { event: React.ChangeEvent<HTMLInputElement> }) => {
		const { name, value, checked, type } = event.target;
		const isCheckbox = type === "checkbox";
		const fieldValue = isCheckbox ? checked : value;
		return { ...state, fields: { ...state.fields, [name]: fieldValue } };
	},
	cleanUpErrors: <T>(state: InternalState<T>) => ({ ...state, errors: {} }),
	updateErrors: <T>(state: InternalState<T>, action: any) => ({ ...state, errors: action.errors }),
	setState: <T>(state: InternalState<T>, action: { state: InternalState<T> }) => ({
		...state,
		fields: { ...state.fields, ...action.state }
	}),
	aggregateErrors: <T>(state: InternalState<T>, action: any) => ({
		...state,
		errors: { ...state.errors, ...action.errors }
	})
};

const messageFill = { message: "", hasError: false, blurEventTrigger: false };

export default <T>(fields: T, { updateOnChange = true, validations = {}, blurs = {} }: UseFormType<T>) => {
	const cache = useRef(fill(fields, false));
	const errors: FieldMessage = useMemo(() => fill(fields, messageFill), [fields]);

	const [state, dispatch] = useReducer({ fields, errors } as InternalState<T>, actions) as [InternalState<T>, Function];

	const values = state.fields;
	const fieldNames = Object.keys(fields);
	const valuesDependency = Object.values(values);

	if (valuesDependency.length !== fieldNames.length) {
		const names = valuesDependency.filter((x: string) => !fieldNames.includes(x));
		throw new Error(`You need the field names in your inputs: ${fieldNames} - ${names}`);
	}

	const setState = useMemo(() => (newProps: Partial<T>) => dispatch({ type: "setState", state: { ...newProps } }), [dispatch]);

	const setErrors = useMemo(() => (errorsObject: FieldMessage) => dispatch({ type: "aggregateErrors", errors: errorsObject }), [dispatch]);

	const clearState = useMemo(() => (emptyState?: Partial<T>) => dispatch({ type: "setState", state: { ...fields, ...emptyState } }), [
		dispatch,
		fields
	]);

	useEffect(() => {
		if (updateOnChange) {
			const stateErrors = { ...state.errors };
			getKeys(values).forEach((x) => {
				const value = values[x];
				if (checkKeys(validations, values, x)) {
					const fn = validations[x];
					const { isValid, msg } = fn(value, values);
					if (stateErrors[x].blurEventTrigger && !isValid) {
						cache.current[x] = true;
						stateErrors[x] = {
							message: msg,
							hasError: true,
							blurEventTrigger: stateErrors[x].blurEventTrigger
						};
					} else {
						cache.current[x] = false;
						stateErrors[x] = {
							message: msg,
							hasError: false,
							blurEventTrigger: stateErrors[x].blurEventTrigger
						};
					}
				}
			});
			dispatch({ type: "updateErrors", errors: stateErrors });
		}
	}, [updateOnChange, state.fields, values]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		return dispatch({ type: "onChange", event });
	};

	const blurEvents = useMemo(
		() =>
			getKeys(blurs).reduce((acc, el) => {
				if (!!blurs && blurs.hasOwnProperty(el)) {
					const validationFn = validations[el] || null;
					const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
						if (!!validationFn) {
							const validation = validationFn(event.target.value, state.fields);
							dispatch({
								type: "aggregateErrors",
								errors: {
									[el]: {
										hasError: !validation.isValid,
										message: validation.msg,
										blurEventTrigger: true
									}
								}
							});
						}
						return blurs[el](event, state.fields, setState, setErrors);
					};
					return { ...acc, [el]: onBlurHandler };
				}
				return acc;
			}, {}),
		[blurs, dispatch, setErrors, setState, state.fields, validations]
	);

	return { clearState, onChange, setState, setErrors, blurEvents, errors: state.errors, state: values };
};
