import { CSSProperties } from "react";
import { TypeText } from "../@types";

type Props<T extends string> = {
	[key in T]: CSSProperties;
};

const StyleSheet = <T extends string>(props: Props<T>) => props;

StyleSheet.create = StyleSheet;
export const zIndex = {
	zero: 0,
	max: 9999,
	negative: -1,
	notifications: 5,
	veryImportant: 10
};

export const paddingVertical = (top: TypeText, bottom?: TypeText) => {
	const maybeBottom = bottom || top;
	return {
		paddingTop: top,
		paddingBottom: maybeBottom
	};
};

export const paddingHorizontal = (left: TypeText, right?: TypeText) => {
	const maybeRight = right || left;
	return {
		paddingLeft: left,
		paddingRight: maybeRight
	};
};
export const marginVertical = (top: TypeText, bottom?: TypeText) => {
	const maybeBottom = bottom || top;
	return {
		marginTop: top,
		marginBottom: maybeBottom
	};
};

export const marginHorizontal = (left: TypeText, right?: TypeText) => {
	const maybeRight = right || left;
	return {
		marginLeft: left,
		marginRight: maybeRight
	};
};
export const hairlineWidth = "0.5px";

StyleSheet.hairlineWidth = hairlineWidth;
StyleSheet.marginHorizontal = marginHorizontal;
StyleSheet.marginVertical = marginVertical;
StyleSheet.paddingHorizontal = paddingHorizontal;
StyleSheet.paddingVertical = paddingVertical;
StyleSheet.zIndex = zIndex;
StyleSheet.minWidthMobile = "360px";

export default StyleSheet;
