import CommonButton from '@components/Button';
import SelectedButton from '@components/Button/selectedButton';
import styled from '@emotion/styled';
import useStoreFilter, { selectedDataFn } from '@zustand/filter';
import { useState } from 'react';

const ItemTypeFilter = () => {
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setSelectedData,
    setIsFiltered,
  } = useStoreFilter(state => state);
  const filterButton = () => {
    const selected = selectedDataFn(filterdData, filtercondition);
    setSelectedData(selected);
    setFilterCondition('id', 0);
    setIsFiltered(true);
  };

  const handleItemTypeChange = (event: any) => {
    setFilterCondition('type', event?.target.value);
  };

  const closeButton = () => {
    setFilterCondition('id', 0);
  };
  return (
    <Wrap>
      <OptionBar>
        <div className="optionTitle">매물 종류</div>
        <div className="optionList">
          <SelectedButton
            type="button"
            value="oneroom"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            원룸
          </SelectedButton>

          <SelectedButton
            type="button"
            value="tworoom"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            투-쓰리룸
          </SelectedButton>
          <SelectedButton
            type="button"
            value="office"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            오피스텔
          </SelectedButton>
          <SelectedButton
            type="button"
            value="house"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            주택
          </SelectedButton>
          <SelectedButton
            type="button"
            value="apartment"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            아파트
          </SelectedButton>
          <SelectedButton
            type="button"
            value="land"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            토지
          </SelectedButton>
          <SelectedButton
            type="button"
            value="factory"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            공장-창고
          </SelectedButton>
          <SelectedButton
            type="button"
            value="shop"
            onClick={handleItemTypeChange}
            selected={filtercondition?.type}
          >
            상가
          </SelectedButton>
        </div>
      </OptionBar>
      <CloseOptionBar>
        <CommonButton whiteButton onClick={closeButton}>
          취소
        </CommonButton>
        <CommonButton
          onClick={() => {
            filterButton();
          }}
        >
          적용
        </CommonButton>
      </CloseOptionBar>
    </Wrap>
  );
};
export default ItemTypeFilter;

const Wrap = styled.div`
  position: fixed;
  background-color: white;
  z-index: 9;
  top: 134px;
  left: 0;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
  box-sizing: border-box;
  gap: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  @media (min-width: 1000px) {
    left: calc(50% - 500px);
  }
`;

const OptionBar = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  .optionTitle {
    margin: 16px auto 5px auto;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
  }
`;
const CloseOptionBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  height: 60px;
  z-index: 9;
  background: #f5f5f5;

  flex: none;
  order: 4;
  flex-grow: 0;
`;
