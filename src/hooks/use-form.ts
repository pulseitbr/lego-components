import useReducer from "./use-reducer";
import { useEffect, useMemo, useRef } from "react";
type FormProperties<State> = { [P in keyof State]: string };
type MessageField = string | number | React.ReactNode;
type FieldMessage<State> = {
	[key in keyof State]: { message: MessageField; hasError: boolean; blurEventTrigger: boolean };
};

type Blur<T extends { [key: string]: string }> = {
	[key in keyof T]: (
		event: React.FocusEvent<HTMLInputElement>,
		state: FormProperties<T>,
		setState: (newProps: Partial<T>) => any,
		setError: (errorsObject: FieldMessage<T>) => any
	) => void;
};
type InternalState<T> = {
	fields: T;
	errors: FieldMessage<T>;
};
type Errors = { isValid: boolean; msg: string };
type UseFormType<State> = {
	blurs?: Blur<FormProperties<State>>;
	updateOnChange?: boolean;
	validations?: { [P in keyof State]: (fieldValue: string, state: State) => Errors };
};

const fill = <T>(obj: T, etc: unknown) => Object.keys(obj).reduce((acc, e) => ({ ...acc, [e]: etc }), {});

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

type CacheValidate<T> = { [key in keyof T]: boolean };

type ErrorsFields<State> = { [P in keyof State]: { message: MessageField; hasError: boolean; blurEventTrigger: boolean } };

const messageFill = { message: "", hasError: false, blurEventTrigger: false };

export default <State extends { [key in keyof State]: string }>(
	fields: FormProperties<State>,
	{ updateOnChange = true, validations = {} as any, blurs = {} as any }: UseFormType<State>
) => {
	const cache = useRef<CacheValidate<FormProperties<State>>>(fill(fields, false) as any);
	const errors: ErrorsFields<State> = useMemo(() => fill(fields, messageFill), [fields]) as any;
	const [state, dispatch] = useReducer({ fields, errors } as InternalState<FormProperties<State>>, actions) as [InternalState<State>, Function];

	const fieldNames = useMemo(() => Object.keys(fields), [fields]);
	const dependencies = useMemo(() => Object.values(state.fields), [state.fields]) as any;

	if (dependencies.length !== fieldNames.length) {
		const names = dependencies.filter((x: string) => !fieldNames.includes(x as string));
		throw new Error(`You need the field names in your inputs: ${fieldNames} - ${names}`);
	}

	const setState = useMemo(() => (newProps: Partial<FormProperties<State>>) => dispatch({ type: "setState", state: { ...newProps } }), [dispatch]);

	const setErrors = useMemo(() => (errorsObject: FieldMessage<State>) => dispatch({ type: "aggregateErrors", errors: errorsObject }), [dispatch]);

	const clearState = useMemo(() => (emptyState?: Partial<State>) => dispatch({ type: "setState", state: { ...fields, ...emptyState } }), [
		dispatch,
		fields
	]);

	useEffect(() => {
		if (updateOnChange) {
			const stateErrors = { ...state.errors };
			Object.keys(state.fields).forEach((name) => {
				const x = (name as unknown) as keyof State;
				const value = state.fields[x];
				if (checkKeys(validations, state.fields, x as string)) {
					const fn = validations[x];
					const { isValid, msg } = fn(value, state.fields);
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
	}, [updateOnChange, state.fields]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist();
		return dispatch({ type: "onChange", event });
	};

	const blurEvents = useMemo(
		() =>
			Object.keys(blurs).reduce((acc, name) => {
				const el: keyof Blur<FormProperties<State>> = name as any;
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

	return { clearState, onChange, setState, setErrors, blurEvents, errors: state.errors, state: state.fields };
};
