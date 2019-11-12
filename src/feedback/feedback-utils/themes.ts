import Colors from "../../styles";

export type NotifyTheme = {
	icon: {
		color: string;
	};
	box: {
		backgroundColor: string;
		color: string;
	};
};

const allThemes: { [key: string]: NotifyTheme } = {
	danger: { icon: { color: Colors.danger }, box: { backgroundColor: Colors.lightLightest, color: Colors.dark } },
	dark: { icon: { color: Colors.lightLightest }, box: { backgroundColor: Colors.dark, color: Colors.lightLightest } },
	default: { icon: { color: Colors.dark }, box: { backgroundColor: Colors.lightLightest, color: Colors.dark } },
	info: { icon: { color: Colors.info }, box: { backgroundColor: Colors.lightLightest, color: Colors.dark } },
	success: { icon: { color: Colors.success }, box: { backgroundColor: Colors.lightLightest, color: Colors.dark } },
	warn: { icon: { color: Colors.warn }, box: { backgroundColor: Colors.lightLightest, color: Colors.dark } }
};

type Themes = "info" | "success" | "warn" | "dark" | "danger" | "default" | string;

export default (theme: Themes) => (allThemes.hasOwnProperty(theme) ? allThemes[theme] : allThemes.default);
