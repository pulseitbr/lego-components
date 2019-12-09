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
		borderBottom: `0.5px solid ${Colors.disabled}`
	},
	view: { marginTop: "0.5rem" }
});

type PanelHeaderScrollProps = { scrollColor: string; disabledColor: string };

const PanelHeaderScroll = styled(View).attrs((props: PanelHeaderScrollProps) => props)`
	::-webkit-scrollbar {
		height: 2px;
		width: 2px;
		background: ${(props) => props.disabledColor};
	}

	::-webkit-scrollbar-thumb:horizontal {
		background: ${(props) => props.scrollColor};
		border-radius: 0.1rem;
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
	children: React.ReactNode;
	onClose?(tabName: string): void;
	onChange?(tab: string): void;
};

export const TabPanel = React.forwardRef(({ children, onChange = voidFn, onClose = voidFn }: TabPanelProps, externalRef) => {
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

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children, setElements]);

	const goto = (slide: number) => {
		setCurrentIndex(slide);
		onChangeIndex(slide);
	};

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
							const { closable, name, title, className, color = Colors.primary } = x.props as TabProps;
							const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
							const css = `tabs-header ${className}`;
							const style = currentIndex === i ? { color, fontWeight: 900, cursor: "pointer" } : { cursor: "pointer" };
							return (
								<header key={`header-key-tab-${name}`} role="button" onClick={setTab(i)} className={css} style={style}>
									{title}{" "}
									{closable && (
										<Button transparent onPress={bindClick(i)}>
											{closeIcon}
										</Button>
									)}
								</header>
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
						arrows={isMobile}
						beforeChange={beforeChange}
						dots={false}
						fade
						infinite
						ref={ref}
						rows={1}
						slide="div"
						slidesToScroll={1}
						slidesToShow={1}
						speed={700}
					>
						<Container>
							{elements.map((x: any, i: number) => {
								if (i === currentIndex) {
									return x;
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
