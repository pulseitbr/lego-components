import { Uuid } from "lego";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import styled from "styled-components";
import usePagination from "../pagination/use-pagination";
import StyleSheet from "../styles/style-sheet";
import { Container, View, Right } from "../base";
import Loader from "../loader/loader";
import { Title } from "../typography";
import Pagination from "../pagination";

function reactKey<T>(key: string, record: T) {
	return record[key] || Uuid();
}

const ResponsiveTable = styled.table`
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
		width: 100%;

		&,
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

const styles = StyleSheet.create({
	loaderTd: { border: "1px solid transparent", padding: 0 },
	loaderDiv: {
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center"
	}
});

type LoadingTableProps = {
	columns: unknown[];
};

const LoadingTable = ({ columns }: LoadingTableProps) => (
	<td colSpan={columns.length} style={styles.loaderTd}>
		<Container style={styles.loaderDiv}>
			<div className="pa2">
				<Loader />
			</div>
		</Container>
	</td>
);

type Columns<T> = {
	title: string;
	key: string;
	render(colRender: React.ReactText, record: T, index: number): React.ReactNode;
};

type Props<T> = {
	dataSource: T[];
	rowKey?: string;
	columns: Columns<T>[];
	expandViewIcon?: React.ReactNode;
	expandHideIcon?: React.ReactNode;
	loading?: boolean;
	rowProps?(record: T, index: number, data: T[]): React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
	itensPerPage?: number;
	hasExpandRow?: boolean;
	initialPage?: number;
};

const voidFn = () => ({});

function Table<T>({
	rowKey,
	initialPage = 0,
	expandViewIcon = <MdAdd />,
	expandHideIcon = <MdRemove />,
	loading = false,
	rowProps = voidFn,
	itensPerPage = 75,
	hasExpandRow = false,
	dataSource,
	columns
}: Props<T>) {
	const id = rowKey || "id";
	const [expandedRows, setExpandedRows] = useState([] as number[]);
	const pagination = usePagination({ dataSource, page: 0, initialPage, itensPerPage });
	return (
		<Container className="pv2">
			<View span="100%">
				<ResponsiveTable>
					<thead>
						<tr>
							{hasExpandRow && <th></th>}
							{columns.map((x) => (
								<th key={`head-${x.title}`}>{x.title}</th>
							))}
						</tr>
					</thead>
					{(loading && <LoadingTable columns={columns} />) || (
						<tbody>
							{pagination.list.map((record: T, index: number) => {
								const uniqueKey = reactKey(id, record);
								const getRowProps = rowProps(record, index, pagination.list);
								const fragKey = getRowProps.key || `row-${uniqueKey}`;
								const recordKey = record[id];
								const show = expandedRows.includes(recordKey);

								const expandOperation = () => {
									if (show) {
										return setExpandedRows((p: number[]) => p.filter((x) => x !== record[id]));
									}
									return setExpandedRows((p: number[]) => [...p, record[id]]);
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
				</ResponsiveTable>
			</View>
			<Right span="100%" style={{ marginTop: "0.3rem" }}>
				<Pagination pagination={pagination} />
			</Right>
		</Container>
	);
}

export default Table;
