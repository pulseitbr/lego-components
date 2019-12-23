import React, { useRef, useEffect, useState, useImperativeHandle, Fragment } from "react";
import Slider from "react-slick";
import { Colors } from "lego";
import { MdClose } from "react-icons/md";
import useMobile from "../hooks/useMobile";
import Button from "../button/Button";
import styled from "styled-components";
import { View, Container } from "../base";
import StyleSheet from "../styles/StyleSheet";
import useWidth from "../hooks/useWidth";

const styles = StyleSheet.create({
	header: {
		padding: "0.1rem",
		flexDirection: "row",
		display: "inline-flex",
		overflow: "auto",
		whiteSpace: "nowrap",
		width: "100%",
		flexShrink: 0,
		flexWrap: "nowrap",
		borderBottom: `0.5px solid ${Colors.disabledAlpha}`
	},
	view: { marginTop: "0.5rem", width: "100%", maxWidth: "100%" }
});

type PanelHeaderScrollProps = { scrollColor: string; disabledColor: string; widthDevice: number };

const PanelHeaderScroll = styled(View).attrs((props: PanelHeaderScrollProps) => props)`
	overflow-x: auto;
	width: auto;
	margin: auto;
	display: flex;
	min-width: 320px;
	max-width: ${(props) => props.widthDevice * 0.9}px;
	white-space: nowrap;

	::-webkit-scrollbar {
		height: 1px !important;
		width: 1px !important;
		background: ${(props) => props.disabledColor} !important;
	}

	::-webkit-scrollbar-thumb:horizontal {
		background: ${(props) => props.scrollColor} !important;
		border-radius: 0.1rem !important;
	}
`;

type TabProps = {
	color?: string;
	title: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	closable?: boolean | React.ReactNode;
	name: string;
};

export const Tab = ({ children }: TabProps) => <View span="100%">{children}</View>;

const voidFn = () => {};

type TabPanelProps = {
	transition?: number;
	children: React.ReactNode;
	currentTab?: string;
	onClose?(tabName: string): void;
	onChange?(tab: string): void;
};

type HeaderProps = { color: string; active: boolean };

const Header = styled.li<HeaderProps>`
	color: ${(props) => props.color};
	cursor: pointer;
	font-size: 1.05rem;
	margin-left: 0.1em;
	margin-right: 0.1em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	position: relative;
	text-decoration: none;
	transform: perspective(1px) translateZ(0);
	transition: font-weight 350ms cubic-bezier(0.51, 0.22, 0.16, 0.83);
	vertical-align: middle;

	&:before {
		content: "";
		position: absolute;
		z-index: -1;
		left: ${(props) => (props.active ? "0" : "51%")};
		right: ${(props) => (props.active ? "0" : "51%")};
		bottom: 0;
		background: ${(props) => props.color};
		height: 2px;
		transition-property: left, right;
		transition-duration: 350ms;
		transition-timing-function: cubic-bezier(0.51, 0.22, 0.16, 0.83);
	}

	&:hover:before,
	&:focus:before,
	&:active:before {
		left: 0;
		right: 0;
	}
`;

export const TabPanel = React.forwardRef(({ children, transition, currentTab, onChange = voidFn, onClose = voidFn }: TabPanelProps, externalRef) => {
	const ref = useRef(null) as any;
	const [elements, setElements] = useState(React.Children.toArray(children)) as any;
	const [currentIndex, setCurrentIndex] = useState(0);
	const width = useWidth();
	const isMobile = useMobile();

	const onChangeIndex = (index: number) => onChange(elements[index].props.name as string);

	const execIf = (name: string, callback: (index: number) => void, timeout = 150) => {
		const index = elements.reduce((acc: any, x: any, i: number) => {
			if (x.props.name === name) {
				return i;
			}
			return acc;
		}, null);
		if (index !== null) {
			setTimeout(() => callback(index!), timeout);
		}
	};

	const goto = (slide: number) => {
		setCurrentIndex(slide);
		onChangeIndex(slide);
	};

	useEffect(() => {
		if (!!currentTab) {
			execIf(currentTab, goto, 100);
		}
	}, [currentTab]);

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children, setElements]);

	const closeTab = (i: number) => {
		goto(i > 1 ? i - 1 : 0);
		const { props } = elements[i];
		setTimeout(() => {
			onClose(props.tabName);
		}, 100);
	};

	const beforeChange = (_: number, nextSlide: number) => {
		setCurrentIndex(nextSlide);
		ref.current!.slickGoTo(nextSlide);
		onChangeIndex(nextSlide);
	};

	const setTab = (index: number) => () => {
		setCurrentIndex(index);
		onChangeIndex(index);
	};

	useImperativeHandle(externalRef, () => ({
		closeTab(name: string, timeout = 100) {
			execIf(name, closeTab, timeout);
		},
		goto(name: string, timeout = 100) {
			execIf(name, goto, timeout);
		}
	}));

	const bindClick = (index: number) => () => closeTab(index);

	return (
		<Container>
			<Container>
				<View span="100%">
					<PanelHeaderScroll widthDevice={width} scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
						{elements.map((x: any, i: number) => {
							const { closable, name, title, className: cls = "", color = Colors.primary } = x.props;
							const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
							const css = `${cls} tabs-header`;
							const active = currentIndex === i;
							const headerProps = {
								className: css,
								active,
								role: "button",
								onClick: setTab(i),
								color
							};
							return (
								<Header key={`header-tab-${name}`} {...headerProps}>
									{title}{" "}
									{closable && (
										<Button transparent onPress={bindClick(i)}>
											{closeIcon}
										</Button>
									)}
								</Header>
							);
						})}
					</PanelHeaderScroll>
				</View>
				<View span="100%" style={styles.view}>
					<Slider
						accessibility
						swipe={isMobile}
						swipeToSlide={isMobile}
						touchMove={isMobile}
						arrows={false}
						beforeChange={beforeChange}
						dots={false}
						fade
						infinite
						className="z-auto"
						ref={ref}
						rows={1}
						slide="div"
						slidesToScroll={1}
						slidesToShow={1}
						speed={transition}
					>
						<Container>
							{elements.map((x: any, i: number) => {
								if (i === currentIndex) {
									return <Container style={{ userSelect: "text", zIndex: "auto" }}>{x}</Container>;
								}
								return <Fragment key={`miss-key-tab-${x.props.name}`} />;
							})}
						</Container>
					</Slider>
				</View>
			</Container>
		</Container>
	);
});
