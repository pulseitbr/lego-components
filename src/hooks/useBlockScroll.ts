import { useEffect, useRef } from "react";

const useBlockScroll = (visible: boolean, deps: any[] = []) => {
    const domProperties = useRef({
        overflowY: document.body.style.overflowY
    });

    useEffect(() => {
        if (visible) {
            document.body.style.overflowY = "hidden";
        } else {
            domProperties.current.overflowY = document.body.style.overflowY;
            document.body.style.overflowY = domProperties.current.overflowY;
        }
        return () => {
            document.body.style.overflowY = domProperties.current.overflowY;
        };
    }, [visible, ...deps]);
};

export default useBlockScroll;
