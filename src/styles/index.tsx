import { isEmpty } from "sidekicker/lib/comparable";
export type Colors = {
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
    theme: Colors;
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

const defaultColor: Colors = {
  primary: "#42057d",
  primaryAlpha: "rgba(66,5,125,0.5)",
  primaryLight: "#7609df",
  primaryDark: "#0e011b",
  primaryDarkest: "#000",
  primaryLightest: "#dbb8fc",
  secondary: "#14E0BF",
  secondaryAlpha: "rgba(20,224,191,0.5)",
  secondaryLight: "#68f2db",
  secondaryDark: "#0c826f",
  secondaryDarkest: "#000",
  secondaryLightest: "#fff",
  info: "#00739D",
  infoAlpha: "rgba(0,115,157,0.5)",
  infoLight: "#04bcff",
  infoDark: "#002837",
  infoDarkest: "#000",
  infoLightest: "#d0f2ff",
  warn: "#f2960d",
  warnAlpha: "rgba(242,150,13,0.5)",
  warnLight: "#f7c06e",
  warnDark: "#915a08",
  warnDarkest: "#000",
  warnLightest: "#fff",
  danger: "#ee6363",
  dangerAlpha: "rgba(238,99,99,0.5)",
  dangerLight: "#f8bfbf",
  dangerDark: "#d41717",
  dangerDarkest: "#1c0303",
  dangerLightest: "#fff",
  success: "#00C781",
  successAlpha: "rgba(0,199,129,0.5)",
  successLight: "#2effb5",
  successDark: "#00613f",
  successDarkest: "#000",
  successLightest: "#fafffd",
  dark: "#202020",
  darkAlpha: "rgba(32,32,32,0.5)",
  darkLight: "#535353",
  darkDark: "#000",
  darkDarkest: "#000",
  darkLightest: "#b9b9b9",
  light: "#ddd",
  lightAlpha: "rgba(221,221,221,0.5)",
  lightLight: "#fff",
  lightDark: "#aaa",
  lightDarkest: "#444",
  lightLightest: "#fff",
  disabled: "#bbb",
  disabledAlpha: "rgba(187,187,187,0.5)",
  disabledLight: "#eee",
  disabledDark: "#888",
  disabledDarkest: "#222",
  disabledLightest: "#fff"
};

const PLACEHOLDER = {
  tenant: "",
  version: "",
  config: {
    theme: defaultColor,
    icon: "",
    logo: "",
    card: "",
    logo2: "",
    tenant: "",
    favicon: "",
    cardBack: "",
    theme_color: "",
    background_color: ""
  }
};

declare global {
  interface Window {
    $__BP__: typeof CONFIG_THEME;
  }
}
const useGlobalBP = !isEmpty(window.$__BP__);

const BP_PLACEHOLDER = useGlobalBP ? window.$__BP__ : PLACEHOLDER;
export const $__BP__: typeof CONFIG_THEME = {
  ...BP_PLACEHOLDER,
  config: {
    ...BP_PLACEHOLDER.config,
    theme: { ...defaultColor, ...BP_PLACEHOLDER.config.theme }
  }
};

export default $__BP__.config.theme;
