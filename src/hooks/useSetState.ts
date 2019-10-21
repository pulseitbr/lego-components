import { useRef, useLayoutEffect, useState } from "react";

const useSetState = (initialState = {}) => {
    const pair = useState(initialState);
    const state = pair[0];
    const setStateObj = pair[1];

    const pendingPostUpdateCallbacks = useRef([] as Function[]);
    useLayoutEffect(function() {
        if (pendingPostUpdateCallbacks.current.length > 0) {
            pendingPostUpdateCallbacks.current.forEach((pendingPostUpdateCallback: Function) => {
                pendingPostUpdateCallback();
            });
            pendingPostUpdateCallbacks.current = [];
        }
    });

    function setState(partialObjOrCallback: any, maybeAfterCallback?: Function) {
        let newState = { ...state };
        let abortUpdate = false;
        if (typeof partialObjOrCallback === "object" && partialObjOrCallback != null) {
            newState = { ...partialObjOrCallback, ...newState };
        } else if (typeof partialObjOrCallback === "function") {
            const result = partialObjOrCallback(state);
            if (result === null) {
                abortUpdate = true;
            } else {
                newState = { ...newState, ...result };
            }
        } else {
            throw new Error("Invalid argument passed to setState. Expected a function or object, but received: " + partialObjOrCallback);
        }

        if (abortUpdate) {
            return;
        }

        if (typeof maybeAfterCallback === "function") {
            pendingPostUpdateCallbacks.current.push(maybeAfterCallback);
        }
        setStateObj(newState);
    }

    return [state, setState];
};

export default useSetState;
