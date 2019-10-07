import React, { useState, useEffect } from "react";
import { Container, View, Right, Left } from "../base";
import FlatList from "../list/FlatList";
import { SubTitle } from "../typography";
import { formatCep } from "sidekicker/lib/strings/Format";
import Radiobox from "../form/Radiobox";
import { MdHome, MdStore } from "react-icons/md";
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
};

type BindProps = {
    isHome?: boolean;
    inlineLayout?: boolean;
    idSelectAddress: number | null;
    onChange(nrSeqEndereco: number | null): any;
};

type Props = {
    listGetter: () => any;
    dataSource: Endereco[];
    emptyHomeMessage: React.ReactNode;
    emptyStoreMessage: React.ReactNode;
} & Omit<BindProps, "idSelectAddress">;

const transparentBackground = transparentize(0.4, Theme.primaryAlpha);

const getIcon = (isHome: boolean) => (isHome ? <MdHome /> : <MdStore />);

const BindCard = (props: BindProps) => (endereco: Endereco) => {
    const isSelected = props.idSelectAddress === endereco.nrSeqEndereco;

    const onChange = () => props.onChange(endereco.nrSeqEndereco);

    if (!!props.inlineLayout) {
        return (
            <View
                span="50%"
                role="button"
                onClick={onChange}
                style={{ padding: "0.15rem", textAlign: "left", cursor: "pointer" }}
            >
                <Container
                    style={{
                        padding: "0.1rem",
                        border: `1px solid ${Theme.darkAlpha}`,
                        backgroundColor: isSelected ? transparentBackground : "transparent"
                    }}
                >
                    <Left style={{ flex: "0 0 70%" }}>
                        <SubTitle style={{ fontSize: "1.25rem" }}>
                            {getIcon(!!props.isHome)} {formatCep(endereco.cep)}
                        </SubTitle>
                    </Left>
                    <Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
                        <Radiobox name={`check-address-${endereco.nrSeqEndereco}`} value={isSelected} />
                    </Right>
                    <View span="100%">
                        {endereco.logradouro}, {endereco.numero}
                        {!!endereco.complemento ? `, ${endereco.complemento}` : ""}. {endereco.bairro} -{" "}
                        {endereco.cidade} - {endereco.uf}
                    </View>
                </Container>
            </View>
        );
    }

    return (
        <View
            span="33%"
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
                        <SubTitle style={{ fontSize: "1.25rem" }}>
                            {getIcon(!!props.isHome)} {formatCep(endereco.cep)}
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

const AddressBox = ({
    dataSource,
    emptyHomeMessage,
    emptyStoreMessage,
    listGetter,
    onChange,
    inlineLayout = false,
    isHome = true
}: Props) => {
    const [idSelectAddress, setIdSelectAddress] = useState(null as number | null);

    const useInlineLayout = inlineLayout || dataSource.length > 5;

    const emptyMessage = isHome ? emptyHomeMessage : emptyStoreMessage;

    useEffect(() => {
        listGetter();
    }, []);

    useEffect(() => {
        if (!isEmpty(dataSource)) {
            const id = dataSource[0].nrSeqEndereco!;
            setIdSelectAddress(id);
            onChange(id);
        } else {
            setIdSelectAddress(null);
            onChange(null);
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
                emptyComponent={emptyMessage}
                key={`${dataSource.length}-flat-list-address`}
                component={BindCard({ onChange: changeSelect, idSelectAddress, inlineLayout: useInlineLayout, isHome })}
            />
        </Container>
    );
};

export default AddressBox;
