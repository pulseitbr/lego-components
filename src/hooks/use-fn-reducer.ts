import { useState, useMemo } from "react";

type Immutable<State> = Readonly<State>;

type Act<Actions, State> = {
	[key in keyof Actions]: (...args: any) => (state: State) => Keys<State>;
};

export type Keys<State> = Partial<Immutable<State>>;

type Reducer<State, Function extends (...args: any) => (state: State) => Keys<State>> = (
	...args: Parameters<Function>
) => (state: State) => Keys<State>;

export type Dispatch<ST, Actions extends Act<Actions, ST>> = {
	[key in keyof Actions]: Reducer<ST, Actions[key]>;
};

const useReducer = <State, Reducers extends Dispatch<State, Reducers>>(initialState: State, reducers: Reducers) => {
	const [state, setState] = useState(initialState);
	const dispatches = useMemo(
		() =>
			Object.entries(reducers).reduce(
				(acc, [name, dispatch]: [string, any]) => ({
					...acc,
					[name]: (...params: any) => {
						const event = dispatch(...params);
						setState((currentState) => ({ ...currentState, ...event(...params) }));
					}
				}),
				{} as Dispatch<State, Reducers>
			),
		[reducers]
	);
	return [state, dispatches] as [State, Dispatch<State, Reducers>];
};

export default useReducer;
