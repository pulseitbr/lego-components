import { useEffect, useRef } from "react";

const voidFn = () => {};
const voidFnError = (err: Error) => {};

export const useAsyncEffect = (
	createGenerator: (
		setCancelHandler: (onCancel?: null | (() => void), onCancelError?: null | ((err: Error) => void)) => void
	) => IterableIterator<any>,
	deps: React.DependencyList
) => {
	const generatorRef = useRef(createGenerator);

	useEffect(() => {
		generatorRef.current = createGenerator;
	});

	useEffect(() => {
		const isCanceled = useRef(false);
		const onCancel = useRef(voidFn);
		const onCancelError = useRef(voidFnError);
		const generator = generatorRef.current((cancelHandler, cancelErrorHandler) => {
			onCancel.current = cancelHandler || voidFn;
			onCancelError.current = cancelErrorHandler || voidFnError;
		});
		const cleanupHandler = useRef(voidFn);

		const run = async () => {
			let result: IteratorResult<any> = { value: undefined, done: false };
			do {
				result = generator.next(result.value);
				if (result.value && result.value.then) {
					try {
						result.value = await result.value;
					} catch (err) {
						if (isCanceled.current) {
							onCancelError.current(err);
							return;
						}
						try {
							generator.throw!(err);
						} catch (err) {
							console.error(`[use-async-effect] Unhandled promise rejection.`);
							console.error(err);
							return;
						}
					}
				}
				if (isCanceled.current) {
					return;
				}
				onCancel.current = voidFn;
				onCancelError.current = voidFn;
			} while (result.done === false);
			if (result.value) {
				cleanupHandler.current = result.value;
			}
		};
		run();

		return () => {
			isCanceled.current = true;
			onCancel.current();
			cleanupHandler.current();
		};
	}, deps);
};
