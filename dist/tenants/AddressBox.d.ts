import React from "react";
declare type Endereco = {
    nrSeqEndereco: number;
    cep: string;
    numero: string;
    complemento: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
};
declare type BindProps = {
    isHome?: boolean;
    inlineLayout?: boolean;
    idSelectAddress: number | null;
    onChange(nrSeqEndereco: number | null): any;
};
declare type Props = {
    listGetter: () => any;
    dataSource: Endereco[];
    emptyHomeMessage: React.ReactNode;
    emptyStoreMessage: React.ReactNode;
} & Omit<BindProps, "idSelectAddress">;
declare const AddressBox: ({ dataSource, emptyHomeMessage, emptyStoreMessage, listGetter, onChange, inlineLayout, isHome }: Props) => JSX.Element;
export default AddressBox;
