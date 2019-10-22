import Theme from "./";

const root: any = document.querySelector(":root");

export default () => Object.keys(Theme).forEach((x: any) => root.style.setProperty(`--${x}`, `${Theme[x]}`));
