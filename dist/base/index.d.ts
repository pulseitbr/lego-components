import React from "react";
declare type Value = number | string;
export declare type LegoMediaQuery = {
    span?: Value;
    xsmall?: Value;
    small?: Value;
    medium?: Value;
    large?: Value;
    xlarge?: Value;
};
export declare type TypeContainer = LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: Value;
};
declare type ResponsiveProps = {
    isCollapse?: boolean;
    show?: boolean;
};
export declare const Left: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Right: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const View: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Container: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {
    fit: boolean;
    defaultChecked?: boolean | undefined;
    defaultValue?: string | number | string[] | undefined;
    suppressContentEditableWarning?: boolean | undefined;
    suppressHydrationWarning?: boolean | undefined;
    accessKey?: string | undefined;
    className?: string | undefined;
    contentEditable?: boolean | undefined;
    contextMenu?: string | undefined;
    dir?: string | undefined;
    draggable?: boolean | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    placeholder?: string | undefined;
    slot?: string | undefined;
    spellCheck?: boolean | undefined;
    style?: React.CSSProperties | undefined;
    tabIndex?: number | undefined;
    title?: string | undefined;
    inputMode?: string | undefined;
    is?: string | undefined;
    radioGroup?: string | undefined;
    role?: string | undefined;
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCapitalize?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    color?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    'aria-activedescendant'?: string | undefined;
    'aria-atomic'?: boolean | "false" | "true" | undefined;
    'aria-autocomplete'?: "none" | "inline" | "list" | "both" | undefined;
    'aria-busy'?: boolean | "false" | "true" | undefined;
    'aria-checked'?: boolean | "false" | "true" | "mixed" | undefined;
    'aria-colcount'?: number | undefined;
    'aria-colindex'?: number | undefined;
    'aria-colspan'?: number | undefined;
    'aria-controls'?: string | undefined;
    'aria-current'?: boolean | "time" | "false" | "true" | "page" | "step" | "location" | "date" | undefined;
    'aria-describedby'?: string | undefined;
    'aria-details'?: string | undefined;
    'aria-disabled'?: boolean | "false" | "true" | undefined;
    'aria-dropeffect'?: "link" | "none" | "copy" | "execute" | "move" | "popup" | undefined;
    'aria-errormessage'?: string | undefined;
    'aria-expanded'?: boolean | "false" | "true" | undefined;
    'aria-flowto'?: string | undefined;
    'aria-grabbed'?: boolean | "false" | "true" | undefined;
    'aria-haspopup'?: boolean | "dialog" | "menu" | "false" | "true" | "listbox" | "tree" | "grid" | undefined;
    'aria-hidden'?: boolean | "false" | "true" | undefined;
    'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined;
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-level'?: number | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined;
    'aria-modal'?: boolean | "false" | "true" | undefined;
    'aria-multiline'?: boolean | "false" | "true" | undefined;
    'aria-multiselectable'?: boolean | "false" | "true" | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined;
    'aria-owns'?: string | undefined;
    'aria-placeholder'?: string | undefined;
    'aria-posinset'?: number | undefined;
    'aria-pressed'?: boolean | "false" | "true" | "mixed" | undefined;
    'aria-readonly'?: boolean | "false" | "true" | undefined;
    'aria-relevant'?: "text" | "additions" | "additions text" | "all" | "removals" | undefined;
    'aria-required'?: boolean | "false" | "true" | undefined;
    'aria-roledescription'?: string | undefined;
    'aria-rowcount'?: number | undefined;
    'aria-rowindex'?: number | undefined;
    'aria-rowspan'?: number | undefined;
    'aria-selected'?: boolean | "false" | "true" | undefined;
    'aria-setsize'?: number | undefined;
    'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: {
        __html: string;
    } | undefined;
    onCopy?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onCopyCapture?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onCut?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onCutCapture?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onPaste?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onPasteCapture?: ((event: React.ClipboardEvent<any>) => void) | undefined;
    onCompositionEnd?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onCompositionEndCapture?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onCompositionStart?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onCompositionStartCapture?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onCompositionUpdate?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onCompositionUpdateCapture?: ((event: React.CompositionEvent<any>) => void) | undefined;
    onFocus?: ((event: React.FocusEvent<any>) => void) | undefined;
    onFocusCapture?: ((event: React.FocusEvent<any>) => void) | undefined;
    onBlur?: ((event: React.FocusEvent<any>) => void) | undefined;
    onBlurCapture?: ((event: React.FocusEvent<any>) => void) | undefined;
    onChange?: ((event: React.FormEvent<any>) => void) | undefined;
    onChangeCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onBeforeInput?: ((event: React.FormEvent<any>) => void) | undefined;
    onBeforeInputCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onInput?: ((event: React.FormEvent<any>) => void) | undefined;
    onInputCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onReset?: ((event: React.FormEvent<any>) => void) | undefined;
    onResetCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onSubmit?: ((event: React.FormEvent<any>) => void) | undefined;
    onSubmitCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onInvalid?: ((event: React.FormEvent<any>) => void) | undefined;
    onInvalidCapture?: ((event: React.FormEvent<any>) => void) | undefined;
    onLoad?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onError?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onErrorCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onKeyDown?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onKeyDownCapture?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onKeyPress?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onKeyPressCapture?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onKeyUp?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onKeyUpCapture?: ((event: React.KeyboardEvent<any>) => void) | undefined;
    onAbort?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onAbortCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onCanPlay?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onCanPlayCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onCanPlayThrough?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onCanPlayThroughCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onDurationChange?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onDurationChangeCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEmptied?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEmptiedCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEncrypted?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEncryptedCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEnded?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onEndedCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadedData?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadedDataCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadedMetadata?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadedMetadataCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadStart?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onLoadStartCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPause?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPauseCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPlay?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPlayCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPlaying?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onPlayingCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onProgress?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onProgressCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onRateChange?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onRateChangeCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSeeked?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSeekedCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSeeking?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSeekingCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onStalled?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onStalledCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSuspend?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSuspendCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onTimeUpdate?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onTimeUpdateCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onVolumeChange?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onVolumeChangeCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onWaiting?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onWaitingCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onAuxClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onAuxClickCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onClickCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onContextMenu?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onContextMenuCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onDoubleClick?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onDoubleClickCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onDrag?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragEnd?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragEndCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragEnter?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragEnterCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragExit?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragExitCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragLeave?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragLeaveCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragOver?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragOverCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragStart?: ((event: React.DragEvent<any>) => void) | undefined;
    onDragStartCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onDrop?: ((event: React.DragEvent<any>) => void) | undefined;
    onDropCapture?: ((event: React.DragEvent<any>) => void) | undefined;
    onMouseDown?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseDownCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseEnter?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseLeave?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseMove?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseMoveCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseOut?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseOutCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseOver?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseOverCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseUp?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onMouseUpCapture?: ((event: React.MouseEvent<any, MouseEvent>) => void) | undefined;
    onSelect?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onSelectCapture?: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
    onTouchCancel?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchCancelCapture?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchEnd?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchEndCapture?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchMove?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchMoveCapture?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchStart?: ((event: React.TouchEvent<any>) => void) | undefined;
    onTouchStartCapture?: ((event: React.TouchEvent<any>) => void) | undefined;
    onPointerDown?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerDownCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerMove?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerMoveCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerUp?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerUpCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerCancel?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerCancelCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerEnter?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerEnterCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerLeave?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerLeaveCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerOver?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerOverCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerOut?: ((event: React.PointerEvent<any>) => void) | undefined;
    onPointerOutCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onGotPointerCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onGotPointerCaptureCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onLostPointerCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onLostPointerCaptureCapture?: ((event: React.PointerEvent<any>) => void) | undefined;
    onScroll?: ((event: React.UIEvent<any>) => void) | undefined;
    onScrollCapture?: ((event: React.UIEvent<any>) => void) | undefined;
    onWheel?: ((event: React.WheelEvent<any>) => void) | undefined;
    onWheelCapture?: ((event: React.WheelEvent<any>) => void) | undefined;
    onAnimationStart?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onAnimationStartCapture?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onAnimationEnd?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onAnimationEndCapture?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onAnimationIteration?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onAnimationIterationCapture?: ((event: React.AnimationEvent<any>) => void) | undefined;
    onTransitionEnd?: ((event: React.TransitionEvent<any>) => void) | undefined;
    onTransitionEndCapture?: ((event: React.TransitionEvent<any>) => void) | undefined;
}, "style" | "title" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "className" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "hidden" | "id" | "lang" | "placeholder" | "slot" | "spellCheck" | "tabIndex" | "inputMode" | "is" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "color" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "children" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "fit">;
export declare const Page: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Body: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export declare const Footer: import("styled-components").StyledComponent<({ isCollapse, show, children, ...props }: LegoMediaQuery & React.HTMLAttributes<HTMLDivElement> & {
    time?: string | number | undefined;
} & ResponsiveProps) => JSX.Element, any, {}, never>;
export {};
