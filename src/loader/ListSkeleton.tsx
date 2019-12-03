import { Uuid } from "lego";
import React, { Fragment } from "react";
import { Skeleton } from "../skeleton";

type Props = { itens?: number; loading?: boolean; children?: React.ReactNode; height?: string };

const style = { marginTop: ".5rem", marginBottom: ".5rem" };

const ListSkeleton = ({ itens = 3, height = "5rem", loading = true, ...props }: Props) => {
	if (loading) {
		return (
			<Fragment>
				{Array(itens)
					.fill(0)
					.map(() => (
						<Skeleton style={style} key={`loader-${Uuid()}-skel`} height={height} />
					))}
			</Fragment>
		);
	}
	return <Fragment>{props.children}</Fragment>;
};

export default ListSkeleton;
