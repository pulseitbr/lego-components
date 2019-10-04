import React from "react";
import { Container, View, Right } from "../base";
import FlatList from "../list/FlatList";
import { SubTitle } from "../typography";
import { formatCep } from "sidekicker/lib/strings/Format";

type Endereco = {
    nrSeqEndereco: number | null;
    cep: string;
    numero: string;
    complemento: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    tipoEndereco: {
        codigo: number;
        descricao: "";
    };
    tipoLogradouro: {
        id: number;
        descricao: "";
    };
};

type Props = {
    dataSource: Endereco[];
};

const BindCard = (endereco: Endereco) => (
    <View span="25%" style={{ backgroundColor: "red" }}>
        <Container>
            <Left>
                <SubTitle>{formatCep(endereco.cep)}</SubTitle>
            </Left>
            <Right>
                <Radiobox></Radioxox>
            </Right>
        </Container>
    </View>
);

const AddressCard = ({ dataSource }: Props) => {
    return (
        <Container>
            <FlatList
                data={dataSource}
                component={BindCard}
                emptyComponent="Não possui endereços"
                key={`${dataSource.length}-flat-list-address`}
            />
        </Container>
    );
};

export default AddressCard;
