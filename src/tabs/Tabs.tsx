import React, { useState } from "react";
import { Swipeable } from "react-swipeable";
import styled from "styled-components";
import { Container, View } from "../base";
import Tab from "./Tab";

type Props = {
    children: React.ReactNode;
};

const TabList = styled.ul`
    display: flex;
    flex: 1;
    cursor: pointer;
    flex-wrap: nowrap;
    overflow-x: scroll;
    align-content: flex-start;
    border-bottom: 1px solid #ccc;

    & > li {
        display: inline-flex;
    }

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
            <View style={{ backgroundColor: "red" }} span="100%">
                <TabList>
                    {childrens.map((child: React.ReactChild) => {
                        //@ts-ignore
                        const { label } = child.props;

                        //@ts-ignore
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                                color="#00f07c"
                            />
                        );
                    })}
                </TabList>
            </View>
            <View span="100%">
                <Swipeable
                    style={{ flex: "1 0 auto" }}
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
                    {childrens.map((child: React.ReactChild) => {
                        console.log(child);
                        //@ts-ignore
                        return child.props.label !== activeTab ? undefined : child;
                    })}
                </Swipeable>
            </View>
        </Container>
    );
};

export default Tabs;
