/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client';
import OptionButton from '@components/Button/optionButtion';
import ItemAreaFilter from '@components/Filter/itemAera';
import ItemManageFilter from '@components/Filter/itemManage';
import ItemSaleTypeFilter from '@components/Filter/itemSaletype';
import ItemTypeFilter from '@components/Filter/itemType';
import Hr from '@components/Hr';
import ClusterMap from '@components/KakaoMap/clusterMap';
import PostItems from '@components/PostItem';

import styled from '@emotion/styled';

import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { postType } from '@utils/type';
import useStoreFilter from '@zustand/filter';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

const MainPage = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);

  // clusterData?.allpost?.posts
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setFilterdData,
    selectedData,
    isFiltered,
  } = useStoreFilter(state => state);
  const [initialDatas, setInitialDatas] = useState<postType[]>(filterdData);
  const filerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterCondition('id', parseInt(event?.currentTarget?.value, 10));
  };
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

  useEffect(() => {
    if (selectedData && selectedData?.length > 0) {
      setInitialDatas(selectedData);
    }
    if (isFiltered && selectedData?.length === 0) {
      setInitialDatas([]);
    }
    if (!isFiltered && selectedData?.length === 0) {
      setInitialDatas(clusterData?.allpost?.posts);
    }
  }, [selectedData, filterdData]);

  return (
    <div>
      <Wrap>
        <UtilBox className="whiteback" barFixed={barFixed}>
          <UtilContainer barFixed={barFixed}>
            <SearchBar>
              <MdOutlineSearch className="searchicon" size={28} />
              <input className="searchinput" placeholder="지역을 입력하세요" />
            </SearchBar>
            <OptionBar ref={baseRef}>
              <OptionButton selected="1" value="">
                <MdOutlineSettingsInputComponent size={24} />
              </OptionButton>
              <OptionButton
                selected={filtercondition?.id}
                value={1}
                onClick={filerOpen}
              >
                매물종류
              </OptionButton>
              <OptionButton
                selected={filtercondition?.id}
                value={2}
                onClick={filerOpen}
              >
                거래유형/가격
              </OptionButton>
              <OptionButton
                selected={filtercondition?.id}
                value={3}
                onClick={filerOpen}
              >
                관리비
              </OptionButton>
              <OptionButton
                selected={filtercondition?.id}
                value={4}
                onClick={filerOpen}
              >
                면적
              </OptionButton>
            </OptionBar>
          </UtilContainer>
        </UtilBox>
        {filtercondition?.id === 1 && <ItemTypeFilter />}
        {filtercondition?.id === 2 && <ItemSaleTypeFilter />}
        {filtercondition?.id === 3 && <ItemManageFilter />}
        {filtercondition?.id === 4 && <ItemAreaFilter />}
        <ContentBox>
          <ClusterMap initialData={initialDatas} />

          <ItemList barFixed={barFixed}>
            <GrayBarbox barFixed={barFixed}>
              <div className="graybar" />
            </GrayBarbox>
            <ItemTabBar barFixed={barFixed}>
              <div>전체매물 {clusterData?.allpost?.totalPosts}</div>
              <div>단지 매물 {filterdData?.length}</div>
            </ItemTabBar>
            <ItemBox barFixed={barFixed}>
              {initialDatas?.map((p: any, idx: number) => {
                return (
                  <>
                    <PostItems wide key={idx} widthPercent={40} postData={p} />
                  </>
                );
              })}
            </ItemBox>
          </ItemList>
        </ContentBox>
      </Wrap>
    </div>
  );
};
export default MainPage;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  transition: all 2s ease;
  overflow-x: hidden;
`;
const UtilBox = styled.div<{ barFixed: boolean }>`
  background-color:  background-color: ${({ theme }) =>
    theme.mainColor.blue200};;
  width: 100%;
  height: ${({ barFixed }) => (barFixed ? '140px' : '135px')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  
`;
const UtilContainer = styled.div<{ barFixed: boolean }>`
  background-color: white;
  width: 82%;
  margin: auto;
  height: ${({ barFixed }) => (barFixed ? '140px' : '135px')};
  z-index: 3;
  @media (min-width: 1000px) {
    width: 1000px;
  }
`;
const SearchBar = styled.div`
  background-color: white;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 5%;
  width: 90%;
  max-width: 1000px;
  height: 58px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  margin-top: 10px;
  @media (min-width: 1000px) {
    left: calc(50% - 400px);
    width: 800px;
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
`;
const OptionBar = styled.div`
  position: fixed;
  background-color: white;
  top: 78px;
  left: 5%;
  width: 90%;
  max-width: 1000px;
  height: 54px;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 3;
  gap: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (min-width: 1000px) {
    left: calc(50% - 400px);
    width: 800px;
  }
`;

const ContentBox = styled.div`
  @media (max-width: 999px) {
    width: 100%;
  }
  @media (min-width: 1000px) {
    width: 100%;
    height: 100vh;
    background-color: white;
    perspective: 10px;
  }
`;

const ItemList = styled.div<{ barFixed: boolean }>`
  @media (max-width: 999px) {
    width: 100%;
    min-height: 380px;
    height: 70vh;
    margin-top: 80vh;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    transition: all 2s ease;
  }
  @media (min-width: 1000px) {
    width: 400px;
    height: 700px;
    background-color: white;
    position: absolute;
    top: 140px;
    right: calc(20% - 210px);
    z-index: 5;
    box-sizing: border-box;
    padding-left: 5px;
  }
`;
const GrayBarbox = styled.div<{ barFixed: boolean }>`
  width: 100%;
  height: 15px;
  z-index: 4;
  background-color: white;
  border: 1px solid white;
  ${({ barFixed }) =>
    barFixed &&
    `
    position: fixed;
    
    top: 132px;
    transition: all 2s ease;
    left: calc(50% -24px);
    @media (min-width: 1000px) {
      max-width: 1000px;
      display : none;
  }
  `}
  @media (min-width: 1000px) {
    display: none;
  }
  .graybar {
    z-index: 2;
    width: 48px;
    /* left: calc(50% -24px); */
    height: 4px;
    background: #d9d9d9;
    border-radius: 4px;
    margin: 10px auto;
  }
`;
const ItemTabBar = styled.div<{ barFixed: boolean }>`
  z-index: 3;
  transition: all 2s ease;
  width: 100%;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #f5f5f5;
  background-color: white;
  padding-bottom: 5px;
  ${({ barFixed }) =>
    barFixed &&
    `
    transition: all 2s ease;
    z-index: 3;
      background-color: white;
    position: fixed;
    top: 139px;
    @media (min-width: 1000px) {
      max-width: 1000px;
      left: calc(50% - 500px);
  }
  `}
  @media (min-width: 1000px) {
    display: flex;
    z-index: 5;
  }
`;

const ItemBox = styled.div<{ barFixed: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  background-color: white;
  @media (max-width: 699px) {
    justify-content: center;
  }
  @media (min-width: 1000px) {
    display: flex;
  }
  @media (max-width: 999px) {
    z-index: 3;
    box-sizing: border-box;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 290px;
    transition: all 2s ease;

    ${({ barFixed }) =>
      barFixed &&
      `
    min-height: 700px;
    transition: all 2s ease;
    z-index: 2;
    background-color: white;
    position: fixed;
    top: 181px;
    @media (min-width: 1000px) {
      max-width: 1000px;
      left: calc(50% - 500px);
  }
  `}
  }
`;
