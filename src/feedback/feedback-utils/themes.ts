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
    danger: { icon: { color: Theme.danger }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    dark: { icon: { color: Theme.lightLightest }, box: { backgroundColor: Theme.dark, color: Theme.lightLightest } },
    default: { icon: { color: Theme.dark }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    info: { icon: { color: Theme.info }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    success: { icon: { color: Theme.success }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } },
    warn: { icon: { color: Theme.warn }, box: { backgroundColor: Theme.lightLightest, color: Theme.dark } }
};

type Themes = "info" | "success" | "warn" | "dark" | "danger" | "default" | string;

export default (theme: Themes) => (allThemes.hasOwnProperty(theme) ? allThemes[theme] : allThemes.default);
