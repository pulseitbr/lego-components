import { Colors } from "lego";
import { Body, useForm, Button, CheckBox as RadioBox, StyleSheet, Container, Form, MaterialInput, Page, useMobile, View } from "lego-components";
import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
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

export const Tab = ({ children }: TabProps) => <View span="100%">{children}</View>;

const voidFn = () => {};

export const TabPanel = React.forwardRef(({ children, onChange = voidFn, onClose = voidFn }, externalRef) => {
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
							const { closable, name, title, className, color = Colors.primary } = x.props;
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
	return (
		<Page>
			<Body>
				<Form onSubmit={(e) => console.log("SUBMIT", e)}>
					<Container>
						<RadioBox>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
						<RadioBox checked>
							{" "}
							<span class="ml1">AEE</span>{" "}
						</RadioBox>
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
			</Body>
		</Page>
	);
}
