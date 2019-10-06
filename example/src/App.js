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
            <Modal
                onClose={() => setVisible(false)}
                title="Modal de exemplo"
                visible={visible}
                footer={
                    <Button danger onClick={() => setVisible(false)}>
                        Cancelar
                    </Button>
                }
            >
                AEEEEEEEEEEEEEEEEE
            </Modal>
        </Page>
    );
}
