import { Colors, Keyboard } from "lego";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { useOnClickOutside } from "..";
import { Container, View } from "../base";
import useBlockScroll from "../hooks/useBlockScroll";
import useKeyDown from "../hooks/useKeyDown";
import StyleSheet, { zIndex } from "../styles/StyleSheet";
import Portal from "../utils/Portal";

type ModalPortal = {
	visible: boolean;
} & ThemedStyledFunction<"div", any, {}, never>;

const speed = 450;

const styles = StyleSheet.create({
	modalMargin: {
		...StyleSheet.paddingHorizontal("0.2rem"),
		...StyleSheet.paddingVertical("0.1rem"),
		alignItems: "space-around"
	},
	closeIconStyle: { fontSize: "1.2rem" },
	closeIcon: { textAlign: "right", alignItems: "flex-start", marginTop: "0.8rem", justifyContent: "flex-end" }
});

const ModalPortal = styled.div.attrs((props: ModalPortal) => props)`
	top: 0;
	left: 0;
	z-index: ${zIndex.overlayMask};
	width: 100%;
	height: 100%;
	overflow: auto;
	position: fixed;
	transition: ${speed};
	display: block;
	background-color: rgba(0, 0, 0, 0.65);
	animation: fading ${speed}ms forwards ease-out;

	@keyframes fading {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

const DrawerContainer: any = styled(Container)<HTMLDivElement>`
	background-color: ${Colors.light};
	display: block;
	height: 100%;
	overflow-y: auto;
	min-height: 100%;
	z-index: ${zIndex.notifications};
	min-width: ${StyleSheet.minWidthMobile};
	position: absolute;
	right: 0;
	top: 0;
	transition: ${speed}ms ease-out;
	width: 0;
`;

type Props = {
	visible: boolean;
	title: React.ReactNode;
	closeIcon?: React.ReactNode;
	maskClickClose?: boolean;
	closeOnEsc?: boolean;
	onClose: () => any;
	width?: string;
	blockOuterScroll?: boolean;
	children: React.ReactNode;
} & HTMLDivElement;

const Drawer = React.forwardRef(
	(
		{
			visible,
			closeIcon = <MdClose className="grow pointer" style={styles.closeIconStyle} />,
			title,
			blockOuterScroll = true,
			maskClickClose = false,
			closeOnEsc = true,
			onClose = () => {},
			width = "60%",
			children,
			...htmlDivProps
		}: Props,
		externalRef
	) => {
		const ref = useRef(null) as React.RefObject<HTMLDivElement>;
		const onMaskClick = () => {
			if (maskClickClose) {
				close();
			}
		};

		const show = () => {
			ref.current!.style.width = width;
			ref.current!.style.minWidth = StyleSheet.minWidthMobile;
		};

		const hide = () => {
			ref.current!.style.width = "0";
			ref.current!.style.minWidth = "0";
		};

		const close = () => {
			hide();
			setTimeout(onClose, speed);
		};

		useOnClickOutside(ref, onMaskClick);
		useImperativeHandle(externalRef, () => ref.current);
		useBlockScroll(blockOuterScroll ? visible : false);

		const toggleView = () => {
			if (ref.current !== null) {
				if (visible) {
					show();
				} else {
					hide();
				}
			}
		};

		useKeyDown((event: any) => {
			if (event.keyCode === Keyboard.esc && closeOnEsc) {
				close();
			}
		}, []);

		useEffect(() => {
			toggleView();
		}, [ref, width, visible]);

		if (!visible) {
			return null;
		}

		return (
			<Portal>
				<ModalPortal visible={visible}>
					<DrawerContainer {...htmlDivProps} ref={ref}>
						<Container style={styles.modalMargin}>
							<View span="95%" xsmall="90%" small="90%">
								{title}
							</View>
							<View role="button" onClick={close} style={styles.closeIcon} span="3%" xsmall="3%" small="3%">
								{closeIcon}
							</View>
						</Container>
						<Container style={{ ...styles.modalMargin, overflowY: "auto" }}>{children}</Container>
					</DrawerContainer>
				</ModalPortal>
			</Portal>
		);
	}
);

export default Drawer;
