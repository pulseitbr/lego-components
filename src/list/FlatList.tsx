import React, { Fragment } from "react";
import { IsNotEmpty } from "lego";

export type FlatListTypes<T> = {
	data: T[];
	hidden?: boolean;
	loading?: boolean;
	emptyComponent: React.ReactNode;
	loadingComponent?: React.ReactNode[];
	component: (data: T, index?: number) => React.ReactNode;
};

function ClosureComponent<T>(props: FlatListTypes<T>) {
	return (x: T, flatListKey: number) => props.component(x, flatListKey);
}

function FlatList<E>(props: FlatListTypes<E>) {
	const hasData = IsNotEmpty(props.data);
	if (props.hidden) {
		return <Fragment />;
	}
	if (!!props.loading && !!props.loadingComponent) {
		return <Fragment>{props.loadingComponent}</Fragment>;
	}
	if (!hasData) {
		return <Fragment>{props.emptyComponent}</Fragment>;
	}
	if (hasData && Array.isArray) {
		return <Fragment>{props.data.map(ClosureComponent<E>(props))}</Fragment>;
	}
	return <Fragment>{props.emptyComponent}</Fragment>;
}

export default FlatList;
