import React from "react";
export declare type FlatListTypes<T> = {
    data: T[] | any[];
    emptyComponent: React.ReactNode;
    component(data: T, index?: number): React.ReactNode;
    hidden?: boolean;
};
declare function FlatList<E>(props: FlatListTypes<E>): any;
export default FlatList;
