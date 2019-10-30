import React, { useState } from "react";
import Tab from "./Tab";
import { Swipeable } from "react-swipeable";
import styled from "styled-components";

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const onClickTabItem = (tab) => {
        setActiveTab(tab);
    };

    const Wrapper = styled.div`
        width: 100%;
    `;

    const TabList = styled.ol`
        border-bottom: 1px solid #ccc;
        width: 100%;
        padding-left: 0;
        cursor: pointer;
        overflow: hidden;
        overflow-x: scroll;
        display: flex;
        flex-wrap: nowrap;
        ::-webkit-scrollbar { 
            display: none; /* Chrome Safari */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE 10+ */
            overflow-y:scroll;
            overflow-x:hidden;
          }
    `;

    const TabContent = styled.div`
        padding: 20px;
    `

    return (
        <Wrapper>
            <TabList>
                {children.map((child) => {
                    const { label } = child.props;
                    return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
                })}
            </TabList>
            <Swipeable
                onSwipedLeft={() => {
                    const itens = React.Children.toArray(children);
                    itens.forEach((x, i) => {
                        if (x.props.label === activeTab) {
                            if (i + 1 < itens.length) {
                                const element = children[i + 1].props.label;
                                setActiveTab(element);
                                document
                                    .getElementsByTagName("li")
                                    [i + 1].scrollIntoView({ block: "end", behavior: "smooth" });
                                return;
                            }
                            if (i + 1 === itens.length) {
                                const element = children[0].props.label;
                                setActiveTab(element);
                                document
                                    .getElementsByTagName("li")[0]
                                    .scrollIntoView({ block: "end", behavior: "smooth" });
                            }
                        }
                    });
                }}
                onSwipedRight={() => {
                    const itens = React.Children.toArray(children);
                    itens.forEach((x, i) => {
                        console.log(i, itens.length);
                        if (x.props.label === activeTab) {
                            if (i < itens.length) {
                                if (i === 0) {
                                    const element = children[itens.length - 1].props.label;
                                    setActiveTab(element);
                                    document
                                        .getElementsByTagName("li")
                                        [itens.length - 1].scrollIntoView({ block: "end", behavior: "smooth" });
                                    return;
                                }
                                const element = children[i - 1].props.label;
                                setActiveTab(element);
                                document
                                    .getElementsByTagName("li")
                                    [i - 1].scrollIntoView({ block: "end", behavior: "smooth" });
                            }
                        }
                    });
                }}
            >
                <TabContent>
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </TabContent>
            </Swipeable>
        </Wrapper>
    );
};

export default Tabs;
