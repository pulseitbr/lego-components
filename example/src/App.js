import classNames from "classnames";
import { Colors } from "lego";
import { Button, Container, StyleSheet, Title, View } from "lego-components";
import React, { Fragment, useEffect, useRef, useState, useImperativeHandle } from "react";
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

export const TabPanel = React.forwardRef(({ children, onClose = voidFn, initialTab = 0 }, externalRef) => {
	const innerRef = useRef(null);
	const childs = React.Children.toArray(children);
	const [elements, setElements] = useState(childs);
	const [currentIndex, setCurrentIndex] = useState(initialTab);

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children]);

	const _goto = (slide) => {
		innerRef.current.slickGoTo(slide);
		setCurrentIndex(slide);
	};

	const _closeTab = (i) => {
		_goto(i > 1 ? i - 1 : 0);
		const { props } = elements[i];
		setTimeout(() => {
			onClose(props.name);
		}, 200);
	};

	const beforeChange = (_, nextSlide) => {
		setCurrentIndex(nextSlide);
	};

	const execIf = (name, callback) => {
		let index = undefined;
		elements.forEach((x, i) => (index = x.props.name === name ? i : undefined));
		if (index !== undefined) {
			callback(index);
		}
	};

	useImperativeHandle(externalRef, () => ({
		closeTab(name) {
			execIf(name, _closeTab);
		},
		goto(name) {
			execIf(name, _goto);
		}
	}));

	const setTab = (index) => innerRef.current.slickGoTo(index);

	return (
		<Fragment>
			<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
				{elements.map((x, i) => {
					const onClick = () => setTab(i);
					const close = () => _closeTab(i);
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
					ref={innerRef}
					rows={1}
					slide={"section"}
					slidesToScroll={1}
					slidesToShow={1}
					speed={600}
					waitForAnimate
				>
					{elements.map((x, i) => {
						if (i === currentIndex) {
							return x;
						}
						return <Fragment></Fragment>;
					})}
				</Slider>
			</View>
		</Fragment>
	);
});

export default function App() {
	const ref = useRef(null);
	const [show, setShow] = useState(true);

	return (
		<TabPanel ref={ref} onClose={() => setShow((e) => !e)}>
			{show && (
				<Tab name="first" color="red" title={<Fragment>AEE</Fragment>}>
					<Title>Tab 11</Title>
					<Container>
						<input
							required=""
							id="cep"
							name="cep"
							pattern="[0-9]{5}-[0-9]{3}"
							title="Informe o CEP no padrão correto"
							type="text"
							placeholder=""
						/>
						<Button
							onPress={(e) => {
								ref.current.goto("thi");
							}}
						>
							Add
						</Button>
					</Container>
				</Tab>
			)}
			<Tab name="sec" color="red" title={<Fragment>AEE</Fragment>}>
				<Title>Tab 22</Title>
				<Container>
					<Button>Add</Button>
				</Container>
			</Tab>
			<Tab name="thi" color="red" title={<Fragment>AEE</Fragment>}>
				<Title>Tab 33</Title>
				<Container>
					<Button>Add</Button>
				</Container>
			</Tab>
		</TabPanel>
	);
}
