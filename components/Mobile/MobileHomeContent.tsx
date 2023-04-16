import styled from '@emotion/styled';
import Image from 'next/image';

const MobileHomeContent = () => {
  return (
    <Wrap>
      <span>한세일 부동산</span>
      <div className="branding">한세일 부동산의 브랜딩 문구</div>
      <div className="searchBar">
        <Image className="searchicon" src="/icon/search.svg" width={28} height={28} alt="search"></Image>
        <input className="searchinput" placeholder="지역을 입력하세요" />
      </div>
      <div className="filtertitle">조건별 매물 검색</div>
      <div className="itemlist">매물리스트</div>
      <div className="filtertitle">문산읍 추천매물</div>
    </Wrap>
  );
};

export default MobileHomeContent;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  /* border: 1px solid black; */
  span {
    color: #0059f9;
    font-size: 20px;
    line-height: 24px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    width: 100%;
    height: 24px;
    margin-top: 46px;
    margin-bottom: 31px;
  }
  div {
    margin: 0 20px;
    width: 100%;
    /* border: 1px solid black; */
  }

  .branding {
    width: 100%;
    height: 80px;
    font-family: 'Acumin Pro';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.38);
    margin-bottom: 16px;
  }
  .searchBar {
    width: 100%;
    height: 58px;
    border: 1px solid transparent;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .searchicon {
    margin-left: 10px;
    margin-right: 5px;
  }
  .searchinput {
    height: 22px;
    width: 80%;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    border: none;
    outline: none;
    &::placeholder {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.02em;
      color: rgba(0, 0, 0, 0.87);
    }
  }
  .filtertitle {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 20px;
  }
  .itemlist {
    width: 100%;
    height: 150px;
    margin-bottom: 30px;
  }
`;
