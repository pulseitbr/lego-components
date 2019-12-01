import { Keyboard } from "lego";
import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { Container, View } from "../base";
import useKeyDown from "../hooks/useKeyDown";
import StyleSheet from "../styles/StyleSheet";
import Portal from "../utils/Portal";

type ModalPortal = {
	speed?: number;
	visible: boolean;
} & ThemedStyledFunction<"div", any, {}, never>;

const ModalPortal: any = styled.div.attrs((props: ModalPortal) => ({
	...props,
	speed: props.speed || 500,
	visible: !!props.visible ? "block" : "none"
}))`
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	overflow: auto;
	position: fixed;
	transition: 550ms;
	display: ${(props: any) => props.visible};
	background-color: rgba(0, 0, 0, 0.65);
	animation: fading ${(props: any) => props.speed}ms forwards ease-out;

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
	background-color: #fff;
	display: block;
	height: 100%;
	max-height: 100%;
	min-width: ${StyleSheet.minWidthMobile};
	position: fixed;
	right: 0;
	top: 0;
	transition: 550ms ease-out;
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
	maskClickClose = false,
	closeOnEsc = true,
	onClose = () => {},
	width = "60%",
	children
}: Props) => {
	const ref = useRef(null);
	const toggleView = () => {
		if (ref.current !== null) {
			if (visible) {
				(ref.current! as any).style.width = width;
			} else {
				(ref.current! as any).style.width = 0;
			}
		}
	};

	useKeyDown((event: any) => {
		if (event.keyCode === Keyboard.esc && closeOnEsc) {
			onClose();
		}
	}, []);

	useEffect(() => {
		toggleView();
	}, [ref, width, visible]);

	const onMaskClick = () => {
		if (maskClickClose) {
			onClose();
		}
	};

	if (!visible) {
		return null;
	}

	return (
		<Portal>
			<ModalPortal onClick={onMaskClick} visible={visible}>
				<DrawerContainer ref={ref}>
					<Container style={styles.modalMargin}>
						<View span="95%" xsmall="90%" small="90%">
							{title}
						</View>
						<View role="button" onClick={onClose} style={styles.closeIcon} span="3%" xsmall="3%" small="3%">
							{closeIcon}
						</View>
					</Container>
					<Container style={styles.modalMargin}>{children}</Container>
				</DrawerContainer>
			</ModalPortal>
		</Portal>
	);
};

export default Drawer;
