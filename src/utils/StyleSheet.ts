import { CSSProperties } from "react";

type Props = {
    [key: string]: CSSProperties;
};
const StyleSheet = (props: Props) => props;

StyleSheet.create = StyleSheet;

export default StyleSheet;
