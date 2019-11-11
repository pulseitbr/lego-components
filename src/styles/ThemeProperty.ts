export type ThemeProperty =
	| "danger"
	| "primary"
	| "info"
	| "success"
	| "warn"
	| "transparent"
	| "light"
	| "none"
	| "dark"
	| "disabled"
	| "disabledTransparent";

export const themePropertyValues: ThemeProperty[] = [
	"danger",
	"primary",
	"info",
	"success",
	"warn",
	"transparent",
	"light",
	"none",
	"dark",
	"disabled",
	"disabledTransparent"
];

export const defineTheme = <T>(props: T & Object, styleType: string, theme: string = ""): string => {
	for (const key of themePropertyValues) {
		const hasProp = props.hasOwnProperty(key);
		if (hasProp && !!props[key]) {
			return key;
		}
	}
	return styleType || theme;
};
