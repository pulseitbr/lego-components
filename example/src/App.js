import classNames from "classnames";
import { Colors } from "lego";
import { Button, Container, StyleSheet, Title, View } from "lego-components";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import styled from "styled-components";

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

const PanelHeaderScroll = styled(View)`
	::-webkit-scrollbar {
		height: 2px;
		width: 2px;
		background: ${Colors.disabled};
	}
	::-webkit-scrollbar-thumb:horizontal {
		background: ${(props) => props.scrollColor};
		border-radius: 0.1rem;
	}
`;

export const Tab = (props) => <View span="100%">{props.children}</View>;

export const PanelHeader = ({ currentIndex, setTab }) => (props, i) => {
	const onClick = () => setTab(i);
	const active = currentIndex === i;
	const classnames = classNames("tabs-header", ["tabs-header-active" && active]);
	return (
		<header role="button" onClick={onClick} className={classnames}>
			{props.title}
		</header>
	);
};

const voidFn = (a) => {};
export const TabPanel = ({ children, onClose = voidFn, initialTab = 0 }) => {
	const ref = useRef(null);
	const [elements, setElements] = useState(React.Children.toArray(children));
	const [currentIndex, setCurrentIndex] = useState(initialTab);

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children]);

	const goto = (slide) => {
		ref.current.slickGoTo(slide);
		setCurrentIndex(slide);
	};

	const closeTab = (i) => {
		goto(i > 1 ? i - 1 : 0);
		const { props } = elements[i];
		setTimeout(() => {
			onClose(props.name);
		}, 200);
	};

	const beforeChange = (_, nextSlide) => {
		setCurrentIndex(nextSlide);
	};

	const setTab = (index) => ref.current.slickGoTo(index);

	return (
		<Fragment>
			<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
				{elements.map((x, i) => {
					const onClick = () => setTab(i);
					const close = () => closeTab(i);
					const { closable, className, color = Colors.primary } = x.props;
					const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
					const css = classNames("tabs-header", className);
					const style = currentIndex === i ? { color, borderBottom: `2px solid ${color}` } : {};
					return (
						<header key={`header-key-tab-${i}`} role="button" onClick={onClick} className={css} style={style}>
							<Fragment>
								{x.props.title}{" "}
								{closable && (
									<Button transparent onPress={close}>
										{closeIcon}
									</Button>
								)}
							</Fragment>
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
					ref={ref}
					rows={1}
					slide={Container}
					slidesToScroll={1}
					slidesToShow={1}
					speed={500}
					waitForAnimate
				>
					{children}
				</Slider>
			</View>
		</Fragment>
	);
};

export default function App() {
	const [t, setT] = useState([]);

	const onClose = (i) => setT((p) => p.filter((x) => i !== x));

	return (
		<TabPanel onClose={onClose}>
			<Tab name="first" color="red" title={<Fragment>AEE</Fragment>}>
				<Title>Tab 01</Title>
				<Container>
					<Button onPress={() => setT((p) => p.concat(`element-${t.length + 1}`))}>Add</Button>
				</Container>
			</Tab>
			{t.map((x) => (
				<Tab key={x} name={x} title={<Fragment>{x}</Fragment>} closable>
					<Title>Tab 01 - {x}</Title>
				</Tab>
			))}
		</TabPanel>
	);
}
