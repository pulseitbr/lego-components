import { CSSProperties } from "react";

type Props = {
    [key: string]: CSSProperties;
};
const StyleSheet = (props: Props) => props;

StyleSheet.create = StyleSheet;
export const zIndex = {
    zero: 0,
    max: 9999,
    negative: -1,
    notifications: 5,
    veryImportant: 10
};

export const paddingVertical = (top: number, bottom?: number) => {
    const maybeBottom = bottom || top;
    return {
        paddingTop: top,
        paddingBottom: maybeBottom
    };
};

export const paddingHorizontal = (left: number, right?: number) => {
    const maybeRight = right || left;
    return {
        paddingLeft: left,
        paddingRight: maybeRight
    };
};
export const hairlineWidth = "0.5px";

StyleSheet.hairlineWidth = hairlineWidth;

StyleSheet.paddingHorizontal = paddingHorizontal;

StyleSheet.paddingVertical = paddingVertical;

StyleSheet.zIndex = zIndex;

export default StyleSheet;
