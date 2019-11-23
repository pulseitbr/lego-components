import { Uuid, Colors } from "lego";
import { Container, View, Title } from "lego-components";
import React, { Fragment } from "react";
import styled from "styled-components";
import { useState } from "react";

const invokeOrString = (value, record, index, entireList) => {
	if (typeof value === "function") {
		return value(record, index, entireList);
	}
	return value;
};

const reactKey = (key, record) => record[key] || Uuid();

const Table = styled.table`
	width: 100%;
	border-spacing: 0;
	border-collapse: collapse;

	tr:nth-of-type(odd) {
		background: var(--light);
	}

	tr:hover {
		/* background: var(--lightDarkest);
		color: var(--light); */
		cursor: pointer;
	}

	th {
		background: var(--primary);
		color: white;
		font-weight: bold;
	}

	td,
	th {
		padding: 0.625rem;
		border: 0.5px solid var(--dark);
		text-align: left;
		font-size: 1rem;
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
			border: 1px solid var(--darkAlpha);
		}

		td {
			border: none;
			border-bottom: 0.5px solid var(--darkAlpha);
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
	}
`;

const TableLess = (props) => {
	const id = props.rowKey || "id";
	return (
		<Container style={{ overflowX: "auto", height: "100%" }}>
			<View span="100%">
				<Table className="fixed_header">
					<thead>
						<tr>
							{props.columns.map((x) => (
								<th key={`head-${x.title}`}>{x.title}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{props.data.map((record, index) => {
							const uniqueKey = reactKey(id, record);
							const rowProps = !!props.rowProps ? props.rowProps(record, index, data) : {};
							return (
								<Fragment key={`row-${uniqueKey}`}>
									<tr {...rowProps}>
										{props.columns.map((x) => (
											<td key={`body-${uniqueKey}-${x.key}`} fluid-data={x.title}>
												{record[x.key]}
											</td>
										))}
									</tr>
									<tr hidden>
										<td colSpan={props.columns.length}>
											<Container isCollapse show>
												<Title>Oh modafoca</Title>
											</Container>
										</td>
									</tr>
								</Fragment>
							);
						})}
					</tbody>
				</Table>
			</View>
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
	{ id: "00", name: "Kahn", skill: "terra" },
	{ id: "11", name: "Scorpion", skill: "Fogo" },
	{ id: "12", name: "Subzero", skill: "Gelo" },
	{ id: "13", name: "Kratos", skill: "War" },
	{ id: "14", name: "SpiderMan", skill: "Web" },
	{ id: "15", name: "IronMan", skill: "Tech" },
	{ id: "15", name: "Black Panther", skill: "Money" }
];

const columns = [
	{ title: "Code", key: "id" },
	{ title: "Name", key: "name" },
	{ title: "Skill", key: "skill" }
];

export default function App() {
	return (
		<Container>
			<TableLess
				columns={columns}
				data={data}
				id="title"
				rowProps={(a, index) => {
					return {
						style:
							index % 2 === 0 ? { background: Colors.lightLight } : { background: Colors.disabledAlpha }
					};
				}}
			/>
			<h1>AEEE</h1>
		</Container>
	);
}
