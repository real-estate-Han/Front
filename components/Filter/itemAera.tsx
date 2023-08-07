import styled from '@emotion/styled';
import CommonButton from '@components/Button';
import InputRange from '@components/Inputs/inputRange';
import { postType } from '@utils/type';
import useStoreFilter, { selectedDataFn } from '@zustand/filter';

interface IProps {
  clusterData: postType[];
}
const ItemAreaFilter = ({ clusterData }: IProps) => {
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setFilterdData,
    setSelectedData,
    setIsFiltered,
  } = useStoreFilter(state => state);
  const filterButton = () => {
    const selected = selectedDataFn(clusterData, filtercondition);
    setSelectedData(selected);
    setFilterCondition('id', 0);
    setFilterdData(selected);
    setIsFiltered(true);
  };
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
    areaMin: 0,
    areaMax: 300,
    buildingMin: 0,
    buildingMax: 300,
    landMin: 0,
    landMax: 300,
  };

  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterCondition(name, parseInt(value, 10));
  };
  return (
    <Wrap>
      <OptionBar>
        <div className="optionTitle">면적</div>
        <div>
          {filtercondition.type !== 'land' &&
          filtercondition.type !== 'none' ? (
            <InputRange
              inputMaxtitle="300평"
              isLand
              inputTitle="전용면적"
              setFilterData={setFilterCondition}
              minRangeName="areaMin"
              maxRangeName="areaMax"
              priceStep={5}
              priceGap={5}
              filterData={filtercondition}
              rangeHandler={rangeHandler}
              initialData={initialData}
            />
          ) : null}
          {filtercondition.type === 'shop' ||
          filtercondition.type === 'factory' ? (
            <InputRange
              isLand
              inputMaxtitle="300평"
              inputTitle="건축면적"
              setFilterData={setFilterCondition}
              minRangeName="buildingMin"
              maxRangeName="buildingMax"
              priceStep={5}
              priceGap={5}
              filterData={filtercondition}
              rangeHandler={rangeHandler}
              initialData={initialData}
            />
          ) : null}
          {filtercondition.type === 'land' ? (
            <InputRange
              isLand
              inputMaxtitle="300평"
              inputTitle="토지면적"
              setFilterData={setFilterCondition}
              minRangeName="landMin"
              maxRangeName="landMax"
              priceStep={5}
              priceGap={5}
              filterData={filtercondition}
              rangeHandler={rangeHandler}
              initialData={initialData}
            />
          ) : null}
          {filtercondition.type === 'none' ? (
            <div>매물 종류를 골라주세요</div>
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

export default ItemAreaFilter;

const Wrap = styled.div`
  position: fixed;
  background-color: white;

  top: 134px;
  left: 0;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 9;
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
