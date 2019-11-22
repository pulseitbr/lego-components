export { default as Timeline } from "./Timeline";
export { default as TimelineItem } from "./TimelineItem";

// eslint-disable-next-line no-undefined
export const timelineTestBorder = (color: string) => (/primary|danger|success/.test(color) ? undefined : color);
