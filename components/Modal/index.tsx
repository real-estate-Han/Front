import React, { useEffect } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}
const Modal = (props: ModalProps) => {
 

  function closeModal() {}
  // 모달창이 나왔을때 백그라운드 클릭이 안되게 하고 스크롤도 고정하는 방법
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY) * -1);
    };
  }, []);

  return (
    <ModalStyled onClick={props.closeModal}>
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
