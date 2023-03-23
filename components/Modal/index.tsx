import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useStore from "@zustand/store";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = (props: ModalProps) => {
  const { modalState, changeModalState } = useStore((state) => state);

  function closeModal() {
    // 모달창이 나왔을때 백그라운드 클릭이 안되게 하고 스크롤도 고정하는 방법
    useEffect(() => {
      const html = document.documentElement;
      if (modalState) {
        html.style.overflowY = "hidden";
        html.style.overflowX = "hidden";
      } else {
        html.style.overflowY = "auto";
        html.style.overflowX = "auto";
      }
      return () => {
        html.style.overflowY = "auto";
        html.style.overflowX = "auto";
      };
    }, [modalState]);
  }

  return (
    <ModalStyled onClick={changeModalState}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </ModalStyled>
  );
};

export default Modal;

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;

  .modalBody {
    position: absolute;
    color: black;
    padding: 30px 30px 30px 30px;
    z-index: 13;
    text-align: left;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }
`;
