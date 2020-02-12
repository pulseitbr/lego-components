import { Container } from "../base";
import Button from "../button";
import useMobile from "../hooks/use-mobile";
import { Colors } from "lego";
//@ts-ignore
import TabContainer, { TabPane } from "rc-tabs";
//@ts-ignore
import SwipeableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
//@ts-ignore
import TabContent from "rc-tabs/lib/TabContent";
import React from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

const contentStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "auto",
	userSelect: "text" as "text",
	backgroundColor: "transparent"
};

type TabProps = {
	children: React.ReactNode;
	className?: string;
	closable?: boolean | React.ReactNode;
	color?: string;
	onClose?(): any;
	name: string;
	title: React.ReactNode;
};
type HeaderProps = { color: string };

const Header = styled.span<HeaderProps>`
	color: ${(props: any) => props.color};
	cursor: pointer;
	font-size: 1.05rem;
	margin-left: 0.1em;
	margin-right: 0.1em;
	padding-left: 0.5em;
	padding-right: 0.5em;
	position: relative;
	text-decoration: none;
	transform: perspective(1px) translateZ(0);
	transition: font-weight 350ms cubic-bezier(0.51, 0.22, 0.16, 0.83);
	vertical-align: middle;
`;

const selectStyle = { userSelect: "text" as "text", zIndex: "auto" as "auto" };

const onPressClose = (maybeFunction?: Function) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	e.stopPropagation();
	if (!!maybeFunction) {
		maybeFunction();
	}
};

export const Tab: React.FC<TabProps> = ({ title, onClose, closable, name, className = "", children, color = Colors.primary }) => {
	return (
		<TabPane
			key={name}
			tab={
				<Container className="justify-center" style={selectStyle}>
					<Header color={color} className={className}>
						{title}
						{closable && (
							<Button className="ml2" transparent onPress={onPressClose(onClose)}>
								<MdClose />
							</Button>
						)}
					</Header>
				</Container>
			}
		>
			<Container style={selectStyle}>{children}</Container>
		</TabPane>
	);
};

type TabsProps = {
	inkBarColor?: string;
	onChange?(tab: string): void;
	currentTab?: string;
	tabBarPosition?: "left" | "right" | "top" | "bottom";
};

const voidFn = () => {};
export const Tabs: React.FC<TabsProps> = ({ onChange, inkBarColor = Colors.primary, children, currentTab = "", tabBarPosition = "top" }) => {
	const isMobile = useMobile();
	const childrenMap = Array.isArray(children) ? children : React.Children.toArray(children);
	const pageSize = isMobile ? 2 : childrenMap.length;
	const tabPaneList = React.Children.toArray(children).map(({ props }: any) => {
		const { children: view, title, name, className = "", closable = false, color = Colors.primary, onClose = voidFn } = props as TabProps;
		return (
			<TabPane
				key={name}
				tab={
					<Container className="justify-center">
						<Header color={color} className={className}>
							{title}
							{closable && (
								<Button className="ml2" transparent onPress={onPressClose(onClose)}>
									<MdClose />
								</Button>
							)}
						</Header>
					</Container>
				}
			>
				<Container style={contentStyle}>{view}</Container>
			</TabPane>
		);
	});

	return (
		<Container>
			<TabContainer
				onChange={onChange}
				activeKey={currentTab}
				destroyInactiveTabPane
				renderTabBar={() => <SwipeableInkTabBar pageSize={pageSize} styles={{ inkBar: { backgroundColor: inkBarColor } }} />}
				renderTabContent={() => <TabContent />}
				tabBarPosition={tabBarPosition}
			>
				{tabPaneList}
			</TabContainer>
		</Container>
	);
};
