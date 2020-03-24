import { Uuid } from "@pulseitbr/lego";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import styled from "styled-components";
import { usePagination, Container, View, Right, Loader, Title, Pagination, StyleSheet } from "lego-components";

function reactKey(key, record) {
	return record[key] || Uuid();
}

const ResponsiveTable = styled.table`
	width: 100%;
	border-spacing: 0;
	table-layout: auto;
	border-collapse: collapse;

	tr:nth-child(even) {
		background-color: var(--light);
	}

	thead th {
		border: 1px solid var(--primaryLight);
		background: var(--primary);
		color: white;
		font-weight: bold;
	}

	td,
	th {
		padding: 0.625rem 0.25rem;
		border: 0.1px solid var(--darkLightest);
		border-top: 0;
		text-align: left;
		font-size: 1rem;
	}

	.expand-td {
		text-align: center;
	}

	@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
		border: 0;

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
			border: 0.1px solid var(--darkLightest);
		}

		td {
			border: none;
			border-bottom: 0.1px solid var(--darkLightest);
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

const LoadingTable = ({ columns }) => (
	<td colSpan={columns.length} style={styles.loaderTd}>
		<Container style={styles.loaderDiv}>
			<div className="pa2">
				<Loader></Loader>
			</div>
		</Container>
	</td>
);

const voidFn = () => ({});

function Table({
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
}) {
	const id = rowKey || "id";
	const [expandedRows, setExpandedRows] = useState([]);
	const pagination = usePagination({ dataSource, page: 0, initialPage, itensPerPage });
	return (
		<Container className="pv2">
			<View span="100%">
				<ResponsiveTable cellPadding={0} cellSpacing={0}>
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
							{pagination.list.map((record, index) => {
								const uniqueKey = reactKey(id, record);
								const getRowProps = rowProps(record, index, pagination.list);
								const fragKey = getRowProps.key || `row-${uniqueKey}`;
								const recordKey = record[id];
								const show = expandedRows.includes(recordKey);

								const expandOperation = () => {
									if (show) {
										return setExpandedRows((p) => p.filter((x) => x !== record[id]));
									}
									return setExpandedRows((p) => [...p, record[id]]);
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
