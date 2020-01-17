import { Uuid } from "lego";
import React, { Fragment } from "react";
import { Container } from "../base";
import { Skeleton } from "../skeleton";
import StyleSheet from "../styles/style-sheet";

const styles = StyleSheet.create({
	listMargin: StyleSheet.marginVertical("0.4rem")
});

type Props = { itens?: number; loading?: boolean; height?: string };

const ListSkeleton = ({ itens = 3, height = "5rem", loading = false }: Props) => {
	if (!loading) {
		return <Fragment />;
	}
	return (
		<Fragment>
			{[
				Array(itens)
					.fill(itens)
					.map(() => (
						<Container key={`${Uuid()}-ll`} style={styles.listMargin}>
							<Skeleton height={height} />
						</Container>
					))
			]}
		</Fragment>
	);
};

export default ListSkeleton;
