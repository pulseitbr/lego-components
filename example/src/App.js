import { Body, Button, Notification, Container, Modal, Page } from "lego-components";
import React, { Fragment, useState } from "react";
import useMultipleEffects from "./useMultipleEffects";
export default function App() {
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    useMultipleEffects([
        {
            effect() {
                document.title = `Count ${count}`;
            },
            deps: [count]
        },
        {
            effect() {
                window.addEventListener("keydown", (e) => {
                    if (e.target.nodeName.toLowerCase !== "input") {
                        Notification.info({
                            title: "Vou te ajudar",
                            children: "Calma fera, tem ajuda aqui"
                        });
                    }
                });
            },
            deps: [count]
        }
    ]);
    return (
        <Page>
            <Body>
                <Container>
                    <Button onClick={() => setCount((p) => p + 1)}>Ativa o Modal</Button>
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
