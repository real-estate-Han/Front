import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import PostItem from '@components/PostItem';
import { useQuery } from '@apollo/client';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
const MobileHomeContent = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  const postData = clusterData?.allpost?.posts;
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const inputBoxScroll = inputBoxRef.current?.scrollHeight;

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log(scrollHeight, scrollTop, clientHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Wrap>
      <span>한세일 부동산</span>
      <div className="branding">한세일 부동산의 브랜딩 문구</div>
      <SearchBar ref={inputBoxRef}>
        <Image className="searchicon" src="/icon/search.svg" width={28} height={28} alt="search.svg"></Image>
        <input className="searchinput" placeholder="지역을 입력하세요" />
      </SearchBar>
      <div className="filtertitle">조건별 매물 검색</div>
      <div className="itemcategorylist ">
        <div className="itemcategory">원룸 / 빌라</div>
        <div className="itemcategory">아파트</div>
        <div className="itemcategory">상가</div>
        <div className="itemcategory">토지</div>
      </div>
      <div className="filtertitle">문산읍 추천매물</div>
      <div className="recommandItem">
        {postData.map((p: any, idx: number) => {
          return <PostItem key={idx} widthPercent={40} postData={p}></PostItem>;
        })}
      </div>
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

  .filtertitle {
    width: 100%;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 20px;
  }
  .itemcategorylist {
    width: 100%;
    display: flex;
    /* flex: none; */
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    min-width: 100%;
    overflow: auto;
    height: 150px;
    margin-bottom: 30px;
  }
  .itemcategory {
    /* float: left; */
    flex: none;
    display: flex;
    margin-right: 10px;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background: #0059f9;
    border-radius: 4px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .recommandItem {
    float: left;
    width: 100%;
    padding-bottom: 31px;
  }
`;
const SearchBar = styled.div`
  width: 100%;
  height: 58px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;

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
`;
// const [mouseDownClientX, setMouseDownClientX] = useState(0);
// const [mouseDownClientY, setMouseDownClientY] = useState(0);
// const [mouseUpClientX, setMouseUpClientX] = useState(0);
// const [mouseUpClientY, setMouseUpClientY] = useState(0);
// const [tochedX, setTochedX] = useState(0);
// const [tochedY, setTochedY] = useState(0);

// const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
//   setMouseDownClientX(e.clientX);
//   setMouseDownClientY(e.clientY);
// };
// const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
//   setMouseUpClientX(e.clientX);
//   setMouseUpClientY(e.clientY);
// };
// useEffect(() => {
//   const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
//   const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
//   const vector = dragSpaceX / dragSpaceY;

//   if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
//     if (mouseUpClientX < mouseDownClientX) {
//       // handleNextBtn();
//     } else if (mouseUpClientX > mouseDownClientX) {
//       // handlePrevBtn();
//     }
//   }
// }, [mouseUpClientX]);

// const onTouchStart = (e: React.TouchEvent) => {
//   setTochedX(e.changedTouches[0].pageX);
//   setTochedY(e.changedTouches[0].pageY);
// };
// const onTouchEnd = (e: React.TouchEvent) => {
//   const distanceX = tochedX - e.changedTouches[0].pageX;
//   const distanceY = tochedY - e.changedTouches[0].pageY;
//   const vector = Math.abs(distanceX / distanceY);

//   if (distanceX > 30 && vector > 2) {
//     // handleNextBtn();
//   } else if (distanceX < -30 && vector > 2) {
//     // handlePrevBtn();
//   }
// };
