import { useRef, useEffect } from "react";

export const useEventListener = <EVENT_TYPE>(eventName: keyof WindowEventMap | string, handler: (e: EVENT_TYPE) => void, element: HTMLElement) => {
	const savedHandler = useRef<Function>();
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const isSupported = element && element.addEventListener;
		if (!isSupported) {
			return;
		}
		const eventListener = (event: any) => savedHandler.current!(event);
		element.addEventListener(eventName, eventListener);
		return () => element.removeEventListener(eventName, eventListener);
	}, [eventName, element]);
};
