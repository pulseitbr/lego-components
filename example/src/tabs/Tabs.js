import React, {useState} from "react";
import Tab from "./Tab";
import { Swipeable } from "react-swipeable";

const Tabs = ({children}) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label)

    
    const onClickTabItem = (tab) => {
        setActiveTab(tab)
    }
    
    return (
        <div className="tabs">
            <ol className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;
                    return <Tab activeTab={activeTab} key={label} label={label} onClick={onClickTabItem} />;
                })}
            </ol>

            <Swipeable
                onSwipedLeft={() => {
                    const itens = React.Children.toArray(children);
                    itens.forEach((x, i) => {
                        
                        if (x.props.label === activeTab) {
                            if (i + 1  < itens.length) {
                                const element = children[i + 1].props.label;
                                setActiveTab(element);
                                document.getElementsByTagName('li')[i + 1].scrollIntoView({block: "end", behavior: "smooth"});
                                return;
                            }
                            
                            if (i + 1 === itens.length) {
                                const element = children[0].props.label;
                                setActiveTab(element);
                                document.getElementsByTagName('li')[0].scrollIntoView({block: "end", behavior: "smooth"});
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


                                    document.getElementsByTagName('li')[itens.length - 1].scrollIntoView({block: "end", behavior: "smooth"});



                                    return;
                                }


                                const element = children[i - 1].props.label;
                                setActiveTab(element);
                                console.log('>>>>>>>',i);



                                document.getElementsByTagName('li')[i - 1].scrollIntoView({block: "end", behavior: "smooth"});


                            }
                        }
                    });
                }}
            >
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined;
                        return child.props.children;
                    })}
                </div>
            </Swipeable>
        </div>
    );
}

export default Tabs
