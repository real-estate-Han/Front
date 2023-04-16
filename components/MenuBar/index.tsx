import styled from '@emotion/styled';
import Image from 'next/image';
import react from 'react';

const MenuBar = () => {
  return (
    <MenuDiv>
      <div className="MenuButton">
        <Image src="./icon/home.svg" width={28} height={28} alt="home" />
        <span>홈</span>
      </div>
      <div className="MenuButton">
        <Image src="/icon/favor.svg" width={28} height={28} alt="favor" />
        <span>관심목록</span>
      </div>
      <div className="MenuButton">
        <Image src="/icon/marker.svg" width={28} height={28} alt="marker" />
        <span>지도</span>
      </div>
      <div className="MenuButton">
        <Image src="/icon/home_work.svg" width={28} height={28} alt="homework" />
        <span>의뢰하기</span>
      </div>
      <div className="MenuButton">
        <Image src="/icon/3dot.svg" width={28} height={28} alt="3dot" />
        <span>더보기</span>
      </div>
    </MenuDiv>
  );
};

export default MenuBar;

const MenuDiv = styled.div`
  display: flex;
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
