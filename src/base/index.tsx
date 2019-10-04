import React from "react";
import styled from "styled-components";

type Value = number | string;
type TypeContainer = {
    span: Value;
    xsmall?: Value;
    small?: Value;
    medium?: Value;
    large?: Value;
    xlarge?: Value;
} & React.HTMLAttributes<any>;

const Responsive = styled.section.attrs((props: TypeContainer) => {
    const span = props.span;
    const xsmall = props.xsmall || "100%";
    const small = props.small || "100%";
    const medium = props.medium || span;
    const large = props.large || span;
    const xlarge = props.xlarge || span;
    return { ...props, span, xsmall, medium, large, small, xlarge };
})`
    flex: 0 0 ${(props: TypeContainer) => props.span};

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
export const Left = styled(Responsive)`
    align-items: flex-start;
    align-self: center;
    order: 0;
`;

export const Right = styled(Responsive)`
    align-items: flex-end;
    align-self: center;
    order: 1;
`;

export const View = styled(Responsive)`
    justify-items: center;
    flex-wrap: wrap;
`;

type TypeContainerBody = { fit?: boolean } & React.HTMLAttributes<any>;
export const Container = styled.section.attrs(({ fit = true, ...props }: TypeContainerBody) => {
    return { ...props, fit };
})`
  /* flex: ${(props) => (props.fit ? 0 : 1)}; */
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
  width:100%
`;
export const Page = styled.main`
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    width: 100%;
    min-width: 100%;
`;
export const Body = styled.div`
    flex: 1 0 auto;
    width: 100%;
    min-width: 100%;
    flex-wrap: wrap;
    align-items: center;
    align-self: center;
`;

export const Footer = styled.footer`
    flex-shrink: 0;
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;
`;
