import React from "react";
import ReactDOM from "react-dom";

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

class Portal extends React.Component<any, any, any> {
    componentWillUnmount() {
        //@ts-ignore
        if (this.defaultNode) {
            //@ts-ignore
            document.body.removeChild(this.defaultNode);
        }
        //@ts-ignore
        this.defaultNode = null;
    }

    render() {
        if (!canUseDOM) {
            return null;
        }
        //@ts-ignore
        if (!this.props.node && !this.defaultNode) {
            //@ts-ignore
            this.defaultNode = document.createElement("div");
            //@ts-ignore
            document.body.appendChild(this.defaultNode);
        }
        //@ts-ignore
        return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
    }
}

export default Portal;
