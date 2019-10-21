import React, { useEffect } from "react";

const useOnClickOutside = <T>(ref: React.MutableRefObject<T>, handler: React.EventHandler<any>) => {
    useEffect(() => {
        const listener = (event: any) => {
            //@ts-ignore
            if (!ref!.current! || ref!.current!.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
