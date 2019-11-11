import { lighten } from "polished";
import React, { CSSProperties, useEffect } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { TypeContainer, View } from "../base";
import useBlockScroll from "../hooks/useBlockScroll";
import Theme from "../styles";
import ReactPortal from "../utils/Portal";
import StyleSheet from "../styles/StyleSheet";
import { HtmlTag } from "../@types";
import Keyboard from "../utils/Keyboard";

const lightenClose = lighten(0.6);

const ModalPortal = styled.div.attrs((props: any) => ({
	...props,
	speed: props.speed,
	visible: !!props.visible ? "block" : "none",
	paddingVertical: props.paddingVertical || "3rem"
}))`
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	overflow: auto;
	position: fixed;
	padding-top: ${(props) => props.paddingVertical};
	padding-bottom: ${(props) => props.paddingVertical};
	display: ${(props) => props.visible};
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

const ModalContent = styled.dialog.attrs((props: Content) => props)`
	background-color: ${Theme.lightLight};
	margin: auto;
	min-width: ${StyleSheet.minWidthMobile};
	max-width: 100%;
	overflow-y: hidden;
	width: ${(props) => props.width};
	border: 1px solid ${Theme.darkAlpha};
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
	visible?: boolean;
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

const Modal = ({
	visible = false,
	width = "60%",
	footer,
	onClose,
	maskPaddingVertical = "3rem",
	headerProps = defaultModalPartProps,
	bodyProps = defaultModalPartProps,
	footerProps = defaultModalPartProps,
	title,
	closeColor = "#121212",
	closeOnEsc = true,
	children,
	animationTime = 950
}: Props) => {
	const toggleVisibility = (e: KeyboardEvent) => {
		if (e.keyCode === Keyboard.esc && closeOnEsc) {
			onClose();
		}
	};

	useBlockScroll(visible);

	useEffect(() => {
		window.addEventListener("keydown", toggleVisibility);
		return () => window.removeEventListener("keydown", toggleVisibility);
	}, []);

	const onClickMask = (e: any) => {
		e.stopPropagation();
		onClose();
	};

	const onModalClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		event.persist();
		event.stopPropagation();
	};

	const headerViewProps = {
		...headerProps,
		style: {
			borderBottom: `${StyleSheet.hairlineWidth} solid ${Theme.darkAlpha}`,
			...defaultModalPartProps.style,
			...headerProps.style
		}
	};
	const bodyViewProps = { ...bodyProps, style: { ...defaultModalPartProps.style, ...bodyProps.style } };
	const footerViewProps = {
		...footerProps,
		style: { textAlign: "right" as "right", ...defaultModalPartProps.style, ...footerProps.style }
	};

	if (!visible) {
		return null;
	}

	return (
		<ReactPortal>
			<ModalPortal
				onClick={onClickMask}
				visible={visible}
				maskPaddingVertical={maskPaddingVertical}
				speed={animationTime}
			>
				<ModalContent open={visible} onClick={onModalClick} width={width}>
					<View {...headerViewProps}>
						<Close color={closeColor} onClick={onClose}>
							<MdClose />
						</Close>
						{title}
					</View>
					<View {...bodyViewProps}>{children}</View>
					{!!footer && <View {...footerViewProps}>{footer}</View>}
				</ModalContent>
			</ModalPortal>
		</ReactPortal>
	);
};

export default Modal;
