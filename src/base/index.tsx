import { FlexDirectionProperty } from "csstype";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type Value = number | string;

export type LegoMediaQuery = {
    span?: Value;
    xsmall?: Value;
    small?: Value;
    medium?: Value;
    large?: Value;
    xlarge?: Value;
};
export type TypeContainer = LegoMediaQuery &
    React.HTMLAttributes<HTMLElement> & {
        time?: Value;
        direction?: FlexDirectionProperty;
    };

const Flex = styled.div.attrs(({ direction = "row", ...props }: TypeContainer) => {
    const span = props.span || 0;
    const xsmall = props.xsmall || "100%";
    const small = props.small || "100%";
    const medium = props.medium || span;
    const large = props.large || span;
    const xlarge = props.xlarge || span;
    return { ...props, span, xsmall, medium, large, small, xlarge, direction };
})`
    flex: 0 0 ${(props: TypeContainer) => props.span};
    flex-wrap: wrap;
    flex-direction: ${(props: TypeContainer) => props.direction};

    @media only screen and (max-width: 600px) {
        flex: 0 0 ${(props: TypeContainer) => props.xsmall};
    }

    @media only screen and (min-width: 600px) {
        flex: 0 0 ${(props: TypeContainer) => props.small};
    }

    @media only screen and (min-width: 768px) {
        flex: 0 0 ${(props: TypeContainer) => props.medium};
    }

    @media only screen and (min-width: 992px) {
        flex: 0 0 ${(props: TypeContainer) => props.large};
    }

    @media only screen and (min-width: 1200px) {
        flex: 0 0 ${(props: TypeContainer) => props.xlarge};
    }
`;

const Collapse = styled(Flex).attrs((props: TypeContainer) => {
    const time = props.time || 350;
    return { ...props, time };
})`
    max-height: 0;
    overflow: hidden;
    transition: max-height ${(props: any) => props.time}ms cubic-bezier(0.45, 0.27, 0.63, 0.51);
`;

type ResponsiveProps = {
    isCollapse?: boolean;
    show?: boolean;
} & TypeContainer;

const Responsive = ({ isCollapse = false, show = true, children, ...props }: ResponsiveProps) => {
    const ref: React.RefObject<HTMLDivElement> = useRef(null);
    useEffect(() => {
        if (!!ref.current) {
            if (!!isCollapse) {
                if (show) {
                    ref.current.style.maxHeight = `100%`;
                } else {
                    ref.current.style.maxHeight = null;
                }
            }
        }
    }, [isCollapse, show]);

    if (!isCollapse) {
        return <Flex {...props}>{children}</Flex>;
    }

    return (
        <Collapse ref={ref} {...props}>
            {children}
        </Collapse>
    );
};

export const Left = styled(Responsive)`
    flex: 1;
    text-align: left;
    align-items: flex-start;
    align-self: center;
`;

export const Right = styled(Responsive)`
    flex: 1;
    text-align: right;
    align-items: flex-end;
    align-self: center;
`;

export const View = styled(Responsive)`
    justify-items: center;
    flex-wrap: wrap;
`;
export const Page = styled(Responsive)`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 100%;
`;
export const Body = styled(Responsive)`
    flex: 1 0 auto;
    width: 100%;
    min-width: 100%;
    flex-wrap: wrap;
    align-items: center;
    align-self: center;
`;
export const Container = styled(Responsive)`
    display: flex;
    justify-items: center;
    flex-wrap: wrap;
    min-width: 100%;
`;
export const Footer = styled(Container)`
    flex-shrink: 0;
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;
`;
