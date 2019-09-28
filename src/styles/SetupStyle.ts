import Theme from "./";

const root: any = document.querySelector(":root");

//@ts-ignore
export default () => Object.keys(Theme).forEach((x: any) => root.style.setProperty(`--${x}`, `${Theme[x]}`));
