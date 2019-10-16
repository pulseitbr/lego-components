import { AddressBox, Body, Button, CheckBox, Container, Footer, Modal, Page, View } from "lego-components";
import React, { Fragment, useState } from "react";
import Drawer from "./modal";

export default function App() {
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [id, setId] = useState(0);
    const [collapse, setCollapse] = useState(false);
    const [check, setCheck] = useState(false);
    // const [count, setCount] = useState(0);
    // useMultipleEffects([
    //     {
    //         effect() {
    //             document.title = `Count ${count}`;
    //         },
    //         deps: [count]
    //     },
    //     {
    //         effect() {
    //             window.addEventListener("keydown", (e) => {
    //                 if (e.target.nodeName.toLowerCase !== "input") {
    //                     // define trigger sequences
    //                     // Notification.info({
    //                     //     title: "Vou te ajudar",
    //                     //     children: "Calma fera, tem ajuda aqui"
    //                     // });
    //                 }
    //             });
    //         },
    //         deps: [count]
    //     }
    // ]);

    return (
        <Page>
            <Body>
                <Button onClick={() => setVisible((p) => !p)}>Click</Button>
                <Drawer visible={visible}>AEEEEE</Drawer>
            </Body>
            <Footer>Footer</Footer>
        </Page>
    );
}
