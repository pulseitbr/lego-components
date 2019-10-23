import { Body, Button, Container, Dropdown, DropdownItem, Footer, Modal, Page } from "lego-components";
import React, { useState } from "react";

export default () => {
    const [view, setView] = useState(false);
    return (
        <Page htmlTag="main">
            <Body>
                <Container
                    style={{
                        alignContent: "flex-end",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        textAlign: "right"
                    }}
                >
                    <Dropdown
                        position="right"
                        triggers={["onHover", "onClick"]}
                        itens={
                            <Container
                                style={{
                                    alignContent: "flex-end",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                    textAlign: "left"
                                }}
                            >
                                <DropdownItem>Item 1</DropdownItem>
                                <DropdownItem>Item 2</DropdownItem>
                                <DropdownItem>Item 3</DropdownItem>
                                <DropdownItem>Item 4</DropdownItem>
                            </Container>
                        }
                    >
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
