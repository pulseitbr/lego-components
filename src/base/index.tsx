import styled from "styled-components";
import Theme from "../styles";

export const Left = styled.div`
  flex: 1;
  align-items: flex-start;
  align-self: center;
`;

export const Right = styled.div`
  flex: 1;
  align-items: flex-end;
  align-self: center;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-basis: auto;
  justify-items: center;
  flex-wrap: wrap;
  height: ${window.outerHeight};
  width: 100%;
  background-color: ${Theme.light};
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-self: center;
`;
