import { createGlobalStyle } from "styled-components";
import "./index.css";
export { default as Drawer } from "./drawer";
export { default as StyleSheet } from "./utils/StyleSheet";
export { default as Button, ButtonProps } from "./button/Button";
export { default as CurrencyInput } from "./form/CurrencyInput";
export { default as AddressBox } from "./tenants/AddressBox";
export { default as SetupStyle } from "./styles/SetupStyle";
export { default as Loader } from "./loader/Loader";
export { default as Form } from "./form/Form";
export { default as CheckBox } from "./form/Checkbox";
export { default as RadioBox } from "./form/Radiobox";
export { default as Switch } from "./form/Switch";
export { default as Input } from "./form/Input";
export { default as StyleInput } from "./form/StyleInput";
export { default as Notification } from "./feedback/Notification";
export { default as Badge } from "./feedback/Badge";
export { default as Snackbar } from "./feedback/Snackbar";
export { default as Modal } from "./modal";
export { default as Portal } from "./utils/Portal";
export { default as useForm } from "./hooks/useForm";
export { default as useReducer } from "./hooks/useReducer";
export { default as Console } from "./utils/Console";
export { default as Dimensions } from "./utils/Dimensions";
export { default as Bowser } from "./utils/Bowser";
export { default as Image } from "./picture/Image";
export { default as useOnClickOutside } from "./hooks/useOnClickOutside";
export { default as useKeyDown } from "./hooks/useKeyDown";
export { default as Keyboard } from "./utils/Keyboard";
export { default as Dropdown, DropdownItem } from "./feedback/Dropdown";
export * from "./base";
export * from "./typography/index";
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
    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
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
