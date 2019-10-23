import { Page, Tabs, Tab } from "lego-components";
import React from "react";

export default () => {
    return (
        <Page>
            <h1>Tabs Demo</h1>
            <Tabs>
                <div label="HOME">HOME</div>
                <div label="PRODUTOS">PRODUTO</div>
                <div label="SERVIÇOS">SERVIÇOS</div>
                <div label="QUEM SOMOS">QUEM SOMOS</div>
                <div label="CONTATO">CONTATO</div>
                <div label="PORTFÓLIO">PORTFÓLIO</div>
            </Tabs>
        </Page>
    );
};
