import Theme from "../../styles";

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
    info: { icon: { color: Theme.info }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    success: { icon: { color: Theme.success }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    dark: { icon: { color: Theme.lightLightest }, box: { backgroundColor: Theme.dark, color: Theme.lightLightest } },
    warn: { icon: { color: Theme.warn }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    danger: { icon: { color: Theme.danger }, box: { backgroundColor: Theme.lightLightest, color: "#ff252525f" } },
    default: { icon: { color: Theme.dark }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } }
};

type Themes = "info" | "success" | "warn" | "dark" | "danger" | "default" | string;

export default (theme: Themes) => (allThemes.hasOwnProperty(theme) ? allThemes[theme] : allThemes.default);
