import CommonButton from '@components/Button';
import SelectedButton from '@components/Button/selectedButton';
import InputRange from '@components/Inputs/inputRange';
import styled from '@emotion/styled';
import useStoreFilter from '@zustand/filter';
import { useState } from 'react';

const ItemSaleTypeFilter = () => {
  const { filtercondition, setFilterCondition } = useStoreFilter(
    state => state,
  );
  const handleItemTypeChange = (event: any) => {
    setFilterCondition('transaction', event?.target.value);
  };

  const closeButton = () => {
    setFilterCondition('id', 0);
  };
  const initialData = {
    saleMin: 0,
    saleMax: 100000,
    monthlyMin: 0,
    monthlyMax: 300,
    jenseMin: 0,
    jenseMax: 100000,
    depositMin: 0,
    depositMax: 100000,
  };

  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterCondition(name, parseInt(value, 10));
  };
  return (
    <Wrap>
      <OptionBar>
        <div className="optionTitle">거래 유형</div>
        <div className="optionList">
          <SelectedButton
            type="button"
            value="monthly"
            onClick={handleItemTypeChange}
            selected={filtercondition?.transaction}
          >
            월세
          </SelectedButton>

          <SelectedButton
            type="button"
            value="jense"
            onClick={handleItemTypeChange}
            selected={filtercondition?.transaction}
          >
            전세
          </SelectedButton>
          <SelectedButton
            type="button"
            value="sale"
            onClick={handleItemTypeChange}
            selected={filtercondition?.transaction}
          >
            매매
          </SelectedButton>
        </div>
        <div className="optionTitle">가격</div>
        <div>
          <InputRange
            inputMaxtitle="300만원"
            inputTitle="월세"
            setFilterData={setFilterCondition}
            minRangeName="monthlyMin"
            maxRangeName="monthlyMax"
            priceStep={5}
            priceGap={5}
            filterData={filtercondition}
            rangeHandler={rangeHandler}
            initialData={initialData}
          />
          <InputRange
            inputMaxtitle="10억"
            inputTitle="보증금"
            setFilterData={setFilterCondition}
            minRangeName="depositMin"
            maxRangeName="depositMax"
            priceStep={500}
            priceGap={500}
            filterData={filtercondition}
            rangeHandler={rangeHandler}
            initialData={initialData}
          />
          <InputRange
            inputMaxtitle="10억"
            inputTitle="전세"
            setFilterData={setFilterCondition}
            minRangeName="jenseMin"
            maxRangeName="jenseMax"
            priceStep={1000}
            priceGap={1000}
            filterData={filtercondition}
            rangeHandler={rangeHandler}
            initialData={initialData}
          />
          <InputRange
            inputMaxtitle="10억"
            inputTitle="매매"
            setFilterData={setFilterCondition}
            minRangeName="saleMin"
            maxRangeName="saleMax"
            priceStep={1000}
            priceGap={1000}
            filterData={filtercondition}
            rangeHandler={rangeHandler}
            initialData={initialData}
          />
        </div>
      </OptionBar>
      <CloseOptionBar>
        <CommonButton whiteButton onClick={closeButton}>
          취소
        </CommonButton>
        <CommonButton
          onClick={() => {
            console.log(filtercondition);
          }}
        >
          적용
        </CommonButton>
      </CloseOptionBar>
    </Wrap>
  );
};

export default ItemSaleTypeFilter;

const Wrap = styled.div`
  position: fixed;
  background-color: white;

  top: 134px;
  left: 0;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 3;
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
  background: #f5f5f5;
  flex: none;
  order: 4;
  flex-grow: 0;
`;