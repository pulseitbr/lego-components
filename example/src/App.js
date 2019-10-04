import { Body, AddressCard, Container, Input, Page } from "lego-components";
import React from "react";

const addressList = [
    {
        nrSeqEndereco: 35,
        cep: "22753053",
        numero: "número",
        complemento: "Complemento",
        logradouro: "Logradouro",
        bairro: "Bairro",
        cidade: "Cidade",
        uf: "UF",
        tipoEndereco: {
            codigo: 0,
            descricao: ""
        },
        tipoLogradouro: {
            id: 0,
            descricao: ""
        }
    },
    {
        nrSeqEndereco: 36,
        cep: "22753051",
        numero: "número",
        complemento: "Complemento2",
        logradouro: "Logradouro2",
        bairro: "Bairro2",
        cidade: "Cidade2",
        uf: "UF2",
        tipoEndereco: {
            codigo: 0,
            descricao: ""
        },
        tipoLogradouro: {
            id: 0,
            descricao: ""
        }
    },
    {
        nrSeqEndereco: 35,
        cep: "22753053",
        numero: "número",
        complemento: "Complemento",
        logradouro: "Logradouro",
        bairro: "Bairro",
        cidade: "Cidade",
        uf: "UF",
        tipoEndereco: {
            codigo: 0,
            descricao: ""
        },
        tipoLogradouro: {
            id: 0,
            descricao: ""
        }
    },
    {
        nrSeqEndereco: 35,
        cep: "22753053",
        numero: "número",
        complemento: "Complemento",
        logradouro: "Logradouro",
        bairro: "Bairro",
        cidade: "Cidade",
        uf: "UF",
        tipoEndereco: {
            codigo: 0,
            descricao: ""
        },
        tipoLogradouro: {
            id: 0,
            descricao: ""
        }
    }
];

export default function App() {
    return (
        <Page>
            <Body>
                <Container>
                    <AddressCard dataSource={addressList} />
                </Container>
            </Body>
        </Page>
    );
}
