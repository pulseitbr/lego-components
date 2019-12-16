import Colors from "./";

const root: any = document.querySelector(":root");

export default () => Object.keys(Colors).forEach((x: any) => root.style.setProperty(`--${x}`, `${Colors[x]}`));
