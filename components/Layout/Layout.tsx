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

export const Layout = ({ children }: childeren) => {
  const { loginState, signupState, detailState, changeDetailState, changeSignUpState, changeLoginState } = useStore(
    state => state,
  );
  const param = useRouter();

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
          <Modal WideModal modalState={detailState} closeModal={changeDetailState}>
            <DetailContent />
          </Modal>
        ) : null}
      </>
      <Header>
        <StyledLogo size={2}>한세일부동산</StyledLogo>
        <div className="loginButton">
          {param.pathname !== '/' ? <button onClick={changeLoginState}>로그인</button> : null}
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <FooterContent />
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 0.1rem;
  width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};
`;
export const Content = styled.main`
  min-height: 84vh;
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
  background-color: ${({ theme }) => theme.components.primary};
  grid-area: header;
  /* border: 1px solid ${({ theme }) => theme.font.regular}; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5vmin;
  width: 100%;
  align-items: center;
  & .loginButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5vmin;
    margin-right: 5vmin;
  }
`;

export const Footer = styled.footer`
  display: flex;
  width: 100vw;
  background-color: ${({ theme }) => theme.components.shadow1};
  color: ${({ theme }) => theme.font.button};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 600px) {
    display: none;
  }
`;
