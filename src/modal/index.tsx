import PropTypes from "prop-types";
import React, { useEffect } from "react";
//@ts-ignore
import Portal from "react-portal-minimal";
import styled from "styled-components";

/* TODO: Update colors to use vars from the theme */
const StyledModalCover = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: ${({ isOpen }: any) => (isOpen ? 1 : 0)};
  overflow-y: auto;
  position: absolute;
  position: fixed;
  right: 0;
  top: 0;
  transition: all 0.1s ease-in-out;
  visibility: ${({ isOpen }: any) => (isOpen ? "visible" : "hidden")};
`;

const StyledModalContent = styled.div`
  background: #fff;
  border-radius: 5px;
  border: 1px solid #b0c2d0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  position: relative;
`;

const StyledModalButton = styled.button`
  background: #fff;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledModalTitle = styled.h1`
  font-size: 20px;
`;

const ModalContent = ({ isOpen, title, children, closeModal }: any) => (
  //@ts-ignore
  <StyledModalCover isOpen={isOpen}>
    {
      //@ts-ignore
      <StyledModalContent isOpen={isOpen}>
        <StyledModalTitle>{title}</StyledModalTitle>
        <StyledModalButton onClick={closeModal}>X</StyledModalButton>
        {children}
      </StyledModalContent>
    }
  </StyledModalCover>
);

ModalContent.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.any,
  closeModal: PropTypes.func.isRequired
};

ModalContent.defaultProps = {
  title: "",
  isOpen: false,
  children: null,
  closeModal: PropTypes.func.isRequired
};

const KEYCODES = {
  ESCAPE: 27
};

const Modal = (props: any) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (e: any) => {
    const { isOpen, closeModal } = props;
    if (e.keyCode === KEYCODES.ESCAPE && isOpen) {
      closeModal();
    }
  };

  const { isOpen, children, closeModal } = props;
  return (
    <Portal>
      <ModalContent isOpen={isOpen} closeModal={closeModal}>
        {children}
      </ModalContent>
    </Portal>
  );
};

export default Modal;
