import styled from '@emotion/styled';
import CommonButton from '@components/Button';
import SelectedButton from '@components/Button/selectedButton';
import InputRange from '@components/Inputs/inputRange';
import { postType } from '@utils/type';
import useStoreFilter, { selectedDataFn } from '@zustand/filter';

interface IProps {
  clusterData: postType[];
}

const ItemSaleTypeFilter = ({ clusterData }: IProps) => {
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setFilterdData,
    setSelectedData,
    setIsFiltered,
  } = useStoreFilter(state => state);
  const handleItemTypeChange = (event: any) => {
    setFilterCondition('transaction', event?.target.value);
  };

  const filterButton = () => {
    const selected = selectedDataFn(clusterData, filtercondition);
    setSelectedData(selected);
    setFilterCondition('id', 0);
    setFilterdData(selected);
    setIsFiltered(true);
  };

  const closeButton = () => {
    setFilterCondition('id', 0);
  };
  const initialData = {
    saleMin: 0,
    saleMax: 100000,
    monthlyMin: 0,
    monthlyMax: 500,
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
          {filtercondition?.transaction === 'none' ? (
            <div className="optiondesc">거래 유형을 정해주세요</div>
          ) : null}
          {filtercondition?.transaction === 'monthly' ? (
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
          ) : null}
          {filtercondition?.transaction === 'monthly' ? (
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
          ) : null}
          {filtercondition?.transaction === 'jense' ? (
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
          ) : null}
          {filtercondition?.transaction === 'sale' ? (
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
          ) : null}
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

export default ItemSaleTypeFilter;

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
  .optiondesc {
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
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
