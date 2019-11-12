import { Body, Container, Page, View, Colors, StyleSheet } from "lego-components";
import React, { Fragment, useRef, useState } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import styled from "styled-components";

const styles = StyleSheet.create({
	header: {
		padding: "0.6rem",
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

const PanelHeaderScroll = styled(View).attrs((props) => props)`
	::-webkit-scrollbar {
		height: 0.1rem;
		width: 0.1rem;
		background: ${Colors.disabled};
	}
	::-webkit-scrollbar-thumb:horizontal {
		background: ${(props) => props.scrollColor};
		border-radius: 0.1rem;
	}
`;

const Tab = (props) => {
	return <Container>{props.children}</Container>;
};

const PanelHeader = ({ currentIndex, setTab }) => ({ props }, i) => {
	const onClick = () => setTab(i);
	const active = currentIndex === i;
	const classnames = classNames("tabs-header", { active });
	return (
		<header role="button" onClick={onClick} className={classnames}>
			{props.title}
		</header>
	);
};

function TabPanel({ children, initialTab = 0, ...props }) {
	const ref = useRef(null);
	const currentIndex = useRef(initialTab);
	const childrens = React.Children.toArray(children);

	const beforeChange = (_, nextSlide) => {
		currentIndex.current = nextSlide;
	};

	const setTab = (index) => ref.current.slickGoTo(index);

	return (
		<Fragment>
			<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
				{childrens.map(PanelHeader({ currentIndex: currentIndex.current, setTab }))}
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
}

export default () => {
	return (
		<Page>
			<Body>
				<TabPanel>
					<Tab title={<h3>Tab 1</h3>}>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
						<Container>
							<h1>Body of Tab 1</h1>
						</Container>
					</Tab>
					<Tab title={<h3>Tab 2</h3>}>
						<h1>Body of Tab 2</h1>
					</Tab>
					<Tab title={<h3>Tab 3</h3>}>
						<h1>Body of Tab 3</h1>
					</Tab>
					<Tab title={<h3>Tab 4</h3>}>
						<h1>Body of Tab 4</h1>
					</Tab>
					<Tab title={<h3>Tab 5</h3>}>
						<h1>Body of Tab 5</h1>
					</Tab>
				</TabPanel>
			</Body>
		</Page>
	);
};
