/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowForwardIos } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { MdOutlineSearch } from 'react-icons/md';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import useStoreFilter, {
  filterInitialData,
  selectedDataFn,
} from '@zustand/filter';
import { postType } from '@utils/type';
import PostItems from '@components/PostItem';

const MobileHomeContent = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  const postData = clusterData?.allpost?.posts;
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setSelectedData,
    setIsFiltered,
    isFiltered,
  } = useStoreFilter(state => state);

  const prefilter = async (type: string) => {
    await setFilterCondition('type', type);
    return type;
  };

  const filterButton = () => {
    const selected = selectedDataFn(postData, filtercondition);
    setSelectedData(selected);
    setIsFiltered(true);
    router.push('/main');
  };

  useEffect(() => {
    if (router.asPath === '/') {
      setIsFiltered(false);
    }
    if (filtercondition.type !== 'none' && !isFiltered) {
      filterButton();
    }
  }, [filtercondition]);

  return (
    <Wrap>
      <span className="titleLogo">한세일 부동산</span>
      <BrandingBox>
        <div>
          고객 신뢰를 최우선시 하는
          <br />
          전문가가 당신을 도와드립니다.
        </div>
        <div className="rightarrow">
          <MdArrowForwardIos size={20} />
        </div>
      </BrandingBox>
      <SearchBar ref={inputBoxRef}>
        <MdOutlineSearch className="searchicon" size={28} />
        <input className="searchinput" placeholder="지역을 입력하세요" />
      </SearchBar>
      <div className="filtertitle">조건별 매물 검색</div>
      <div className="itemcategorylist ">
        <div
          className="itemcategory filterone"
          onClick={() => {
            prefilter('oneroom');
          }}
        >
          <span className="oneroomText">원룸</span>
        </div>
        <div
          className="itemcategory filtertworoom"
          onClick={() => {
            prefilter('tworoom');
          }}
        >
          <span className="oneroomText">투-쓰리룸</span>
        </div>
        <div
          className="itemcategory filteroffice"
          onClick={() => {
            prefilter('office');
          }}
        >
          <span className="oneroomText">오피스텔</span>
        </div>
        <div
          className="itemcategory filtertwo"
          onClick={() => {
            prefilter('apartment');
          }}
        >
          <span className="oneroomText">아파트</span>
        </div>
        <div
          className="itemcategory filterhouse"
          onClick={() => {
            prefilter('house');
          }}
        >
          <span className="oneroomText">주택</span>
        </div>
        <div
          className="itemcategory filterfour"
          onClick={() => {
            prefilter('shop');
          }}
        >
          <span className="oneroomText">상가</span>
        </div>
        <div
          className="itemcategory filterfactory"
          onClick={() => {
            prefilter('factory');
          }}
        >
          <span className="oneroomText">공장-창고</span>
        </div>
        <div
          className="itemcategory filterthrid"
          onClick={() => {
            prefilter('land');
          }}
        >
          <span className="oneroomText">토지</span>
        </div>
      </div>
      <div className="filtertitle">문산읍 추천매물</div>
      <div className="recommandItem">
        {postData?.map((p: postType, idx: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return <PostItems key={p._id} widthPercent={40} postData={p} />;
        })}
      </div>
    </Wrap>
  );
};

export default MobileHomeContent;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 20px;
  /* border: 1px solid black; */

  .titleLogo {
    color: #0059f9;
    font-size: 20px;
    line-height: 24px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    width: 100%;
    height: 24px;
    margin-top: 41px;
    margin-bottom: 31px;
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
    flex: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    min-width: 100%;
    overflow: auto;
    height: 180px;
    margin-bottom: 30px;

    .oneroomText {
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px;
      border-radius: 4px;
    }
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
    background-size: cover;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }
  }
  .filterone {
    background-image: url('/oneroom.jpg');
  }
  .filtertwo {
    background-image: url('/apartmentimage.jpg');
  }
  .filterthrid {
    background-image: url('/landimage.jpg');
  }
  .filterfour {
    background-image: url('/shopimage.jpg');
  }
  .filtertworoom {
    background-image: url('/tworoom.jpg');
  }
  .filteroffice {
    background-image: url('/officetel.jpg');
  }
  .filterhouse {
    background-image: url('/house.jpg');
  }
  .filterfactory {
    background-image: url('/factory.jpg');
  }
  .recommandItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; // 각 아이템을 자리에 맞게 배치
    width: 100%;
    gap: 30px;

    /* & > * {
      flex-basis: 33%; // 한 줄에 4개 아이템이 들어가도록 설정
    } */
  }
`;
const BrandingBox = styled.div`
  width: 100%;
  height: 74px;
  box-sizing: border-box;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #9faffd;
  color: white;
  border-radius: 4px;
  margin-bottom: 16px;
  padding-left: 22px;
  padding-right: 10px;
  .rightarrow {
    font-size: 20px;
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
