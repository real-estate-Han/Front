/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import LoginContent from '@components/Modal/LoginContent';
import useStore from '@zustand/store';
import SignupContent from '@components/Modal/SignupContent';
import { Router, useRouter } from 'next/router';
import MenuBar from '@components/MenuBar';
import { useMediaQuery } from 'react-responsive';
import { Poppins } from '@next/font/google';
import { Logo } from '@components/Logo';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Banner } from '@components/Banner';
import Modal from '@components/Modal';
import FooterContent from '@components/Footer/content';
import CircleLoading from '@components/Loding/circleLoding';

const poppins = Poppins({ weight: '700', subsets: ['latin'] });
type childeren = { children?: React.ReactNode };
export const Layout = ({ children }: childeren) => {
  const {
    loginState,
    signupState,
    changeLikeState,
    changeSignUpState,
    changeLoginState,
    bannerState,
    bannerToggle,
  } = useStore(state => state);
  const param = useRouter();
  const isMobile: boolean = useMediaQuery({ query: '(max-width:768px)' });
  const [isLoading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.on('routeChangeStart', start);
      Router.events.on('routeChangeComplete', end);
      Router.events.on('routeChangeError', end);
    };
  }, []);

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
    <Wrapper className={poppins.className}>
      <>
        {isLoading ? <CircleLoading /> : null}
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
        {bannerState ? (
          <Modal
            customHeight="500px"
            modalState={bannerState}
            closeModal={bannerToggle}
          >
            <Banner />
          </Modal>
        ) : null}
      </>
      <Content>{children}</Content>
      <BannerSite>
        <Banner wide />
      </BannerSite>
      <Footer>
        <MenuBar />
        <FooterContent />
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.mainColor.blue200};
  /* background-color: #fff; */

  z-index: 1;
`;
const BannerSite = styled.div`
  @media (max-width: 999px) {
    display: none;
  }
  @media (min-width: 1000px) {
    box-sizing: border-box;
    display: block;
    background-color: #fff;
    width: 100%;
    height: 145px;
    margin: auto;
    padding: 0 10px;
  }
`;
export const Content = styled.main`
  @media (max-width: 999px) {
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    min-height: 82vh;
    box-sizing: border-box;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    /* margin-bottom: 60px; */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.3);
  }
  @media (min-width: 1000px) {
    width: 100%;

    /* max-width: 1320px; */
    margin: 0 auto;
    box-sizing: border-box;
    overflow: visible;
    position: relative;
    z-index: 2;
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.3); */
  }
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
  @media (max-width: 999px) {
    /* position: fixed;
    bottom: 0;
    left: 0; */
    width: 100%;
    height: 84px;
    background: #ffffff;
  }
`;
