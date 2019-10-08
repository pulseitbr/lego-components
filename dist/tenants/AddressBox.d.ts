import React from "react";
export declare type AddressBoxItem = {
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
declare type BindProps = {
    span: string;
    medium: string;
    isHome?: boolean;
    inlineLayout?: boolean;
    idSelectAddress: number | null;
    onChange(nrSeqEndereco: number | null): any;
};
declare type Props = {
    listGetter: () => any;
    dataSource: AddressBoxItem[];
    emptyHomeMessage: React.ReactNode;
    emptyStoreMessage: React.ReactNode;
} & Omit<BindProps, "idSelectAddress">;
declare const AddressBox: ({ dataSource, emptyHomeMessage, emptyStoreMessage, listGetter, onChange, inlineLayout, isHome, span, medium }: Props) => JSX.Element;
export default AddressBox;
