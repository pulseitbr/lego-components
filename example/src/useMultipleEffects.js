import { useCallback, useEffect } from "react";

const useMultipleEffects = (effectsAndDeps = []) => {
    const memoCallbackEffects = effectsAndDeps.map((x) => {
        return useCallback(x.effect, x.deps);
    });
    memoCallbackEffects.forEach((x) => useEffect(x));
};

export default useMultipleEffects;
