import { useEffect, KeyboardEvent } from "react";

const elementsToIgnore = ["input"];
type KeyboardHandler = (e: KeyboardEvent) => any;

const useKeyDown = (callback: KeyboardHandler) => {
	const fn = (e: any) => {
		const { target } = e;
		if (!elementsToIgnore.includes(target.nodeName.toLowerCase)) {
			callback(e as KeyboardEvent);
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", fn);
		return () => window.removeEventListener("keydown", fn);
	}, [fn]);
};

export default useKeyDown;
