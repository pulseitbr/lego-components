import { Colors, Keyboard } from "lego";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { MdClose } from "react-icons/md";
import styled, { ThemedStyledFunction } from "styled-components";
import { Fade } from "../animation/styled-animations";
import { Container, View } from "../base";
import useBlockScroll from "../hooks/use-block-scroll";
import useKeyDown from "../hooks/use-key-down";
import useOnClickOutside from "../hooks/use-on-click-outside";
import StyleSheet, { zIndex } from "../styles/style-sheet";
import Portal from "../utils/portal";

type ModalPortal = {
	visible: boolean;
	maskColor: string;
} & ThemedStyledFunction<"div", any, {}, never>;

const speed = 450;

const DrawerPortal = styled.div.attrs((props: ModalPortal) => props)`
	top: 0;
	left: 0;
	z-index: ${zIndex.overlayMask};
	width: 100%;
	height: 100%;
	overflow: auto;
	position: fixed;
	transition: ${speed};
	display: block;
	background-color: ${(props) => props.maskColor || "rgba(0, 0, 0, .65)"};
	animation: ${Fade} ${speed}ms forwards ease-out;
`;

const DrawerContainer: any = styled(Container)`
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
	blockOuterScroll?: boolean;
	bodyClassName?: string;
	children: React.ReactNode;
	className?: string;
	closeIcon?: React.ReactNode;
	closeOnEsc?: boolean;
	maskClickClose?: boolean;
	maskColor?: string;
	onClose(): any;
	title: React.ReactNode;
	titleClassName?: string;
	visible: boolean;
	width?: string;
};

const Drawer = React.forwardRef(
	(
		{
			blockOuterScroll = true,
			bodyClassName = "",
			children,
			closeIcon = <MdClose className="grow tr items-start pointer fsn1 justify-end mt2" />,
			closeOnEsc = true,
			maskClickClose = false,
			onClose = () => {},
			title,
			titleClassName = "",
			visible,
			width = "60%",
			...htmlDivProps
		}: Props,
		externalRef
	) => {
		const ref = useRef(null) as React.RefObject<HTMLDivElement>;

		const onMaskClick = () => {
			if (maskClickClose && visible) {
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

		useImperativeHandle(externalRef, () => ref.current);
		useOnClickOutside(ref, onMaskClick);
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
				<DrawerPortal maskColor="rgba(0, 0, 0, 0.65)" visible={visible}>
					<DrawerContainer {...htmlDivProps} ref={ref}>
						<Container className="pa3 bg-transparent">
							<Container className={titleClassName}>
								<View span="95%" xsmall="90%" small="90%">
									{title}
								</View>
								<View className="fsn1" role="button" onClick={close} span="3%" xsmall="3%" small="3%">
									{closeIcon}
								</View>
							</Container>
							<Container className={`overflow-y-auto ${bodyClassName}`}>{children}</Container>
						</Container>
					</DrawerContainer>
				</DrawerPortal>
			</Portal>
		);
	}
);

export default Drawer;
