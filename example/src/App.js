import { Body, Container, Input, Page } from "lego-components";
import React from "react";

export default function App() {
    return (
        <Page>
            <Body>
                <Container>
                    <Input mask="cellTelephone"></Input>
                </Container>
            </Body>
        </Page>
    );
}
