import React, { useState, useEffect } from "react";
import { Container, View, Right, Left } from "../base";
import FlatList from "../list/FlatList";
import { SubTitle } from "../typography";
import { formatCep } from "sidekicker/lib/strings/Format";
import Radiobox from "../form/Radiobox";
import { MdHome } from "react-icons/md";
import { transparentize } from "polished";
import Theme from "../styles";
import { isEmpty } from "sidekicker/lib/comparable";

type Endereco = {
    nrSeqEndereco: number;
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

type BindProps = {
    onChange(nrSeqEndereco: number): any;
    idSelectAddress: number | null;
};

type Props = {
    dataSource: Endereco[];
} & Omit<BindProps, "idSelectAddress">;

const transparentBackground = transparentize(0.4, Theme.primaryAlpha);

const BindCard = (props: BindProps) => (endereco: Endereco) => {
    const isSelected = props.idSelectAddress === endereco.nrSeqEndereco;

    const onChange = () => {
        props.onChange(endereco.nrSeqEndereco);
    };

    return (
        <View
            span="20%"
            medium="33%"
            role="button"
            onClick={onChange}
            style={{ padding: "0.25rem", textAlign: "left", cursor: "pointer" }}
        >
            <Container
                style={{
                    padding: "0.5rem",
                    border: `1px solid ${Theme.darkAlpha}`,
                    backgroundColor: isSelected ? transparentBackground : "transparent"
                }}
            >
                <Container>
                    <Left style={{ flex: "0 0 70%" }}>
                        <SubTitle>
                            <MdHome /> {formatCep(endereco.cep)}
                        </SubTitle>
                    </Left>
                    <Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
                        <Radiobox name={`check-address-${endereco.nrSeqEndereco}`} value={isSelected} />
                    </Right>
                </Container>
                <Container>
                    <span style={{ fontSize: "0.8rem" }}>Logradouro: </span>{" "}
                    <span className="b">
                        {endereco.logradouro}, {endereco.numero}
                    </span>
                </Container>
                <Container>
                    <small>Bairro: </small> <span className="b">{endereco.bairro}</span>
                </Container>
                <Container>
                    <small>Cidade: </small> <span className="b">{endereco.cidade}</span>
                </Container>
                <Container>
                    <small>Estado: </small> <span className="b">{endereco.uf}</span>
                </Container>
            </Container>
        </View>
    );
};

const AddressCard = ({ dataSource, onChange }: Props) => {
    const [idSelectAddress, setIdSelectAddress] = useState(null as number | null);

    useEffect(() => {
        if (!isEmpty(dataSource)) {
            const id = dataSource[0].nrSeqEndereco!;
            setIdSelectAddress(id);
            onChange(id);
        }
    }, [dataSource.length]);

    const changeSelect = (id: number) => {
        setIdSelectAddress(id);
        onChange(id);
    };

    return (
        <Container>
            <FlatList
                data={dataSource}
                emptyComponent="Não possui endereços"
                key={`${dataSource.length}-flat-list-address`}
                component={BindCard({ onChange: changeSelect, idSelectAddress })}
            />
        </Container>
    );
};

export default AddressCard;
