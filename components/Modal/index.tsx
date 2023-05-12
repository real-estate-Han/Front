import React, { useEffect } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
  modalState: boolean;
  WideModal?: boolean;
  fullview?: boolean;
  disableScroll?: boolean;
}

const Modal = (props: ModalProps) => {
  // 모달창이 나왔을때 백그라운드 클릭이 안되게 하고 스크롤도 고정하는 방법
  useEffect(() => {
    if (props.disableScroll) return;
    const html = document.documentElement;
    if (props.modalState) {
      html.style.overflowY = 'hidden';
      html.style.overflowX = 'hidden';
    } else {
      html.style.overflowY = 'auto';
      html.style.overflowX = 'auto';
    }
    return () => {
      html.style.overflowY = 'auto';
      html.style.overflowX = 'auto';
    };
  }, [props.modalState]);

  return (
    <ModalStyled WideModal={props?.WideModal} onClick={props.closeModal} fullview={props?.fullview}>
      <div className="modalBody" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </ModalStyled>
  );
};

export default Modal;

const ModalStyled = styled.div<{
  WideModal: boolean | undefined;
  fullview: boolean | undefined;
}>`
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
    /* max-width: ${props => (props.WideModal ? '1000px' : '500px')}; */
    width: ${props => (props.fullview ? '100vw' : '80%')};
    height: ${props => (props.fullview ? '100vh' : '80%')};
    overflow-y: auto;
    max-height: ${props => (props.fullview ? '100vh' : props.WideModal ? '800px' : '500px')};
    position: absolute;
    color: black;
    padding: 30px 30px 30px 30px;
    z-index: 13;
    text-align: left;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    font-size: 12px;
  }
`;
