/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client';
import OptionButton from '@components/Button/optionButtion';
import Hr from '@components/Hr';
import ClusterMap from '@components/KakaoMap/clusterMap';
import PostItems from '@components/PostItem';

import styled from '@emotion/styled';

import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import useStore from '@zustand/store';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

const MainPage = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  // clusterData?.allpost?.posts
  const { filterdData, setFilterdData } = useStore(state => state);
  useEffect(() => {
    setFilterdData(clusterData?.allpost?.posts);
  }, [clusterData]);
  const baseRef = useRef<HTMLDivElement>(null);
  // console.log(baseRef);
  const router = useRouter();

  const [throttle, setThrottle] = useState<boolean>(false);
  const [barFixed, setBarFixed] = useState<boolean>(false);
  const handleScroll = () => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        if (document.documentElement.scrollTop >= 420) {
          setBarFixed(true);
          setThrottle(false);
        } else if (document.documentElement.scrollTop < 420) {
          setBarFixed(false);
          setThrottle(false);
        }
      }, 200);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [throttle]);
  return (
    <Wrap>
      <UtilBox className="whiteback" barFixed={barFixed}>
        <SearchBar>
          <MdOutlineSearch className="searchicon" size={28} />
          <input className="searchinput" placeholder="지역을 입력하세요" />
        </SearchBar>
        <OptionBar ref={baseRef}>
          <OptionButton selected="1" value="">
            <MdOutlineSettingsInputComponent size={24} />
          </OptionButton>
          <OptionButton selected="1" value="">
            매물종류
          </OptionButton>
          <OptionButton selected="1" value="">
            거래유형/가격
          </OptionButton>
          <OptionButton selected="1" value="">
            관리비
          </OptionButton>
          <OptionButton selected="1" value="">
            면적
          </OptionButton>
        </OptionBar>
      </UtilBox>

      <ClusterMap />
      <ItemList barFixed={barFixed}>
        <div className="graybar" />
        <ItemTabBar barFixed={barFixed}>
          <div>전체매물 23</div>
          <div>단지 2</div>
        </ItemTabBar>
        <ItemBox barFixed={barFixed}>
          {filterdData?.map((p: any, idx: number) => {
            return (
              <>
                <PostItems wide key={idx} widthPercent={40} postData={p} />
              </>
            );
          })}
        </ItemBox>
      </ItemList>
    </Wrap>
  );
};
export default MainPage;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  transition: all 2s ease;
`;
const UtilBox = styled.div<{ barFixed: boolean }>`
  background-color: white;
  width: 100%;
  height: ${({ barFixed }) => (barFixed ? '140px' : '135px')};

  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`;
const SearchBar = styled.div`
  background-color: white;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 5%;
  width: 90%;
  height: 58px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  margin-top: 10px;
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
const OptionBar = styled.div`
  position: fixed;
  background-color: white;
  top: 78px;
  left: 5%;
  width: 90%;
  height: 54px;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 3;
  gap: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ItemList = styled.div<{ barFixed: boolean }>`
  width: 100%;
  min-height: 350px;
  height: 70vh;
  margin-top: 83vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  transition: all 2s ease;
  .graybar {
    width: 48px;
    /* left: calc(50% -24px); */
    height: 4px;
    background: #d9d9d9;
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 12px;
    ${({ barFixed }) =>
      barFixed &&
      `
      z-index: 6;
    position: fixed;
    top: 132px;
    transition: all 2s ease;
    left: calc(50% -24px);
  `}
  }
`;

const ItemTabBar = styled.div<{ barFixed: boolean }>`
  transition: all 2s ease;
  width: 100%;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #f5f5f5;
  background-color: white;
  ${({ barFixed }) =>
    barFixed &&
    `
    transition: all 2s ease;
    z-index: 4;
      background-color: white;
    position: fixed;
    top: 139px;
    left: 0;
  `}
`;

const ItemBox = styled.div<{ barFixed: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 10px;
  padding-bottom: 290px;
  transition: all 2s ease;
  background-color: white;
  ${({ barFixed }) =>
    barFixed &&
    `
    transition: all 2s ease;
      z-index: 2;
      background-color: white;
    position: fixed;
    top: 182px;
    left: 0
  `}
`;
