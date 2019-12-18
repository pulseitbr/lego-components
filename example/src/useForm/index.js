import { useEffect, useReducer as useRed, useMemo, useRef } from "react";

const createReducer = (reducer) => (state, action) => {
	const key = action.type;
	return reducer.hasOwnProperty(key) ? reducer[key](state, action) : state;
};

const useReducer = (state, fn) => useRed(createReducer(fn), state, () => state);

const getKeys = Object.keys;

const fill = (obj, etc) => getKeys(obj).reduce((acc, e) => ({ ...acc, [e]: etc }), {});

const checkKeys = (o1, o2, key) => o1.hasOwnProperty(key) && o2.hasOwnProperty(key);

const actions = {
	onChange: (state, { event }) => {
		const { name, value, checked, type } = event.target;
		const isCheckbox = type === "checkbox";
		const fieldValue = isCheckbox ? checked : value;
		return { ...state, fields: { ...state.fields, [name]: fieldValue } };
	},
	cleanUpErrors: (state) => ({ ...state, errors: {} }),
	updateErrors: (state, action) => ({ ...state, errors: action.errors }),
	setState: (state, action) => ({
		...state,
		fields: { ...state.fields, ...action.state }
	}),
	aggregateErrors: (state, action) => ({
		...state,
		errors: { ...state.errors, ...action.errors }
	})
};

const messageFill = { message: "", hasError: false, blurEventTrigger: false };

export default (fields, { updateOnChange = true, validations = {}, blurs = {} }) => {
	const cache = useRef(fill(fields, false));
	const errors = useMemo(() => fill(fields, messageFill), [fields]);

	const [state, dispatch] = useReducer({ fields, errors }, actions);

	const values = state.fields;
	const fieldNames = Object.keys(fields);
	const valuesDependency = Object.values(values);

	if (valuesDependency.length !== fieldNames.length) {
		const names = valuesDependency.filter((x) => !fieldNames.includes(x));
		throw new Error(`You need the field names in your inputs: ${fieldNames} - ${names}`);
	}

	const setState = useMemo(() => (newProps) => dispatch({ type: "setState", state: { ...newProps } }), [dispatch]);

	const setErrors = useMemo(() => (errorsObject) => dispatch({ type: "aggregateErrors", errors: errorsObject }), [dispatch]);

	const clearState = useMemo(() => (emptyState) => dispatch({ type: "setState", state: { ...fields, ...emptyState } }), [dispatch, fields]);

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

	const onChange = (event) => {
		event.persist();
		return dispatch({ type: "onChange", event });
	};

	const blurEvents = useMemo(
		() =>
			getKeys(blurs).reduce((acc, el) => {
				if (!!blurs && blurs.hasOwnProperty(el)) {
					const validationFn = validations[el] || null;
					const onBlurHandler = (event) => {
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
