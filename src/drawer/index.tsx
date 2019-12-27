import { Keyboard, Colors } from "lego";
import React, { useEffect, useRef, CSSProperties } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { Container, View } from "../base";
import useKeyDown from "../hooks/useKeyDown";
import StyleSheet from "../styles/StyleSheet";
import Portal from "../utils/Portal";

type ModalPortal = {
	visible: boolean;
} & ThemedStyledFunction<"div", any, {}, never>;

const speed = 350;

const ModalPortal: any = styled.div.attrs((props: ModalPortal) => props)`
	top: 0;
	left: 0;
	z-index: 4;
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

const DrawerContainer = styled.div`
	background-color: ${Colors.light};
	display: block;
	height: 100%;
	overflow-y: auto;
	min-height: 100%;
	z-index: 5;
	min-width: ${StyleSheet.minWidthMobile};
	position: fixed;
	right: 0;
	top: 0;
	transition: ${speed}ms ease-out;
	width: 0;
`;

const styles = StyleSheet.create({
	modalMargin: {
		...StyleSheet.paddingHorizontal("0.2rem"),
		...StyleSheet.paddingVertical("0.1rem"),
		alignItems: "space-around"
	},
	closeIconStyle: { fontSize: "1.2rem" },
	closeIcon: { textAlign: "right", alignItems: "flex-end", justifyContent: "flex-end" }
});

type Props = {
	className?: string;
	style?: CSSProperties;
	visible: boolean;
	title: React.ReactNode;
	closeIcon?: React.ReactNode;
	maskClickClose?: boolean;
	closeOnEsc?: boolean;
	onClose: () => any;
	width?: string;
	children: React.ReactNode;
};

const Drawer = ({
	visible,
	closeIcon = <MdClose className="grow pointer" style={styles.closeIconStyle} />,
	title,
	style = {},
	className = "",
	maskClickClose = false,
	closeOnEsc = true,
	onClose = () => {},
	width = "60%",
	children
}: Props) => {
	const ref = useRef(null) as React.RefObject<HTMLDivElement>;

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
		setTimeout(() => onClose(), speed);
	};

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

	const onMaskClick = () => {
		if (maskClickClose) {
			close();
		}
	};

	if (!visible) {
		return null;
	}

	return (
		<Portal>
			<ModalPortal onClick={onMaskClick} visible={visible}>
				<DrawerContainer ref={ref} className={className} style={style}>
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
};

export default Drawer;
