import { Colors } from "lego";
import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import styled from "styled-components";
import { Container, View } from "../base";
import Button from "../button/Button";
import useMobile from "../hooks/useMobile";
import StyleSheet from "../styles/StyleSheet";

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
	view: { marginTop: "0.5rem" }
});

type PanelHeaderScrollProps = { scrollColor: string; disabledColor: string };

const PanelHeaderScroll = styled(View).attrs((props: PanelHeaderScrollProps) => props)`
	::-webkit-scrollbar {
		height: 2px !important;
		width: 2px !important;
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

const Header = styled.header<HeaderProps>`
	box-sizing: border-box;
	color: ${(props) => props.color};
	cursor: pointer;
	display: inline-block;
	display: inline-block;
	font-size: 1.25rem;
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
	const isMobile = useMobile();

	const onChangeIndex = (index: number) => onChange(elements[index].props.name as string);

	const execIf = (name: string, callback: (index: number) => void, timeout = 150) => {
		let index: any = null;
		elements.forEach((x: any, i: number) => {
			if (x.props.name === name) {
				index = i;
			}
		});
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
		<Fragment>
			<Container>
				<View span="100%">
					<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
						{elements.map((x: any, i: number) => {
							const { closable, name, title, className: cls = "", color = Colors.primary } = x.props;
							const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
							const css = `tabs-header ${cls}`;
							const active = currentIndex === i;
							const headerProps = { className: css, active, role: "button", onClick: setTab(i), color };
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
		</Fragment>
	);
});
