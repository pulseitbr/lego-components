import { Page, Tabs, Tab, Container } from "lego-components";
import React from "react";

export default () => {
    return (
        <Page>
            <Tabs>
                <Container label="HOME">HOME</Container>
                <Container label="PRODUTOS">PRODUTO</Container>
                <Container label="SERVIÇOS">SERVIÇOS</Container>
                <Container label="QUEM SOMOS">QUEM SOMOS</Container>
                <Container label="CONTATO">CONTATO</Container>
                <Container label="PORTFÓLIO">PORTFÓLIO</Container>
            </Tabs>
        </Page>
    );
};
