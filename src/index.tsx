import { createGlobalStyle } from "styled-components";
import "./index.css";

export * from "./base";
export { ButtonProps, default as Button } from "./button";
export { default as Drawer } from "./drawer";
export { default as Badge } from "./feedback/badge";
export * from "./feedback/dropdown";
export { Dropdown, DropdownItem } from "./feedback/dropdown";
export { default as Notification, default as Notify } from "./feedback/notify";
export { Animations, Popover, PopoverTheme, Triggers } from "./feedback/popover";
export { default as Snackbar } from "./feedback/snackbar";
export { CheckboxTrigger, default as CheckBox } from "./form/checkbox";
export { CurrencyInputType, default as CurrencyInput } from "./form/currency-input";
export { default as Form } from "./form/form";
export { default as Input } from "./form/input";
export { default as MaterialInput } from "./form/material-input";
export { default as PasswordStrength } from "./form/password-strength";
export { default as RadioBox } from "./form/radio-box";
export { default as StyleInput } from "./form/style-input";
export { default as Switch } from "./form/switch";
export { default as useBlockScroll } from "./hooks/use-block-scroll";
export { default as useForm } from "./hooks/use-form";
export { default as useImagePreview } from "./hooks/use-image-preview";
export { default as useKeyDown } from "./hooks/use-key-down";
export { default as useMobile } from "./hooks/use-mobile";
export { default as useOnClickOutside } from "./hooks/use-on-click-outside";
export { default as useReducer } from "./hooks/use-reducer";
export { default as useSetState } from "./hooks/use-set-state";
export { default as useWidth } from "./hooks/use-width";
export { default as FlatList } from "./list/FlatList";
export { default as Loader } from "./loader/loader";
export { default as Modal } from "./modal";
export { default as Pagination } from "./pagination";
export { default as usePagination } from "./pagination/use-pagination";
export * from "./picture/avatar";
export { default as Image } from "./picture/image";
export * from "./skeleton";
export { default as Steps } from "./steps";
export { default as Constants } from "./styles/constants";
export { default as PaperA4 } from "./styles/paper-a4";
export { default as SetupStyle } from "./styles/setup-style";
export { default as StyleSheet } from "./styles/style-sheet";
export { Tab, Tabs } from "./tabs";
export { AddressBoxItem, default as AddressBox } from "./tenants/address-box";
export { default as AllowView } from "./tenants/allow-view";
export { default as Timeline } from "./timeline/timeline";
export { default as TimelineItem } from "./timeline/timeline-item";
export * from "./typography/index";
export { default as BBCode } from "./utils/bb-code";
export { default as Bowser } from "./utils/bowser";
export { default as Console } from "./utils/console";
export { default as Dimensions } from "./utils/dimensions";
export { default as Keyboard } from "./utils/keyboard";
export { default as Portal } from "./utils/portal";

export const GlobalStyle = createGlobalStyle`
  * {
	scroll-behavior: smooth;
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
      font-stretch: extra-condensed;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
  }
`;
