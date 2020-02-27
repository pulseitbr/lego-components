import { useEffect, useState } from "react";

export type UsePaginationProps<T> = {
	dataSource: T[];
	itensPerPage?: number;
};

export type PaginationType<T> = {
	page: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	list: T[];
	setPage(page: number): any;
	nextPage(): any;
	prevPage(): any;
};

function usePagination<T>({ itensPerPage = 15, dataSource }: UsePaginationProps<T>) {
	const [list, setList] = useState([] as T[]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		const newList = dataSource.slice(page * itensPerPage, (page + 1) * itensPerPage);
		setList(newList);
	}, [dataSource, page]);

	return {
		page,
		hasNextPage: list.length === itensPerPage,
		hasPreviousPage: page >= 1,
		list,
		setPage,
		nextPage: () => setPage((p) => (list.length === itensPerPage ? p + 1 : p)),
		prevPage: () => setPage((p) => (p < 1 ? 1 : p - 1))
	};
}

export default usePagination;
