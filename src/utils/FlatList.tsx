import React, { Fragment } from "react";
import { isEmpty } from "sidekicker/lib/comparable";
export type FlatListTypes<T> = {
	data: T[];
	emptyComponent: React.ReactNode;
	component(data: T, index?: number): React.ReactNode;
	hidden?: boolean;
};

const ClosureComponent = (props: any) => (x: any, i: number) => props.component({ i, flatListCount: i, ...x });

function FlatList<E>(props: FlatListTypes<E>) {
	if (props.hidden) {
		return <Fragment />;
	}
	const hasData = !isEmpty(props.data);
	if (!hasData) {
		return <Fragment>{props.emptyComponent}</Fragment>;
	}
	if (hasData && Array.isArray(props.data)) {
		return props.data.map(ClosureComponent(props));
	}
	return <Fragment>{props.emptyComponent}</Fragment>;
}

export default FlatList;
