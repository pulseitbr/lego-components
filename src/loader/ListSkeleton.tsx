import React, { Fragment } from "react";
import Skeleton from "react-content-loader";
import { Container, View } from "../base";

type Props = { itens?: number; loading?: boolean; children?: React.ReactNode; height?: number };

const ListSkeleton = ({ itens = 3, height = 35, loading = true, ...props }: Props) => {
    if (loading) {
        return (
            <Container>
                {[
                    Array(itens)
                        .fill(itens)
                        .map((x, i) => {
                            return (
                                <View key={`${Math.random()}-${i}-list-skeleton`} className="mv1">
                                    <Skeleton height={height} />
                                </View>
                            );
                        })
                ]}
            </Container>
        );
    }
    return <Fragment>{props.children}</Fragment>;
};

export default ListSkeleton;
