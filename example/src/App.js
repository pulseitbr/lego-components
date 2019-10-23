import { Body, Button, Notification, Container, Modal, Page, AddressBox, View, Form, Input } from "lego-components";
import React, { Fragment, useState, useEffect } from "react";

import Tabs from "./tabs/Tabs";


const dataSource = [
    {
        nrSeqEndereco: 36,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Avenida Rua Logradouro de Nome grande com mais coisa",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 3,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 6,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 61,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 68,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 86,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    },
    {
        nrSeqEndereco: 5,
        cep: "22753053",
        numero: "0",
        complemento: null,
        logradouro: "Rua dos bobos",
        bairro: "Esmero",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    }
];
export default function App() {
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [id, setId] = useState(0);
    const [collapse, setCollapse] = useState(false);
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

    const changeListSize = () => {
        setList(dataSource);
    };

    return (
        <Page>
            {/* <Body isCollapse show={collapse}>
                <Container>
                    <View span="70%">
                        <AddressBox
                            span="100%"
                            medium="100%"
                            isHome
                            onChange={setId}
                            dataSource={list}
                            // inlineLayout={true}
                            listGetter={changeListSize}
                            emptyHomeMessage={
                                <span>
                                    Você não possui endereços cadastrados.{" "}
                                    <a href="#/linkCadastro">Clique aqui para cadastrar</a>
                                </span>
                            }
                            emptyStoreMessage="Não possuem lojas cadastradas para a entrega"
                        />
                    </View>
                </Container>
                <Container>Endereço selecionado {id}</Container>
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
            <Container>
                <Button onPress={() => setCollapse(!collapse)} square={true}>Collapse all</Button>
                
            </Container> */}

            <h1>Tabs Demo</h1>

            <Tabs>
                <div label="HOME">
                    <h3>Bem vindo a nossa empresa</h3>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quos perferendis placeat,
                        perspiciatis fuga eius dolorum, dicta amet adipisci saepe quis ipsam, odit sit? Deleniti iure
                        consequuntur nobis iusto itaque inventore et quidem commodi aperiam eos ex, eligendi blanditiis
                        nihil laudantium unde aliquid dolores dolore corrupti magnam ipsam, architecto amet.
                    </p>
                </div>
                <div label="PRODUTOS">
                    <h3>Alguns dos nossos produtos:</h3>
                    <br />
                    <div className="produto_box">
                        <div className="produto"></div>
                        <div className="produto"></div>
                        <div className="produto"></div>
                    </div>
                    <div className="produto_box">
                        <div className="produto"></div>
                        <div className="produto"></div>
                        <div className="produto"></div>
                    </div>
                    <div className="produto_box">
                        <div className="produto"></div>
                        <div className="produto"></div>
                        <div className="produto"></div>
                    </div>
                </div>
                <div label="SERVIÇOS">SERVIÇOS</div>
                <div label="QUEM SOMOS">QUEM SOMOS</div>
                <div label="CONTATO">CONTATO</div>
                <div label="PORTFÓLIO">PORTFÓLIO</div>
            </Tabs>
        </Page>
    );
}
