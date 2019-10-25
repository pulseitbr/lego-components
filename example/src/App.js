import { BBCode, Drawer, Body, Button, Container, Footer, Modal, Page, Notification } from "lego-components";
import React, { useState } from "react";

export default () => {
    const [view, setView] = useState(false);
    const string = "[face page='allangarcez']Meu número do zap[/zap]";
    Notification.danger({
        title: "Parabéns",
        icon: "ZiFud30",
        children: "Você falhou"
    });
    return (
        <React.StrictMode>
            <Page htmlTag="main">
                <Body>
                    <Container>
                        {BBCode(string)}
                        <span dangerouslySetInnerHTML={{ __html: BBCode(string) }}></span>
                    </Container>
                </Body>
                <Footer htmlTag="footer">
                    <Button onClick={() => setView(true)}>Open Modal</Button>
                </Footer>
                <Modal htmlTag="dialog" onClose={() => setView(false)} visible={view} title="koeeeeeee">
                    AEEEEEEEEEEE
                </Modal>
            </Page>
            <Drawer>AEEEEE</Drawer>
        </React.StrictMode>
    );
};
