import { IsEmpty } from "lego";
import useReducer from "../hooks/use-reducer";
import { useCallback, useEffect } from "react";

type Props<T> = {
	itensPerPage: number;
	initialPage: number;
	dataSource: T[];
	page: number;
};

type State<T> = { chunk: T[]; page: number; range: number[] };

const createRange = (start: number, end = 0, steps = 1) => {
	const arr = [];
	if (end === 0) {
		for (let i = 0; i < start; i += steps) {
			arr.push(i);
		}
	} else {
		for (let i = start; i < end; i += steps) {
			arr.push(i);
		}
	}
	return arr;
};

const paginate = <T>(array: T[] = [], page: number, range: number) => [...array].splice(page * range, range);

const dispatches = {
	setChunk(state: State<unknown>, action: any) {
		return { ...state, chunk: action.list, range: action.range };
	},
	setViewPage(state: State<unknown>, action: any) {
		return { ...state, page: action.page };
	},
	goForward(state: State<unknown>) {
		return { ...state, page: state.page + 1 };
	},
	goBackward(state: State<unknown>) {
		return { ...state, page: state.page - 1 };
	}
};

export type TypePagination<T> = {
	range: number[];
	pages: number;
	goForward: () => void;
	goBackward: () => void;
	list: T[];
	page: number;
	isFirst: boolean;
	isLast: boolean;
	setPage: (pageParameter: number) => void;
	totalItens: number;
};

const usePagination = <T>({ itensPerPage = 5, initialPage = 0, dataSource = [] }: Props<T>): TypePagination<T> => {
	const [{ chunk, page, range }, dispatch] = useReducer({ chunk: [], page: initialPage, range: [] }, dispatches);

	const pages = Math.ceil(dataSource.length / itensPerPage);
	const emptyData = IsEmpty(dataSource);

	useEffect(() => {
		if (emptyData) {
			dispatch({ type: "setChunk", range: [], list: [] });
		} else {
			const effectRange = createRange(0, pages);
			dispatch({ type: "setChunk", range: effectRange, list: paginate(dataSource, page, itensPerPage) });
		}
	}, [dataSource, page, itensPerPage]);

	const setViewPage = useCallback(
		(pageParameter) => {
			dispatch({ type: "setViewPage", page: pageParameter });
		},
		[page]
	);

	const goForward = useCallback(() => dispatch({ type: "goForward" }), [page]);

	const goBackward = useCallback(() => dispatch({ type: "goBackward" }), [page]);

	return {
		range,
		pages,
		goForward,
		goBackward,
		list: chunk,
		page: page,
		isFirst: emptyData ? true : page === 0,
		isLast: emptyData ? true : page === pages - 1,
		setPage: setViewPage,
		totalItens: dataSource.length
	};
};

export default usePagination;
