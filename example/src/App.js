import {
    Body,
    Button,
    CircleAvatar,
    Container,
    Dropdown,
    DropdownItem,
    FlatList,
    Footer,
    Modal,
    Page,
    View
} from "lego-components";
import React, { useState } from "react";

const data = [
    {
        id: new Date().getMilliseconds() + Math.random(),
        name: "Chuck Norris",
        birthDate: "01/01/1970"
    },
    {
        id: new Date().getMilliseconds() + Math.random(),
        name: "Chuck Norris",
        birthDate: "01/01/1970"
    },
    {
        id: new Date().getMilliseconds() + Math.random(),
        name: "Chuck Norris",
        birthDate: "01/01/1970"
    }
];

export default () => {
    const [view, setView] = useState(false);
    return (
        <Page htmlTag="main">
            <Body>
                <Container>
                    <Dropdown
                        triggers={["onHover", "onClick"]}
                        itens={
                            <Container>
                                <DropdownItem>Item 1</DropdownItem>
                                <DropdownItem>Item 2</DropdownItem>
                                <DropdownItem>Item 3</DropdownItem>
                                <DropdownItem>Item 4</DropdownItem>
                            </Container>
                        }
                    >
                        <CircleAvatar size={3} src="https://www.w3schools.com/w3images/avatar5.png" />
                        Dropdown
                    </Dropdown>
                </Container>
            </Body>
            <Modal htmlTag="dialog" onClose={() => setView(false)} visible={view} title="koeeeeeee">
                AEEEEEEEEEEE
            </Modal>
            <Footer htmlTag="footer">
                <Button onClick={() => setView(true)}>Open Modal</Button>
            </Footer>
        </Page>
    );
};
