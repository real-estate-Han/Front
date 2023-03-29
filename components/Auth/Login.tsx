import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useStore from "@zustand/store";
import { useEffect } from "react";
import Modal from "@components/Modal";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Login() {
  const { modalState, changeModalState } = useStore((state) => state);

  return (
    <LoginContainer>
      {modalState ? (
        <Modal closeModal={changeModalState}>
          <></>
        </Modal>
      ) : (
        <></>
      )}
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
`;
