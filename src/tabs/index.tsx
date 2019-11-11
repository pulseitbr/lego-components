//@ts-ignore
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
//@ts-ignore
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
//@ts-ignore
import TabContent from "rc-tabs/lib/SwipeableTabContent";
import React from "react";
import { Container } from "../base";
import useReducer from "../hooks/useReducer";

const defaultTabKey = "1";

const PanelContent = ({ children }: any) => <Container style={{ overflow: "auto" }}>{children}</Container>;

const initialState = {
	start: 0,
	tabKey: ""
};

const Component = () => {
	const [state, dispatch] = useReducer(initialState, {
		onChange(state: typeof initialState, action: any) {
			return { ...state, tabKey: action.key };
		},
		tick(state: typeof initialState, action: any) {
			return { ...state, start: state.start + 10 };
		}
	});
	const start = state.start;
	return (
		<div>
			<h1>Simple Tabs Component</h1>
			<p>current: {state.tabKey}</p>
			<Tabs
				destroyInactiveTabPane
				defaultActiveKey={defaultTabKey}
				//@ts-ignore
				renderTabBar={() => <ScrollableInkTabBar onTabClick={this.onTabClick} />}
				renderTabContent={() => <TabContent />}
				onChange={(key: string) => dispatch({ type: "onChange", key })}
			>
				<TabPane tab="Benefits Overview" key="1" id="test1">
					<PanelContent id={start}>Content for Benefits Overview</PanelContent>
				</TabPane>
				<TabPane tab="Drug Coverage" key="2">
					<PanelContent id={start}>Content for Drug Coverage</PanelContent>
				</TabPane>
				<TabPane tab="In-Network Pharmacies" key="3">
					<PanelContent id={start}>Content for In-Network Pharmacies</PanelContent>
				</TabPane>
				<TabPane tab="Claims" key="4">
					<PanelContent id={start}>Content for Claims</PanelContent>
				</TabPane>
				<TabPane tab="Another Tab" key="5">
					<PanelContent id={start + 4}>Panel content 4</PanelContent>
				</TabPane>
				<TabPane tab="And Another Tab" key="6">
					<PanelContent id={start + 5}>Panel content 5</PanelContent>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default function App() {
	return (
		<div className="App">
			<Component />
		</div>
	);
}
