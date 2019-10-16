import { useEffect, KeyboardEvent } from "react";

const elementsToIgnore = ["input"];

const eventHandlerCreator = (callback) => (e) => {
    const target = e.target;
    if (!elementsToIgnore.includes(target.nodeName.toLowerCase)) {
        callback(e);
    }
};

const useKeyDown = (callback) => {
    const eventHandler = eventHandlerCreator(callback);
    useEffect(() => {
        window.addEventListener("keydown", eventHandler);
        return window.removeEventListener("keydown", eventHandler);
    }, []);
};

export default useKeyDown;
