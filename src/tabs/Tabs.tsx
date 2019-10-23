import React, { useState } from "react";
import { Swipeable } from "react-swipeable";
import styled from "styled-components";
import { Container } from "../base";
import Tab from "./Tab";

type Props = {
    children: React.ReactNode;
};

const TabList = styled.ul`
    border-bottom: 1px solid #ccc;
    width: 100%;
    padding-left: 0;
    cursor: pointer;
    overflow: hidden;
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    ::-webkit-scrollbar {
        display: none;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-y: scroll;
        overflow-x: hidden;
    }
`;

const Tabs = ({ children }: Props) => {
    const childrens = React.Children.toArray(children);
    //@ts-ignore
    const [activeTab, setActiveTab] = useState(childrens[0]!.props.label);

    const onClickTabItem = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <Container>
            <TabList>
                {childrens.map((child: React.ReactChild) => {
                    //@ts-ignore
                    const { label } = child.props;
                    return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
                })}
            </TabList>
            <Swipeable
                onSwipedLeft={() => {
                    childrens.forEach((x: any, i) => {
                        const currentElement = x.props;
                        if (currentElement.label === activeTab) {
                            if (i + 1 < childrens.length) {
                                //@ts-ignore
                                const element = childrens[i + 1]!.props.label;
                                setActiveTab(element);
                                return;
                            }
                            if (i + 1 === childrens.length) {
                                //@ts-ignore
                                const firstElement = childrens[0]!.props.label;
                                setActiveTab(firstElement);
                            }
                        }
                    });
                }}
                onSwipedRight={() => {
                    childrens.forEach((x: any, i) => {
                        const currentElement = x.props;
                        if (currentElement.label === activeTab) {
                            if (i < childrens.length) {
                                if (i === 0) {
                                    //@ts-ignore
                                    const element = childrens[childrens.length - 1]!.props.label;
                                    setActiveTab(element);
                                    return;
                                }
                                //@ts-ignore
                                const element = childrens[i - 1]!.props.label;
                                setActiveTab(element);
                            }
                        }
                    });
                }}
            >
                <Container>
                    {childrens.map((child: React.ReactChild) => {
                        //@ts-ignore
                        return child.props.label !== activeTab ? undefined : child.props.children;
                    })}
                </Container>
            </Swipeable>
        </Container>
    );
};

export default Tabs;
