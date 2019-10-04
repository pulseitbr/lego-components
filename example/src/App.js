import { Body, AddressCard, Container, Input, Page } from "lego-components";
import React from "react";

const addressList = [
    {
        nrSeqEndereco: 199,
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
        nrSeqEndereco: 363,
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
        nrSeqEndereco: 3521,
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
        nrSeqEndereco: 351,
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
        nrSeqEndereco: 99,
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
    const onChange = (e) => {
        console.log("Que lixo", e);
    };

    return (
        <Page>
            <Body>
                <Container>
                    <AddressCard dataSource={addressList} onChange={onChange} />
                </Container>
            </Body>
        </Page>
    );
}
