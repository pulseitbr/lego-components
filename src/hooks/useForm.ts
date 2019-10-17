import useReducer from "./useReducer";
import { useEffect, useMemo, useRef } from "react";
import { isEmpty } from "sidekicker/lib/comparable";

type FieldMessage = { [key: string]: { message: any; hasError: boolean } };

type Blur<T> = {
    [key: string]: (
        event: React.FocusEvent<HTMLInputElement>,
        state: T,
        setState: (newProps: Partial<T>) => any,
        setError: (errorsObject: FieldMessage) => any
    ) => any;
};

type UseFormType<State> = {
    blurs?: Blur<State>;
    updateOnChange?: boolean;
    validations?: { [key: string]: (fieldValue: any, state: State) => { isValid: boolean; msg: string } } & Object;
};

const getKeys = Object.keys;

const fill = (obj: { [key: string]: any }, etc: any) => getKeys(obj).reduce((acc, e) => ({ ...acc, [e]: etc }), {});

const checkKeys = (o1: Object, o2: Object, key: string) => o1.hasOwnProperty(key) && o2.hasOwnProperty(key);

const actions = {
    onChange: (state: any, action: any) => {
        const { name, value, checked, type } = action.event.target;
        const isCheckbox = type === "checkbox";
        const fieldValue = isCheckbox ? checked : value;
        return { ...state, fields: { ...state.fields, [name]: fieldValue } };
    },
    cleanUpErrors: (state: any) => ({ ...state, errors: {} }),
    updateErrors: (state: any) => ({ ...state, errors: { ...state.errors } }),
    setState: (state: any, action: any) => ({ ...state, fields: { ...state.fields, ...action.state } }),
    aggregateErrors: (state: any, action: any) => ({ ...state, errors: { ...state.errors, ...action.errors } })
};

const messageFill = { message: "", hasError: false };

export default <T>(fields: T, { updateOnChange = true, validations = {}, blurs = {} }: UseFormType<T>) => {
    const cache: any = useRef(fill(fields, false));
    const errors: FieldMessage = useMemo(() => fill(fields, messageFill), [fields]);

    const [state, dispatch] = useReducer({ fields, errors }, actions);
    const values: any = state.fields;
    const valuesDependency = Object.values(values);

    const fieldNames = Object.keys(fields);

    if (valuesDependency.length !== fieldNames.length) {
        const names = valuesDependency.filter((x: string) => !fieldNames.includes(x));
        throw new Error(`Especifica o nome nos inputs o fdp ${fieldNames} - ${names}`);
    }

    const setState = useMemo(
        () => (newProps: Partial<T>) => dispatch({ type: "setState", state: { ...newProps } }),
        []
    );

    const setErrors = useMemo(
        () => (errorsObject: FieldMessage) => dispatch({ type: "aggregateErrors", errors: errorsObject }),
        []
    );

    const clearState = useMemo(
        () => (emptyState?: Partial<T>) => dispatch({ type: "setState", state: { ...fields, ...emptyState } }),
        []
    );

    useEffect(() => {
        if (updateOnChange) {
            getKeys(values).forEach((x) => {
                const value = values[x];
                if (checkKeys(validations, values, x) && !!value) {
                    const fn = validations[x];
                    const { isValid: error, msg } = fn(value, values);
                    if (error) {
                        cache.current[x] = true;
                    }
                    if (cache.current[x]) {
                        errors[x] = { message: msg, hasError: !error };
                    }
                }
            });
            if (isEmpty(errors)) {
                dispatch({ type: "cleanUpErrors" });
            } else {
                dispatch({ type: "updateErrors", errors });
            }
        }
    }, valuesDependency);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        return dispatch({ type: "onChange", event });
    };

    const blurEvents: any = useMemo(
        () =>
            getKeys(blurs).reduce((acc, el) => {
                if (!!blurs && blurs.hasOwnProperty(el)) {
                    const validationFn = validations[el] || undefined;
                    const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
                        if (!!validationFn) {
                            const validation = validationFn(event.target.value, state.fields);
                            if (!validation.isValid) {
                                dispatch({
                                    type: "aggregateErrors",
                                    errors: { [el]: { hasError: true, message: validation.msg } }
                                });
                            }
                        }
                        return blurs[el](event, state.fields, setState, setErrors);
                    };
                    return { ...acc, [el]: onBlurHandler };
                }
                return acc;
            }, {}),
        valuesDependency
    );

    return { clearState, onChange, setState, setErrors, blurEvents, errors: state.errors, state: values };
};
