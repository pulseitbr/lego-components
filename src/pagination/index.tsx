import React, { Fragment } from "react";
import Button from "../button";
import StyleSheet from "../styles/style-sheet";
import { PaginationType } from "./use-pagination";

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

type Props<T> = {
	pagination: PaginationType<T>;
};

function Pagination<T>({ pagination }: Props<T>) {
	return (
		<Fragment>
			<Button transparent style={styles.paginateButton} disabled={!pagination.hasPreviousPage} onPress={pagination.prevPage}>
				{"<"}
			</Button>
			<Button transparent style={styles.paginateButton} disabled={!pagination.hasNextPage} onPress={pagination.nextPage}>
				{">"}
			</Button>
		</Fragment>
	);
}

export default Pagination;
