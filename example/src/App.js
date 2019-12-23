import { Colors } from "lego";
import { Body, Button, Container, Form, MaterialInput, Page, StyleSheet, Timeline, TimelineItem, useForm, useMobile, View } from "lego-components";
import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Slider from "react-slick";
import styled from "styled-components";

const styles = StyleSheet.create({
	header: {
		paddingTop: "0.1rem",
		paddingLeft: "0.1rem",
		paddingRight: "0.1rem",
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

const PanelHeaderScroll = styled(View).attrs((props) => props)`
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

export const Tab = ({ children }) => <View span="100%">{children}</View>;

const voidFn = () => {};

const Header = styled.header`
	cursor: pointer;
	display: inline-block;
	box-sizing: border-box;
	text-decoration: none;
	padding-left: 0.5em;
	padding-right: 0.5em;
	margin-left: 0.1em;
	margin-right: 0.1em;
	display: inline-block;
	vertical-align: middle;
	transform: perspective(1px) translateZ(0);
	position: relative;
	color: ${(props) => props.color};
	transition: font-weight 350ms cubic-bezier(.51,.22,.16,.83);

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
		transition-timing-function: cubic-bezier(.51,.22,.16,.83);
	}

	&:hover:before,
	&:focus:before,
	&:active:before {
		left: 0;
		right: 0;
	}
`;

export const Tabs = React.forwardRef(({ children, onChange = voidFn, onClose = voidFn }, externalRef) => {
	const ref = useRef(null);
	const [elements, setElements] = useState(React.Children.toArray(children));
	const [currentIndex, setCurrentIndex] = useState(0);
	const isMobile = useMobile();

	const onChangeIndex = (index) => onChange(elements[index].props.name);

	const execIf = (name, callback, timeout = 150) => {
		let index = null;
		elements.forEach((x, i) => {
			if (x.props.name === name) {
				index = i;
			}
		});
		if (index !== null) {
			setTimeout(() => callback(index), timeout);
		}
	};

	useEffect(() => {
		setElements(React.Children.toArray(children));
	}, [children, setElements]);

	const goto = (slide) => {
		setCurrentIndex(slide);
		onChangeIndex(slide);
	};

	const closeTab = (i) => {
		goto(i > 1 ? i - 1 : 0);
		const { props } = elements[i];
		setTimeout(() => {
			onClose(props.tabName);
		}, 100);
	};

	const beforeChange = (_, nextSlide) => {
		setCurrentIndex(nextSlide);
		ref.current.slickGoTo(nextSlide);
		onChangeIndex(nextSlide);
	};

	const setTab = (index) => () => {
		setCurrentIndex(index);
		onChangeIndex(index);
	};

	useImperativeHandle(externalRef, () => ({
		closeTab(name, timeout = 100) {
			execIf(name, closeTab, timeout);
		},
		goto(name, timeout = 100) {
			execIf(name, goto, timeout);
		}
	}));

	const bindClick = (index) => () => closeTab(index);

	return (
		<Fragment>
			<Container>
				<View span="100%">
					<PanelHeaderScroll scrollColor={Colors.primaryLight} span="100%" style={styles.header}>
						{elements.map((x, i) => {
							const { closable, name, title, className: cls = "", color = Colors.primary } = x.props;
							const closeIcon = typeof closable === "boolean" ? <MdClose /> : closable;
							const css = `tabs-header ${cls}`;
							const active = currentIndex === i;
							const headerProps = { className: css, active, key: `header-key-tab-${name}`, role: "button", onClick: setTab(i), color };
							return (
								<Header {...headerProps}>
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
							{elements.map((x, i) => {
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

export default function App() {
	const { state, onChange, errors, blurEvents } = useForm(
		{ email: "" },
		{
			updateOnChange: true,
			validations: {
				email: (email) => ({ isValid: email === "allan.f.garcez@gmail.com", msg: "Email não é o meu" })
			},
			blurs: { email() {} }
		}
	);

	const [tab, setTab] = useState("second");

	return (
		<Page>
			<Body>
				<Form onSubmit={(e) => console.log("SUBMIT", e)}>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa3">
						<Timeline>
							<TimelineItem color="black">AEEE</TimelineItem>
							<TimelineItem color={Colors.primary}>AEEE</TimelineItem>
							<TimelineItem color={Colors.info}>AEEE</TimelineItem>
							<TimelineItem color={Colors.danger}>AEEE</TimelineItem>
							<TimelineItem color={Colors.dangerAlpha}>AEEE</TimelineItem>
							<TimelineItem color={Colors.successLight}>AEEE</TimelineItem>
						</Timeline>
					</Container>
					<Container className="pa4">
						<MaterialInput
							required
							onInvalid={(e) => console.log(e.target.setCustomValidity(""))}
							type="email"
							name="email"
							fontSize={1}
							placeholder="Digite seu email"
							onBlur={blurEvents.email}
							onChange={onChange}
							value={state.email}
							message={
								errors.email.hasError ? (
									<span style={{ color: "red" }}>{errors.email.message}</span>
								) : (
									<span style={{ color: "green" }}>Tudo certo - {errors.email.blurEventTrigger.toString()}</span>
								)
							}
						/>
					</Container>
				</Form>
				<Container>
					<Tabs currentTab={tab} onChange={(e) => setTab(e)}>
						<Tab title="Um" name="first">
							First content
						</Tab>
						<Tab title="Dois" name="second">
							Second content
						</Tab>
						<Tab title="Três" name="third">
							Third content
						</Tab>
					</Tabs>
				</Container>
			</Body>
		</Page>
	);
}
