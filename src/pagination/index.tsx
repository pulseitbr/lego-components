import React, { Fragment } from "react";
import Button from "../button/Button";
import StyleSheet from "../styles/StyleSheet";
import { Colors } from "lego";
import { TypePagination } from "../hooks/usePagination";

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
	pagination: TypePagination<T>;
};

function Pagination<T>({ pagination }: Props<T>) {
	const pressNumberPagination = (x: number) => () => pagination.setPage(x);
	return (
		<Fragment>
			<Button transparent style={styles.paginateButton} disabled={pagination.isFirst} onPress={pagination.goBackward}>
				{"<"}
			</Button>
			{pagination.range.map((x: number) => (
				<Button
					transparent
					style={{
						...styles.paginateButton,
						border: x === pagination.page ? `1px solid ${Colors.primaryLight}` : undefined
					}}
					key={`paginate-button-${x}`}
					onPress={pressNumberPagination(x)}
				>
					{x + 1}
				</Button>
			))}
			<Button transparent style={styles.paginateButton} disabled={pagination.isLast} onPress={pagination.goForward}>
				{">"}
			</Button>
		</Fragment>
	);
}

export default Pagination;
