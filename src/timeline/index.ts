export { default as Timeline } from "./Timeline";
export { default as TimelineItem } from ".";

export const timelineTestBorder = (color: string) => (/primary|danger|success/.test(color) ? undefined : color);
