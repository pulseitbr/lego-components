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
import { SOFT_RADIUS } from "../styles/Constants";

export type AddressBoxItem = {
    nomeLoja: string;
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
    span: string;
    medium: string;
    isHome?: boolean;
    inlineLayout?: boolean;
    idSelectAddress: number | null;
    onChange(nrSeqEndereco: number | null): any;
};

type Props = {
    listGetter: () => any;
    dataSource: AddressBoxItem[];
    emptyHomeMessage: React.ReactNode;
    emptyStoreMessage: React.ReactNode;
} & Omit<BindProps, "idSelectAddress">;

const transparentBackground = transparentize(0.4, Theme.primaryAlpha);

const getIcon = (isHome: boolean) => (isHome ? <MdHome /> : <MdStore />);

const BindCard = (props: BindProps) => (addr: AddressBoxItem) => {
    const isSelected = props.idSelectAddress === addr.nrSeqEndereco;

    const onChange = () => props.onChange(addr.nrSeqEndereco);

    if (!!props.inlineLayout) {
        return (
            <View
                key={`address-box-item-${addr.nrSeqEndereco}`}
                span={props.span}
                role="button"
                onClick={onChange}
                style={{ padding: "0.15rem", textAlign: "left", cursor: "pointer" }}
            >
                <Container
                    style={{
                        padding: "0.1rem",
                        borderRadius: SOFT_RADIUS,
                        border: `1px solid ${Theme.darkAlpha}`,
                        backgroundColor: isSelected ? transparentBackground : "transparent"
                    }}
                >
                    <Left style={{ flex: "0 0 70%" }}>
                        <SubTitle style={{ fontSize: "1.25rem" }}>
                            {getIcon(!!props.isHome)} {!!addr.nomeLoja ? `${addr.nomeLoja} - ` : ""}
                            {formatCep(addr.cep)}
                        </SubTitle>
                    </Left>
                    <Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
                        <Radiobox name={`check-address-${addr.nrSeqEndereco}`} value={isSelected} />
                    </Right>
                    <View span="100%">
                        {addr.logradouro}, {addr.numero}
                        {!!addr.complemento ? `, ${addr.complemento}` : ""}. {addr.bairro} -{" "}
                        {addr.cidade} - {addr.uf}
                    </View>
                </Container>
            </View>
        );
    }

    return (
        <View
            role="button"
            span={props.span}
            onClick={onChange}
            medium={props.medium}
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
                            {getIcon(!!props.isHome)} {formatCep(addr.cep)}
                        </SubTitle>
                    </Left>
                    <Right style={{ flex: "0 0 30%", textAlign: "right", justifyContent: "flex-end" }}>
                        <Radiobox name={`check-address-${addr.nrSeqEndereco}`} value={isSelected} />
                    </Right>
                </Container>
                <Container>
                    <span style={{ fontSize: "0.8rem" }}>Logradouro: </span>{" "}
                    <span className="b">
                        {addr.logradouro}, {addr.numero}
                    </span>
                </Container>
                <Container>
                    <small>Bairro: </small> <span className="b">{addr.bairro}</span>
                </Container>
                <Container>
                    <small>Cidade: </small> <span className="b">{addr.cidade}</span>
                </Container>
                <Container>
                    <small>Estado: </small> <span className="b">{addr.uf}</span>
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
    isHome = true,
    span,
    medium
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
                component={BindCard({
                    onChange: changeSelect,
                    idSelectAddress,
                    inlineLayout: useInlineLayout,
                    isHome,
                    span,
                    medium
                })}
            />
        </Container>
    );
};

export default AddressBox;
