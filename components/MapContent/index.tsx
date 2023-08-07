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
import { itemTypeString } from '@utils/postString';
import { postType } from '@utils/type';
import useStoreFilter, {
  filterInitialData,
  selectedDataFn,
} from '@zustand/filter';
import useStore from '@zustand/store';
import { useRouter } from 'next/router';
import {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MdOutlineSearch, MdRestartAlt } from 'react-icons/md';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

const MapContents = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA, {
    fetchPolicy: 'network-only',
  });
  const router = useRouter();
  // clusterData?.allpost?.posts
  const {
    filterdData,
    filtercondition,
    setFilterdData,
    selectedData,
    isFiltered,
    initialDatas,
    setInitialDatas,
  } = useStoreFilter(state => state);
  // const [initialDatas, setInitialDatas] = useState<postType[]>(filterdData);

  const { likePostState } = useStore(state => state);
  const likedData = clusterData?.allpost?.posts?.filter((p: any) => {
    return likePostState?.some((l: any) => {
      return p?._id === l;
    });
  });

  useEffect(() => {
    setFilterdData(clusterData?.allpost?.posts);
  }, [clusterData]);

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

  useLayoutEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [throttle]);

  useEffect(() => {
    if (router.asPath === '/heart') {
      setInitialDatas(likedData);
    }
    if (router.asPath !== '/heart') {
      if (selectedData && selectedData?.length > 0) {
        setInitialDatas(selectedData);
      }
      if (isFiltered && selectedData?.length === 0) {
        setInitialDatas([]);
      }
      if (!isFiltered && selectedData?.length === 0) {
        setInitialDatas(clusterData?.allpost?.posts);
      }
      if (!isFiltered && selectedData?.length > 0) {
        setInitialDatas(selectedData);
      }
    }
  }, [selectedData, filterdData]);

  return (
    <>
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
            {filterdData?.map((p: postType) => {
              return (
                <>
                  <PostItems wide key={p._id} widthPercent={40} postData={p} />
                </>
              );
            })}
          </ItemBox>
        </ItemList>
      </ContentBox>
    </>
  );
};
export default MapContents;

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
    padding-left: 10px;
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
  height: 100%;
  overflow-y: scroll;
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
    min-height: 800px;
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
