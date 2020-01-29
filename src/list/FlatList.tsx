import React, { Fragment } from "react";
import { IsNotEmpty } from "lego";

export type FlatListTypes<T> = {
	data: T[];
	hidden?: boolean;
	loading?: boolean;
	emptyComponent: React.ReactNode;
	loadingComponent?: React.ReactNode;
	component: (data: T, index?: number) => any;
};

function ClosureComponent<T>({ component }: FlatListTypes<T>) {
	return (x: T, flatListKey: number) => component(x, flatListKey);
}

function FlatList<E>(props: FlatListTypes<E>) {
	if (props.hidden) {
		return <Fragment />;
	}
	if (!!props.loading && !!props.loadingComponent) {
		return <Fragment>{props.loadingComponent}</Fragment>;
	}
	if (IsNotEmpty(props.data)) {
		return <Fragment>{props.data.map(ClosureComponent<E>(props))}</Fragment>;
	}
	return <Fragment>{props.emptyComponent}</Fragment>;
}

export default FlatList;
