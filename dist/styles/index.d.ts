export declare type TypeColors = {
    primary: string;
    primaryAlpha: string;
    primaryLight: string;
    primaryLightest: string;
    primaryDark: string;
    primaryDarkest: string;
    secondary: string;
    secondaryAlpha: string;
    secondaryLight: string;
    secondaryLightest: string;
    secondaryDark: string;
    secondaryDarkest: string;
    info: string;
    infoAlpha: string;
    infoLight: string;
    infoLightest: string;
    infoDark: string;
    infoDarkest: string;
    warn: string;
    warnAlpha: string;
    warnLight: string;
    warnLightest: string;
    warnDark: string;
    warnDarkest: string;
    danger: string;
    dangerAlpha: string;
    dangerLight: string;
    dangerLightest: string;
    dangerDark: string;
    dangerDarkest: string;
    success: string;
    successAlpha: string;
    successLight: string;
    successLightest: string;
    successDark: string;
    successDarkest: string;
    dark: string;
    darkAlpha: string;
    darkLight: string;
    darkLightest: string;
    darkDark: string;
    darkDarkest: string;
    light: string;
    lightAlpha: string;
    lightLight: string;
    lightLightest: string;
    lightDark: string;
    lightDarkest: string;
    disabled: string;
    disabledAlpha: string;
    disabledLight: string;
    disabledLightest: string;
    disabledDark: string;
    disabledDarkest: string;
};
declare const CONFIG_THEME: {
    tenant: string;
    version: string;
    config: {
        theme: TypeColors;
        icon: string;
        logo: string;
        card: string;
        logo2: string;
        tenant: string;
        favicon: string;
        cardBack: string;
        theme_color: string;
        background_color: string;
    };
};
declare global {
    interface Window {
        $__BP__: typeof CONFIG_THEME;
    }
}
export declare const $__BP__: typeof CONFIG_THEME;
declare const Theme: TypeColors;
export default Theme;
