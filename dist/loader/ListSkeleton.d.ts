import React from "react";
declare type Props = {
    itens?: number;
    loading?: boolean;
    children?: React.ReactNode;
    height?: number;
};
declare const ListSkeleton: ({ itens, height, loading, ...props }: Props) => JSX.Element;
export default ListSkeleton;
