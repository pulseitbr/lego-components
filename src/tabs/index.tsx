import classNames from "classnames";
import { Colors } from "lego";
import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import styled from "styled-components";
import { Container, View } from "../base";
import Button from "../button/Button";
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
		borderBottom: "0.5px solid #eee"
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
	initialTab?: number;
};

export const TabPanel = React.forwardRef(({ children, onClose = voidFn, initialTab = 0 }: TabPanelProps, externalRef) => {
	const ref = useRef(null) as any;
	const [elements, setElements] = useState(React.Children.toArray(children)) as any;
	const [currentIndex, setCurrentIndex] = useState(initialTab);

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children]);

	const _goto = (slide: number) => {
		ref.current!.slickGoTo(slide);
		setCurrentIndex(slide);
	};

	const _closeTab = (i: number) => {
		_goto(i > 1 ? i - 1 : 0);
		const { props } = elements[i];
		setTimeout(() => {
			onClose(props.tabName);
		}, 200);
	};

	const beforeChange = (_: number, nextSlide: number) => setCurrentIndex(nextSlide);

	const setTab = (index: number) => () => ref.current.slickGoTo(index);

	const execIf = (name: string, callback: (index: number) => void) => {
		let index = null;
		elements.forEach((x: any, i: number) => (index = x.props.name === name ? i : null));
		if (index !== null) {
			callback(index);
		}
	};

	useImperativeHandle(externalRef, () => ({
		closeTab(name: string) {
			execIf(name, _closeTab);
		},
		goto(name: string) {
			execIf(name, _goto);
		}
	}));

	const bindClick = (index: number) => () => _closeTab(index);

	return (
		<Fragment>
			<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
				{elements.map((x: any, i: number) => {
					const { closable, name, title, className, color = Colors.primary } = x.props as TabProps;
					const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
					const css = classNames("tabs-header", className);
					const style = currentIndex === i ? { color, borderBottom: `2px solid ${color}` } : {};
					return (
						<header key={`header-key-tab-${name}`} role="button" onClick={setTab(i)} className={css} style={style}>
							{title}{" "}
							{closable && (
								<Button transparent onPress={bindClick}>
									{closeIcon}
								</Button>
							)}
						</header>
					);
				})}
			</PanelHeaderScroll>
			<View span="100%" style={styles.view}>
				<Slider
					accessibility
					arrows={false}
					beforeChange={beforeChange}
					dots={false}
					draggable
					fade
					infinite
					initialSlide={initialTab}
					// @ts-ignore
					ref={ref}
					rows={1}
					slide={Container}
					slidesToScroll={1}
					slidesToShow={1}
					speed={500}
					waitForAnimate
				>
					{elements.map((x: any, i: number) => {
						if (i === currentIndex) {
							return x;
						}
						return <Fragment key={`miss-key-tab-${x.props.name}`}> </Fragment>;
					})}
				</Slider>
			</View>
		</Fragment>
	);
});
