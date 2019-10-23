import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

const ReactPortal = (props: any): any => {
    const defaultNode = useRef(null);
    useEffect(() => {
        return () => {
            //@ts-ignore
            if (defaultNode.current) {
                //@ts-ignore
                document.body.removeChild(defaultNode.current);
            }
            //@ts-ignore
            defaultNode.current = null;
        };
    }, []);

    if (!canUseDOM) {
        return null;
    }
    //@ts-ignore
    if (!props.node && !defaultNode.current) {
        //@ts-ignore
        defaultNode.current = document.createElement("div");
        //@ts-ignore
        document.body.appendChild(defaultNode.current);
    }
    //@ts-ignore
    return ReactDOM.createPortal(props.children, props.node || defaultNode.current);
};

export default ReactPortal;
