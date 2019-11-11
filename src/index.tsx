import { createGlobalStyle } from "styled-components";
import "./index.css";
export * from "./base";
export { ButtonProps, default as Button } from "./button/Button";
export { default as Drawer } from "./drawer";
export { default as Badge } from "./feedback/Badge";
export * from "./feedback/Dropdown";
export { Dropdown, DropdownItem } from "./feedback/Dropdown";
export { default as Notification } from "./feedback/Notification";
export { Animations, Popover, Triggers } from "./feedback/Popover";
export { default as Snackbar } from "./feedback/Snackbar";
export { default as CheckBox } from "./form/Checkbox";
export { default as CurrencyInput } from "./form/CurrencyInput";
export { default as Form } from "./form/Form";
export { default as Input } from "./form/Input";
export { default as RadioBox } from "./form/Radiobox";
export { default as StyleInput } from "./form/StyleInput";
export { default as Switch } from "./form/Switch";
export { default as useBlockScroll } from "./hooks/useBlockScroll";
export { default as useForm } from "./hooks/useForm";
export { default as useImagePreview } from "./hooks/useImagePreview";
export { default as useKeyDown } from "./hooks/useKeyDown";
export { default as useOnClickOutside } from "./hooks/useOnClickOutside";
export { default as useReducer } from "./hooks/useReducer";
export { default as useSetState } from "./hooks/useSetState";
export { default as useWidth } from "./hooks/useWidth";
export { default as Loader } from "./loader/Loader";
export { default as Modal } from "./modal";
export * from "./picture/Avatar";
export { default as Image } from "./picture/Image";
export { default as Constants } from "./styles/Constants";
export { default as Colors } from "./styles/index";
export { default as SetupStyle } from "./styles/SetupStyle";
export { default as StyleSheet } from "./styles/StyleSheet";
export * from "./tenants";
export { default as AddressBox } from "./tenants/AddressBox";
export { default as AllowView } from "./tenants/AllowView";
export * from "./tenants/profile";
export * from "./typography/index";
export { default as BBCode } from "./utils/BBCode";
export { default as Bowser } from "./utils/Bowser";
export { default as Console } from "./utils/Console";
export { default as Dimensions } from "./utils/Dimensions";
export { default as FlatList } from "./utils/FlatList";
export { default as Keyboard } from "./utils/Keyboard";
export { default as Portal } from "./utils/Portal";
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-stretch: extra-condensed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    text-shadow: rgba(0, 0, 0, .05) 0 0 1px;
  }

  body {
      scroll-behavior: smooth;
      height: 100%;
      min-height: 100%;
      font-stretch: extra-condensed;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
  }

  html, body, #root {
    min-height:100%;
  }
`;
