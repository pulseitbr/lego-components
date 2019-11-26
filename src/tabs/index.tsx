import classNames from "classnames";
import React, { Fragment, useRef, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Colors } from "lego";
import { View, Container } from "../base";
import StyleSheet from "../styles/StyleSheet";

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

const PanelHeaderScroll = styled(View).attrs((props: { scrollColor: string }) => props)`
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

export const Tab = (props: any) => <Container>{props.children}</Container>;

export const PanelHeader = ({ currentIndex, setTab }: { currentIndex: number; setTab: (e: number) => void }) => ({ props }: any, i: number) => {
	const onClick = () => setTab(i);
	const active = currentIndex === i;
	const classnames = classNames("tabs-header", ["tabs-header-active" && active]);
	return (
		<header role="button" onClick={onClick} className={classnames}>
			{props.title}
		</header>
	);
};

type TabPanelProps = {
	children: React.ReactNode;
	initialTab: number;
};
export const TabPanel = ({ children, initialTab = 0 }: TabPanelProps) => {
	const ref = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(initialTab);

	const beforeChange = (_: number, nextSlide: number) => {
		setCurrentIndex(nextSlide);
	};

	const childrens = React.Children.toArray(children);

	const setTab = (index: number) => (ref!.current! as any).slickGoTo(index);

	return (
		<Fragment>
			<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
				{childrens.map((x: any, i) => {
					const onClick = () => setTab(i);
					const active = currentIndex === i;
					const classnames = classNames("tabs-header", { "tabs-header-active": active });
					console.log(i, active, x.props.title);
					return (
						<header key={`header-key-tab-${i}`} role="button" onClick={onClick} className={classnames}>
							{x?.props?.title}
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
