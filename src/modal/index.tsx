import { Colors } from "@pulseitbr/lego";
import { lighten } from "polished";
import React, { CSSProperties, useCallback, useEffect, useRef, useImperativeHandle } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { HtmlTag } from "../@types";
import { TypeContainer, View } from "../base";
import useBlockScroll from "../hooks/use-block-scroll";
import StyleSheet, { zIndex } from "../styles/style-sheet";
import Keyboard from "../utils/keyboard";
import ReactPortal from "../utils/portal";
import useOnClickOutside from "../hooks/use-on-click-outside";

const lightenClose = lighten(0.6);

const ModalPortal = styled.div.attrs(({ visible = false, ...props }: any) => ({
	...props,
	speed: props.speed,
	visible: visible,
	paddingVertical: props.paddingVertical || "3rem"
}))`
	display: ${(props) => (props.visible ? "block" : "none")};
	top: 0;
	left: 0;
	z-index: ${zIndex.notifications};
	width: 100%;
	height: 100%;
	overflow: auto;
	position: fixed;
	padding-top: ${(props) => props.paddingVertical};
	padding-bottom: ${(props) => props.paddingVertical};
	background-color: rgba(0, 0, 0, 0.65);
	animation: fading ${(props) => props.speed}ms forwards ease-out;

	@keyframes fading {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

type Content = ThemedStyledFunction<"div", any, any, any> & { width: string | number };

const ModalContent = styled.div.attrs((props: Content) => props)`
	background-color: ${Colors.lightLight};
	margin: auto;
	z-index: ${zIndex.overlayMask};
	min-width: ${StyleSheet.minWidthMobile};
	max-width: 100%;
	overflow-y: hidden;
	width: ${(props) => props.width};
	border: 1px solid ${Colors.darkAlpha};
`;

const Close = styled.span`
	color: ${(props) => props.color};
	font-size: 1.35rem;
	font-weight: bold;
	margin-top: -10px;
	float: right;

	&:hover,
	&:focus {
		color: ${(props) => lightenClose(props.color!)};
		text-decoration: none;
		cursor: pointer;
	}
`;

type Props = {
	htmlTag?: HtmlTag;
	closeColor?: string;
	onClose: () => any;
	title?: React.ReactNode;
	footer?: React.ReactNode;
	closeIcon?: React.ReactNode;
	visible: boolean;
	closeOnMask?: boolean;
	children: React.ReactNode;
	animationTime?: number;
	width?: string | number;
	headerProps?: Partial<TypeContainer>;
	bodyProps?: Partial<TypeContainer>;
	closeOnEsc?: boolean;
	maskPaddingVertical?: string;
	footerProps?: Partial<TypeContainer>;
} & React.HTMLAttributes<HTMLDivElement>;

const defaultModalPartProps = {
	span: "100%",
	style: {
		padding: "1rem"
	} as CSSProperties
} as Partial<TypeContainer>;

const Modal = React.forwardRef(
	(
		{
			visible,
			width = "60%",
			closeOnMask = true,
			footer,
			closeIcon = <MdClose />,
			onClose,
			maskPaddingVertical = "3rem",
			headerProps = defaultModalPartProps,
			bodyProps = defaultModalPartProps,
			footerProps = defaultModalPartProps,
			title,
			closeColor = Colors.dark,
			closeOnEsc = true,
			children,
			animationTime = 950
		}: Props,
		externalRef
	) => {
		const toggleVisibility = useCallback((e: KeyboardEvent) => {
			if (e.keyCode === Keyboard.esc && closeOnEsc) {
				if (visible) {
					onClose();
				}
			}
		}, []);

		const ref = useRef(null);

		useImperativeHandle(externalRef, () => ref.current);
		useBlockScroll(!!visible);

		const onClickMask = (e: any) => {
			if (closeOnMask && visible) {
				e.stopPropagation();
				onClose();
			}
		};
		useOnClickOutside(ref, onClickMask);

		useEffect(() => {
			window.addEventListener("keydown", toggleVisibility);
			return () => window.removeEventListener("keydown", toggleVisibility);
		}, [toggleVisibility]);

		const onModalClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
			event.persist();
			event.stopPropagation();
		};

		const headerViewProps = {
			...headerProps,
			style: {
				borderBottom: `${StyleSheet.hairlineWidth} solid ${Colors.darkAlpha}`,
				justifyContent: "space-between",
				...defaultModalPartProps.style,
				...headerProps.style
			}
		};
		const bodyViewProps = { ...bodyProps, style: { ...defaultModalPartProps.style, ...bodyProps.style } };
		const footerViewProps = {
			...footerProps,
			style: { textAlign: "right" as "right", ...defaultModalPartProps.style, ...footerProps.style }
		};

		return (
			<ReactPortal>
				<ModalPortal visible={visible} maskPaddingVertical={maskPaddingVertical} speed={animationTime}>
					<ModalContent ref={ref} onClick={onModalClick} width={width}>
						<View {...headerViewProps}>
							{title}
							<Close color={closeColor} onClick={onClose}>
								{closeIcon}
							</Close>
						</View>
						<View {...bodyViewProps}>{children}</View>
						{!!footer && <View {...footerViewProps}>{footer}</View>}
					</ModalContent>
				</ModalPortal>
			</ReactPortal>
		);
	}
);

export default Modal;
