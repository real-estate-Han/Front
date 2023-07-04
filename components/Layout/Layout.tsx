import { Logo } from '@components/Logo';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import LoginContent from '@components/Modal/LoginContent';
import useStore from '@zustand/store';
import SignupContent from '@components/Modal/SignupContent';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import MenuBar from '@components/MenuBar';
import { useMediaQuery } from 'react-responsive';

type childeren = { children?: React.ReactNode };
export const Layout = ({ children }: childeren) => {
  const {
    loginState,
    signupState,
    changeLikeState,
    changeSignUpState,
    changeLoginState,
  } = useStore(state => state);
  const param = useRouter();
  const isMobile: boolean = useMediaQuery({ query: '(max-width:768px)' });

  useEffect(() => {
    const likeList = localStorage.getItem('likeposts');

    if (likeList) {
      const likeArr = JSON.parse(likeList);

      changeLikeState(likeArr);
    } else {
      changeLikeState(['']);
    }
  }, []);
  return (
    <Wrapper>
      <>
        {loginState ? (
          <Modal
            customHeight="300px"
            modalState={loginState}
            closeModal={changeLoginState}
          >
            <LoginContent />
          </Modal>
        ) : null}
        {signupState ? (
          <Modal
            customHeight="400px"
            modalState={signupState}
            closeModal={changeSignUpState}
          >
            <SignupContent />
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
        <MenuBar />
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.mainColor.blue200};
  z-index: 1;
`;
export const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 82vh;
  box-sizing: border-box;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.3);
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
  width: 100%;
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
