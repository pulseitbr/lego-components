import { Body, Button, Notification, Container, Modal, Page } from "lego-components";
import React, { Fragment, useState } from "react";
import useMultipleEffects from "./useMultipleEffects";
export default function App() {
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    return (
        <Page>
            <Body>
                <Container>
                    <Button onClick={() => setVisible(!visible)}>Ativa o Modal</Button>
                    <input type="text" />
                </Container>
            </Body>
            <Modal
                onClose={() => setVisible(false)}
                title="Modal de exemplo"
                visible={visible}
                footer={
                    <Fragment>
                        <Button danger onClick={() => setVisible(false)}>
                            Cancelar
                        </Button>{" "}
                        <Button success>Deu bom</Button>
                    </Fragment>
                }
            >
                AEEEEEEEEEEEEEEEEE
            </Modal>
        </Page>
    );
}
