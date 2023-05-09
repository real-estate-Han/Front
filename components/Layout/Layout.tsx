import { Logo } from '@components/Logo';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import LoginContent from '@components/Modal/LoginContent';
import useStore from '@zustand/store';
import SignupContent from '@components/Modal/SignupContent';
import DetailContent from '@components/Modal/DetailContent';
type childeren = { children?: React.ReactNode };
import { useRouter } from 'next/router';
import FooterContent from '@components/Footer/content';
import MenuBar from '@components/MenuBar';
import { useMediaQuery } from 'react-responsive';
export const Layout = ({ children }: childeren) => {
  const { loginState, signupState, detailState, changeDetailState, changeSignUpState, changeLoginState } = useStore(
    state => state,
  );
  const param = useRouter();
  const isMobile: boolean = useMediaQuery({ query: '(max-width:768px)' });
  return (
    <Wrapper>
      <>
        {loginState ? (
          <Modal modalState={loginState} closeModal={changeLoginState}>
            <LoginContent></LoginContent>
          </Modal>
        ) : null}
        {signupState ? (
          <Modal modalState={signupState} closeModal={changeSignUpState}>
            <SignupContent />
          </Modal>
        ) : null}
        {detailState ? (
          <Modal fullview={true} WideModal modalState={detailState} closeModal={changeDetailState}>
            <DetailContent />
          </Modal>
        ) : null}
      </>
      {/* <Header></Header> */}
      <Content>{children}</Content>
      {/* {isMobile ? (
        <Footer>
          <MenuBar></MenuBar>
        </Footer>
      ) : (
        <Footer>
          <FooterContent />
        </Footer>
      )} */}
      <Footer>
        <MenuBar></MenuBar>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 0.1rem;
  position: relative;
  width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};
`;
export const Content = styled.main`
  min-height: 82vh;
  box-sizing: border-box;
  padding-bottom: 150px;
  overflow: auto;
  /* padding: 0 20px; */
  /* margin-top: 1rem; */
  /* border: 1px solid ${({ theme }) => theme.font.regular}; */
`;

export const StyledLogo = styled(Logo)`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.components.primary};
  /* border: 1px solid ${({ theme }) => theme.font.regular}; */
`;

export const Header = styled.div`
  width: 100%;
  height: 48px;
  background-color: white;
`;

export const Footer = styled.footer`
  display: flex;
  width: 100vw;
  background-color: ${({ theme }) => theme.components.shadow1};
  color: ${({ theme }) => theme.font.button};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    /* position: fixed;
    bottom: 0;
    left: 0; */
    width: 100%;
    height: 84px;
    background: #ffffff;
  }
`;
