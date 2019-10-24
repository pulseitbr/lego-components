import { Body, BBCode, Button, Container, Dropdown, DropdownItem, Footer, Modal, Page } from "lego-components";
import React, { useState } from "react";

export default () => {
    const [view, setView] = useState(false);
    const string = "[insta user='https://instagram.com']Meu número do [line]zap[/line][/zap]";
    return (
        <Page htmlTag="main">
            <Body>
                <Container>
                    {BBCode(string)}
                    <p dangerouslySetInnerHTML={{ __html: BBCode(string) }}></p>
                </Container>
            </Body>
            <Footer htmlTag="footer">
                <Button onClick={() => setView(true)}>Open Modal</Button>
            </Footer>
            <Modal htmlTag="dialog" onClose={() => setView(false)} visible={view} title="koeeeeeee">
                AEEEEEEEEEEE
            </Modal>
        </Page>
    );
};
