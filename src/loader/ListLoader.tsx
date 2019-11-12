import React, { Fragment } from "react";
import Skeleton from "react-content-loader";
import { Container } from "../base";
import StyleSheet from "../styles/StyleSheet";

const styles = StyleSheet.create({
	listMargin: StyleSheet.marginVertical("0.4rem")
});

type Props = { itens?: number; loading?: boolean; children?: React.ReactNode; height?: number };

const ListSkeleton = ({ itens = 3, height = 25, loading = false }: Props) => {
	if (!loading) {
		return <Fragment />;
	}
	return (
		<Fragment>
			{[
				Array(itens)
					.fill(itens)
					.map((_, i) => (
						<Container key={`${Math.random()}-${i}-ll-${_}`} style={styles.listMargin}>
							<Skeleton height={height} />
						</Container>
					))
			]}
		</Fragment>
	);
};

export default ListSkeleton;
