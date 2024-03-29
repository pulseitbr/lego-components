import { KeyboardEvent, useEffect, useState } from "react";
type KeyboardHandler = (e: KeyboardEvent) => any;

const fill = ["input"];

const useKeyDown = (callback: KeyboardHandler, ignoredHtmlElements: string[] = fill) => {
	const [ignoreElements, setIgnoreElements] = useState(ignoredHtmlElements);

	const fn = (e: any) => {
		const { target } = e;
		if (!ignoreElements.includes(target.nodeName.toLowerCase)) {
			callback(e as KeyboardEvent);
		}
	};

	useEffect(() => {
		const oldList = ignoreElements;
		ignoredHtmlElements.forEach((element) => {
			if (!oldList.includes(element)) {
				oldList.push(element);
			}
		});
		setIgnoreElements(oldList);
	}, [ignoredHtmlElements]);

	useEffect(() => {
		window.addEventListener("keydown", fn);
		return () => window.removeEventListener("keydown", fn);
	}, [fn]);
};

export default useKeyDown;
