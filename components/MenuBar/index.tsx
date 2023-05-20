/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { IS_LOGINED } from '@utils/apollo/gqls';
import useStore from '@zustand/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import react, { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import {
  MdOutlineHome,
  MdMoreHoriz,
  MdOutlineMapsHomeWork,
  MdOutlineLocationOn,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import Swal from 'sweetalert2';

const MenuBar = () => {
  const router = useRouter();
  const [hiddenBar, setHiddenBar] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>('/');
  const [isLogined, setIsLogined] = useState<string>('');
  const { sideMenu, setSideMenu, clearState } = useStore(state => state);
  const [checkLogined, { data, error: loginErr }] = useLazyQuery(IS_LOGINED, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'no-cache',
  });

  const checkLogin = async () => {
    const currentToken = await localStorage.getItem('token');
    if (currentToken) {
      setIsLogined('success');
    } else {
      setIsLogined('fail');
    }
  };
  const changeMenu = () => {
    checkLogin();
    setSideMenu();
  };
  useEffect(() => {
    checkLogin();
  }, [isLogined]);

  const LogoutButton = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('likeposts');
        localStorage.removeItem('mycontents');
        localStorage.removeItem('userstatus');
        Swal.fire({
          title: '로그아웃 되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      }
      clearState();
    });
  };

  const { changeLoginState, changeSignUpState } = useStore(state => state);
  useEffect(() => {
    if (router.asPath === '/search') {
      setHiddenBar(true);
    } else {
      setHiddenBar(false);
    }
    setCurrentUrl(router.asPath);
  }, [router]);
  const licktoLikepage = () => {
    checkLogined().then(res => {
      if (res.data.checklogin.checklogin === 'success') {
        router.push('/heart');
      } else {
        Swal.fire({
          title: '로그인이 필요합니다.',
          icon: 'warning',
          confirmButtonText: '확인',
        }).then(() => {
          changeLoginState();
        });
      }
    });
  };
  const linktoPostpage = () => {
    checkLogined().then(res => {
      if (res.data.checklogin.status === 'owner') {
        router.push('/post');
      } else {
        Swal.fire({
          title: '관리자만 등록 가능합니다',
          icon: 'warning',
          confirmButtonText: '확인',
        });
      }
    });

    setSideMenu();
  };

  return (
    <MenuDiv hiddenBar={hiddenBar}>
      <div
        className="MenuButton"
        onClick={() => {
          router.push('/');
        }}
      >
        <MdOutlineHome
          size={28}
          color={currentUrl === '/' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)'}
        />
        <span
          style={{
            color: currentUrl === '/' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)',
          }}
        >
          홈
        </span>
      </div>
      <div
        className="MenuButton"
        onClick={() => {
          licktoLikepage();
        }}
      >
        <MdOutlineFavoriteBorder
          size={28}
          color={currentUrl === '/heart' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)'}
        />
        <span
          style={{
            color: currentUrl === '/heart' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)',
          }}
        >
          관심목록
        </span>
      </div>
      <div
        className="MenuButton"
        onClick={() => {
          router.push('/main');
        }}
      >
        <MdOutlineLocationOn
          size={28}
          color={currentUrl === '/main' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)'}
        />
        <span
          style={{
            color: currentUrl === '/main' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)',
          }}
        >
          지도
        </span>
      </div>
      <div className="MenuButton">
        <MdOutlineMapsHomeWork
          size={28}
          color={currentUrl === '/quest' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)'}
        />
        <span
          style={{
            color: currentUrl === '/quest' ? '#0059F9' : 'rgba(0, 0, 0, 0.54)',
          }}
        >
          의뢰하기
        </span>
      </div>
      <div className="MenuButton" onClick={changeMenu}>
        <MdMoreHoriz
          size={28}
          color={sideMenu ? '#0059F9' : 'rgba(0, 0, 0, 0.54)'}
        />
        <span style={{ color: sideMenu ? '#0059F9' : 'rgba(0, 0, 0, 0.54)' }}>
          더보기
        </span>
      </div>

      <SideMenu sideMenu={sideMenu}>
        {isLogined === 'success' ? (
          <div onClick={LogoutButton}> 로그아웃 </div>
        ) : (
          <div onClick={changeLoginState}> 로그인 및 회원가입 </div>
        )}

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

const SideMenu = styled.div<{ sideMenu: boolean }>`
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
  transform: ${({ sideMenu }) =>
    sideMenu ? 'translateX(0%)' : 'translateX(110%);'};
  animation: ${props =>
    props.sideMenu
      ? css`
          ${openModalAnimation} 0.4s ease
        `
      : css`
          ${closeModalAnimation} 0.4s ease
        `};
`;
