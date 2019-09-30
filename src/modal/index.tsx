import React, { useState, useEffect } from "react";
import { Portal } from "react-portal";
import styled from "styled-components";

const ModalPortal = styled.aside.attrs((props: any) => {
  return { ...props, visible: !!props.visible ? "block" : "none" };
})`
  display: ${(props) => props.visible};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  animation: 2s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 1.2rem;
  min-width: 360px;
  max-width: 100%;
  width: 80%;
  border: 1px solid #888;
  top: 50%;
  left: 50%;
`;

const Modal = (props: any) => {
  const [visible, setVisible] = useState(!!props.visible);
  const onClickMask = () => {
    setVisible(false);
  };

  useEffect(() => {
    setVisible(!!props.visible);
  }, [props.visible]);
  
  return (
    <Portal>
      <ModalPortal onClick={onClickMask} visible={visible}>
        <ModalContent>
          <div>{props.children}</div>
        </ModalContent>
      </ModalPortal>
      )}
    </Portal>
  );
};

export default Modal;
