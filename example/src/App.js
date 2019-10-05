import { Body, Button, Container, Modal, Page } from "lego-components";
import React, { useState } from "react";

export default function App() {
    const [visible, setVisible] = React.useState(false);
    return (
        <Page>
            <Body>
                <Container>
                    <Button onClick={() => setVisible((p) => !p)}>Ativa o Modal</Button>
                </Container>
            </Body>
            <Modal title="Modal de exemplo" visible={visible}>
                AEEEEEEEEEEEEEEEEE
            </Modal>
        </Page>
    );
}
