import { css } from '@emotion/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useStore from '@zustand/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import react, { useEffect, useState } from 'react';
import {
  MdOutlineHome,
  MdMoreHoriz,
  MdOutlineMapsHomeWork,
  MdOutlineLocationOn,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
const MenuBar = () => {
  const router = useRouter();
  const [hiddenBar, setHiddenBar] = useState<boolean>(false);
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const toggleSidemenu = () => {
    setSidemenu(!sidemenu);
  };
  const { changeLoginState, changeSignUpState } = useStore(state => state);
  useEffect(() => {
    if (router.asPath === '/search') {
      setHiddenBar(true);
    } else {
      setHiddenBar(false);
    }
  }, [router]);

  const linktoPostpage = () => {
    router.push('/post');
    toggleSidemenu();
  };

  return (
    <MenuDiv hiddenBar={hiddenBar}>
      <div
        className="MenuButton"
        onClick={() => {
          router.push('/');
        }}
      >
        <MdOutlineHome size={28} />
        <span>홈</span>
      </div>
      <div
        className="MenuButton"
        onClick={() => {
          router.push('/heart');
        }}
      >
        <MdOutlineFavoriteBorder size={28} />
        <span>관심목록</span>
      </div>
      <div
        className="MenuButton"
        onClick={() => {
          router.push('/main');
        }}
      >
        <MdOutlineLocationOn size={28} />
        <span>지도</span>
      </div>
      <div className="MenuButton">
        <MdOutlineMapsHomeWork size={28} />
        <span>의뢰하기</span>
      </div>
      <div className="MenuButton" onClick={toggleSidemenu}>
        <MdMoreHoriz size={28} />
        <span>더보기</span>
      </div>

      <SideMenu sidemenu={sidemenu}>
        <div onClick={changeLoginState}> 로그인 및 회원가입 </div>
        <div onClick={linktoPostpage}> 매물 올리기</div>
      </SideMenu>
    </MenuDiv>
  );
};

export default MenuBar;

const MenuDiv = styled.div<{ hiddenBar: boolean }>`
  display: ${({ hiddenBar }) => (hiddenBar ? 'none' : 'flex')};
  z-index: 3;
  justify-content: space-around;
  align-items: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.1em;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 84px;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.54);
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.25);
  .MenuButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 78px;
    height: 54px;

    margin-bottom: 30px;
  }
`;
const openModalAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;
const closeModalAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const SideMenu = styled.div<{ sidemenu: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 5px;
  width: 150px;
  height: 196px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 4;
  transform: ${({ sidemenu }) => (sidemenu ? 'translateX(0%)' : 'translateX(110%);')};
  animation: ${props =>
    props.sidemenu
      ? css`
          ${openModalAnimation} 0.4s ease
        `
      : css`
          ${closeModalAnimation} 0.4s ease
        `};
`;
