import styled from '@emotion/styled';
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

  useEffect(() => {
    if (router.asPath === '/search') {
      setHiddenBar(true);
      console.log('숨기기');
    } else {
      setHiddenBar(false);
      console.log('보이기');
    }
  }, [router]);
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
      <div className="MenuButton">
        <MdMoreHoriz size={28} />
        <span>더보기</span>
      </div>
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
