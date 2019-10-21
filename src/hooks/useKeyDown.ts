import { useEffect, KeyboardEvent } from "react";

const elementsToIgnore = ["input"];
type KeyboardHandler = (e: KeyboardEvent) => any;
const eventHandlerCreator = (callback: KeyboardHandler) => (e: KeyboardEvent) => {
    const target = e.target;
    //@ts-ignore
    if (!elementsToIgnore.includes(target.nodeName.toLowerCase)) {
        callback(e);
    }
};

const useKeyDown = (callback: KeyboardHandler) => {
    const eventHandler = eventHandlerCreator(callback);
    useEffect(() => {
        //@ts-ignore
        window.addEventListener("keydown", eventHandler);
        //@ts-ignore
        return () => window.removeEventListener("keydown", eventHandler);
    }, []);
};

export default useKeyDown;
