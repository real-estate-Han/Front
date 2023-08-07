/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client';
import OptionButton from '@components/Button/optionButtion';
import ItemAreaFilter from '@components/Filter/itemAera';
import ItemManageFilter from '@components/Filter/itemManage';
import ItemSaleTypeFilter from '@components/Filter/itemSaletype';
import ItemTypeFilter from '@components/Filter/itemType';
import Hr from '@components/Hr';
import ClusterMap from '@components/KakaoMap/clusterMap';
import MapContents from '@components/MapContent';
import PostItems from '@components/PostItem';

import styled from '@emotion/styled';

import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { itemTypeString } from '@utils/postString';
import { postType } from '@utils/type';
import useStoreFilter, {
  filterInitialData,
  selectedDataFn,
} from '@zustand/filter';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { MdOutlineSearch, MdRestartAlt } from 'react-icons/md';
import { MdOutlineSettingsInputComponent } from 'react-icons/md';

const MainContent = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);

  // clusterData?.allpost?.posts
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setFilterdData,
    selectedData,
    isFiltered,
    resetFilterCondition,
    setSelectedData,
    setIsFiltered,
    initialDatas,
    setInitialDatas,
  } = useStoreFilter(state => state);
  // const [initialDatas, setInitialDatas] = useState<postType[]>(filterdData);
  const filerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterCondition('id', parseInt(event?.currentTarget?.value, 10));
  };
  useEffect(() => {
    setFilterdData(clusterData?.allpost?.posts);
  }, [clusterData]);
  const baseRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

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

  const isSelected = (value: number, x: string, y: string) => {
    if (filtercondition?.id === value) {
      return value;
    }
    if (x !== y) {
      return value;
    }
    return 0;
  };

  const isSelected2 = (value: number) => {
    if (filtercondition?.id === value) {
      return value;
    }
    if (
      filtercondition.areaMax !== filterInitialData.areaMax ||
      filtercondition.areaMin !== filterInitialData.areaMin ||
      filtercondition.buildingMax !== filterInitialData.buildingMax ||
      filtercondition.buildingMin !== filterInitialData.buildingMin ||
      filtercondition.landMax !== filterInitialData.landMax ||
      filtercondition.landMin !== filterInitialData.landMin
    ) {
      return value;
    }
  };

  const isSelected3 = (value: number) => {
    if (filtercondition?.id === value) {
      return value;
    }
    if (
      filtercondition.manageMax !== filterInitialData.manageMax ||
      filtercondition.manageMin !== filterInitialData.manageMin
    ) {
      return value;
    }
  };

  const prevResetData = () => {
    resetFilterCondition(filterInitialData);
  };

  const resetButtonHandler = async () => {
    setIsFiltered(false);
    // prevResetData();
    const selected = await selectedDataFn(
      clusterData?.allpost?.posts,
      filterInitialData,
    );
    setSelectedData(selected);
    setFilterdData(clusterData?.allpost?.posts);
  };
  return (
    <div>
      <Wrap>
        <UtilBox className="whiteback" barFixed={false}>
          <UtilContainer barFixed={false}>
            <SearchBar>
              <MdOutlineSearch className="searchicon" size={28} />
              <input className="searchinput" placeholder="지역을 입력하세요" />
            </SearchBar>
            <OptionBar ref={baseRef}>
              <OptionButton selected="1" value="">
                <MdOutlineSettingsInputComponent size={24} />
              </OptionButton>
              <OptionButton
                selected={isSelected(1, filtercondition?.type, 'none')}
                value={1}
                onClick={filerOpen}
              >
                {filtercondition.type !== 'none'
                  ? itemTypeString(filtercondition?.type)
                  : '매물종류'}
              </OptionButton>
              <OptionButton
                selected={isSelected(2, filtercondition?.transaction, 'none')}
                value={2}
                onClick={filerOpen}
              >
                거래유형/가격
              </OptionButton>
              <OptionButton
                selected={isSelected3(3)}
                value={3}
                onClick={filerOpen}
              >
                관리비
              </OptionButton>
              <OptionButton
                selected={isSelected2(4)}
                value={4}
                onClick={filerOpen}
              >
                면적
              </OptionButton>
              <OptionButton
                selected={0}
                value={5}
                onClick={() => {
                  prevResetData();
                  resetButtonHandler();
                }}
              >
                <MdRestartAlt size={24} />
              </OptionButton>
            </OptionBar>
          </UtilContainer>
        </UtilBox>
        {filtercondition?.id === 1 && (
          <ItemTypeFilter clusterData={clusterData?.allpost?.posts} />
        )}
        {filtercondition?.id === 2 && (
          <ItemSaleTypeFilter clusterData={clusterData?.allpost?.posts} />
        )}
        {filtercondition?.id === 3 && (
          <ItemManageFilter clusterData={clusterData?.allpost?.posts} />
        )}
        {filtercondition?.id === 4 && (
          <ItemAreaFilter clusterData={clusterData?.allpost?.posts} />
        )}
        <MapContents />
      </Wrap>
    </div>
  );
};
export default MainContent;

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
