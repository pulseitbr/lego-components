import React, { Fragment, useState, useEffect } from "react";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";

const TabPanel = styled.div`
	position: relative;
	overflow-x: hidden;
`;

const Tab = styled.div.attrs({
	role: "tab",
	tabIndex: 0
})`
	display: inline-block;
	cursor: pointer;
	padding: 0.5em 1.25em;

	&:first-child {
		padding-left: 0;
	}
	&:focus {
		outline: none;
	}
`;

const Tabs = ({ items, currentTab, onChange }) => {
	const [previousTab, setPreviousTab] = useState(1);
	useEffect(() => {}, [currentTab]);

	const trans = useTransition(items[currentTab], (p) => p.key, {
		unique: true,
		from: (tab) => ({
			transform: `translate3d(${(currentTab - previousTab) * 100}%,0,0)`,
			position: "static"
		}),
		enter: {
			transform: "translate3d(0%,0,0)",
			position: "static"
		},
		leave: (tab) => ({
			transform: `translate3d(${(previousTab - currentTab) * 100}%,0,0)`,
			zIndex: 1,
			position: "absolute",
			boxShadow: "0px 0px 5px #000"
		})
	});
	if (currentTab !== previousTab) {
		setPreviousTab(currentTab);
	}
	return (
		<Fragment>
			<div>
				{items.map((item, tabIndex) => (
					<Tab key={tabIndex} onClick={() => onChange(item)} selected={tabIndex === currentTab}>
						{item.label}
					</Tab>
				))}
			</div>
			<TabPanel>
				{trans.map(({ item, props, key }) => (
					<animated.div key={key} style={{ ...props, width: "100%", height: "auto" }} onClick={() => onChange(currentTab)}>
						{item.component}
					</animated.div>
				))}
			</TabPanel>
		</Fragment>
	);
};

export default function App() {
	const [previousTab, setPreviousTab] = useState("first");

	return (
		<div className="App">
			<Tabs
				currentTab={previousTab}
				onChange={setPreviousTab}
				items={[
					{
						label: "TAB",
						key: "first",
						component: "AAAAAAAAAAAAAAAA"
					},
					{
						label: "TAB",
						key: "second",
						component: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
					},
					{
						label: "TAB",
						key: "third",
						component: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"
					}
				]}
			/>
		</div>
	);
}
