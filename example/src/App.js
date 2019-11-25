import { Colors, Uuid, IsEmpty } from "lego";
import { Button, Container, Loader, Right, StyleSheet, Title, useReducer, View } from "lego-components";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { MdAdd, MdRemove } from "react-icons/md";
import { Fragment } from "react";
import { useMemo } from "react";

const reactKey = (key, record) => record[key] || Uuid();

const createRange = (start, end = 0, steps = 1) => {
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

const paginate = (array = [], page, range) => [...array].splice(page * range, range);

const dispatches = {
	setChunk(state, action) {
		return { ...state, chunk: action.list, range: action.range };
	},
	setViewPage(state, action) {
		return { ...state, page: action.page };
	},
	goForward(state) {
		return { ...state, page: state.page + 1 };
	},
	goBackward(state) {
		return { ...state, page: state.page - 1 };
	}
};

const usePagination = ({ itensPerPage = 5, initialPage = 0, dataSource = [] }) => {
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

const Table = styled.table`
	width: 100%;
	border-spacing: 0;
	border-collapse: collapse;

	tr:nth-child(even) {
		background-color: var(--light);
	}

	th {
		background: var(--primary);
		color: white;
		font-weight: bold;
	}

	td,
	th {
		padding: 0.625rem 0;
		border: 0.5px solid var(--darkLightest);
		border-top: 0;
		text-align: left;
		font-size: 1rem;
	}

	.expand-td {
		text-align: center;
	}

	@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
		table {
			width: 100%;
		}

		table,
		thead,
		tbody,
		th,
		td,
		tr {
			display: block;
		}

		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		tr {
			border: 1px solid var(--dark);
		}

		td {
			border: none;
			border-bottom: 1px solid var(--darkLightest);
			position: relative;
			padding-left: 50%;
		}

		td:before {
			position: absolute;
			top: 0.375rem;
			left: 0.375rem;
			width: 45%;
			padding-right: 0.625rem;
			white-space: nowrap;
			content: attr(fluid-data);
			color: var(--dark);
			font-weight: bold;
		}

		.expand-td {
			text-align: left;
		}
	}
`;

const voidFn = (record, index, data) => ({});

const styles = StyleSheet.create({
	loaderTd: { border: "1px solid transparent", padding: 0 },
	loaderDiv: {
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center"
	},
	paginateButton: {
		flex: 1,
		padding: "0.6rem",
		borderRadius: 0,
		...StyleSheet.marginHorizontal(1)
	}
});

const LoadingTable = () => (
	<td colSpan={columns.length} style={styles.loaderTd}>
		<Container style={styles.loaderDiv}>
			<div className="pa2">
				<Loader></Loader>
			</div>
		</Container>
	</td>
);

const Pagination = ({ pagination }) => {
	const pressNumberPagination = (x) => () => pagination.setPage(x);

	return (
		<Fragment>
			<Button transparent style={styles.paginateButton} disabled={pagination.isFirst} onPress={pagination.goBackward}>
				{"<"}
			</Button>
			{pagination.range.map((x) => (
				<Button
					transparent
					style={{
						...styles.paginateButton,
						border: x === pagination.page ? `1px solid ${Colors.primaryLight}` : undefined
					}}
					key={`paginate-button-${x}`}
					onPress={pressNumberPagination}
				>
					{x + 1}
				</Button>
			))}
			<Button transparent style={styles.paginateButton} disabled={pagination.isLast} onPress={pagination.goForward}>
				{">"}
			</Button>
		</Fragment>
	);
};

const TableLess = ({
	rowKey,
	expandViewIcon = <MdAdd />,
	expandHideIcon = <MdRemove />,
	loading = false,
	rowProps = voidFn,
	dataSource,
	itensPerPage = 75,
	hasExpandRow = false,
	columns
}) => {
	const id = rowKey || "id";
	const [expandedRows, setExpandedRows] = useState([]);
	const pagination = usePagination({ dataSource, itensPerPage });
	return (
		<Container className="pv2">
			<View span="100%">
				<Table>
					<thead>
						<tr>
							{hasExpandRow && <th></th>}
							{columns.map((x) => (
								<th key={`head-${x.title}`}>{x.title}</th>
							))}
						</tr>
					</thead>
					{(loading && <LoadingTable />) || (
						<tbody>
							{pagination.list.map((record, index) => {
								const uniqueKey = reactKey(id, record);
								const getRowProps = rowProps(record, index);
								const fragKey = getRowProps.key || `row-${uniqueKey}`;
								const recordKey = record[rowKey];
								const show = expandedRows.includes(recordKey);

								const expandOperation = () => {
									if (show) {
										return setExpandedRows((p) => p.filter((x) => x !== record[rowKey]));
									}
									return setExpandedRows((p) => [...p, record[rowKey]]);
								};

								return [
									<tr key={fragKey} {...getRowProps}>
										{hasExpandRow && (
											<td className="expand-td" onClick={expandOperation}>
												<div role="button" className="pointer bg-animate bg-transparent">
													{show ? expandHideIcon : expandViewIcon}
												</div>
											</td>
										)}
										{columns.map((x) => {
											const colKey = x.key;
											const colRender = record[colKey];
											const render = !!x.render ? x.render(colRender, record, index) : colRender;
											return (
												<td key={`body-${uniqueKey}-${colKey}`} fluid-data={x.title}>
													{render}
												</td>
											);
										})}
									</tr>,
									show && (
										<tr key={`${fragKey}-sub-item`}>
											<td colSpan={columns.length + 1}>
												<Container isCollapse show={show}>
													<Title>Oh modafoca</Title>
												</Container>
											</td>
										</tr>
									)
								];
							})}
						</tbody>
					)}
				</Table>
			</View>
			<Right span="100%" style={{ marginTop: "0.3rem" }}>
				<Pagination pagination={pagination} />
			</Right>
		</Container>
	);
};

const data = [
	{ id: "1", name: "Chuck", skill: "Lutar" },
	{ id: "2", name: "Norris", skill: "Lutar muito" },
	{ id: "3", name: "Bruce", skill: "Professor" },
	{ id: "4", name: "Lee", skill: "Supremo" },
	{ id: "5", name: "Jackie", skill: "Cinema" },
	{ id: "6", name: "Chan", skill: "Piadas" },
	{ id: "7", name: "Liu", skill: "Mortal" },
	{ id: "8", name: "Kang", skill: "Kombat" },
	{ id: "9", name: "Shao", skill: "Exo" },
	{ id: "10", name: "Kahn", skill: "terra" },
	{ id: "11", name: "Scorpion", skill: "Fogo" },
	{ id: "12", name: "Subzero", skill: "Gelo" },
	{ id: "13", name: "Kratos", skill: "War" },
	{ id: "14", name: "SpiderMan", skill: "Web" },
	{ id: "15", name: "IronMan", skill: "Tech" },
	{ id: "17", name: "Black Panther", skill: "Money" },
	{ id: "18", name: "Black Panther", skill: "Money" },
	{ id: "19", name: "Black Panther", skill: "Money" },
	{ id: "20", name: "Black Panther", skill: "Money" },
	{ id: "21", name: "Black Panther", skill: "Money" },
	{ id: "22", name: "Black Panther", skill: "Money" },
	{ id: "23", name: "Black Panther", skill: "Money" },
	{ id: "24", name: "Black Panther", skill: "Money" },
	{ id: "25", name: "Black Panther", skill: "Money" },
	{ id: "26", name: "Black Panther", skill: "Money" },
	{ id: "27", name: "Black Panther", skill: "Money" },
	{ id: "28", name: "Black Panther", skill: "Money" },
	{ id: "29", name: "Black Panther", skill: "Money" },
	{ id: "30", name: "Black Panther", skill: "Money" }
];

const columns = [
	{
		title: "Code",
		key: "id",
		render(e) {
			return `# ${e}`;
		}
	},
	{ title: "Name", key: "name" },
	{ title: "Skill", key: "skill" }
];

export default function App() {
	return (
		<Container>
			<TableLess itensPerPage={20} rowKey="id" columns={columns} hasExpandRow dataSource={data} />
		</Container>
	);
}
