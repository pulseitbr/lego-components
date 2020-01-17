import Colors from ".";

const root: any = document.querySelector(":root");

export default () => Object.entries(Colors).forEach(([key, color]) => root.style.setProperty(`--${key}`, color));
