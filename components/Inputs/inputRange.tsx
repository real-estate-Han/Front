import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { changeCash } from '@utils/postString';

interface InputRangeProps {
  priceGap: number;
  filterData: any;
  initialData: any;
  setFilterData: any;
  priceStep: number;
  rangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minRangeName: string;
  maxRangeName: string;
  inputTitle: string;
  inputMaxtitle: string;
  isLand?: boolean;
}

const InputRange = ({
  priceGap,
  filterData,
  rangeHandler,
  priceStep,
  minRangeName,
  maxRangeName,
  initialData,
  setFilterData,
  inputTitle,
  inputMaxtitle,
  isLand,
}: InputRangeProps) => {
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  const twoRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (filterData[maxRangeName] - filterData[minRangeName] < priceGap) {
      setFilterData(minRangeName, parseInt(value, 10) - priceGap);
      setFilterData(maxRangeName, parseInt(value, 10) + priceGap);
    } else {
      setRangeMinPercent(
        (filterData[minRangeName] / initialData[maxRangeName]) * 100,
      );
      setRangeMaxPercent(
        100 - (filterData[maxRangeName] / initialData[maxRangeName]) * 100,
      );
    }
  };
  useEffect(() => {
    setRangeMinPercent(
      (filterData[minRangeName] / initialData[maxRangeName]) * 100,
    );
    setRangeMaxPercent(
      100 - (filterData[maxRangeName] / initialData[maxRangeName]) * 100,
    );
  }, []);
  return (
    <Wrap>
      <div className="princeInfo">
        <span>{inputTitle}</span>
        <span style={{ color: 'blue' }}>{inputMaxtitle}</span>
      </div>
      <FilterPriceSlide>
        <FilterPriceSlideInner
          rangeMinPercent={rangeMinPercent}
          rangeMaxPercent={rangeMaxPercent}
        />
        <FilterPriceRangeMin
          name={minRangeName}
          type="range"
          min={initialData[minRangeName]}
          max={initialData[maxRangeName] - priceGap}
          step={priceStep}
          value={filterData[minRangeName]}
          onChange={e => {
            rangeHandler(e);
            twoRangeHandler(e);
          }}
        />
        <FilterPriceRangeMax
          name={maxRangeName}
          type="range"
          min={initialData[minRangeName] + priceGap}
          max={initialData[maxRangeName]}
          step={priceStep}
          value={filterData[maxRangeName]}
          onChange={e => {
            rangeHandler(e);
            twoRangeHandler(e);
          }}
        />
      </FilterPriceSlide>
      <div className="princeInfo">
        <span className="bottominfo">최소</span>
        <div className="bottominfo">
          <span>
            {isLand
              ? `${filterData[minRangeName]} 평`
              : changeCash(filterData[minRangeName])}
          </span>{' '}
          <span> ~ </span>{' '}
          <span>
            {isLand
              ? `${filterData[maxRangeName]} 평`
              : changeCash(filterData[maxRangeName])}
          </span>
        </div>
        <span className="bottominfo">최대</span>
      </div>
    </Wrap>
  );
};

export default InputRange;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 10px 0;

  .princeInfo {
    width: 85%;
    display: flex;
    justify-content: space-between;
  }
  .bottominfo {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #888888;
  }
`;

const FilterPriceSlide = styled.div`
  position: relative;
  height: 4px;
  width: 85%;
  border-radius: 10px;
  background: #f5f5f5;
`;

const FilterPriceSlideInner = styled.div<{
  rangeMinPercent: number;
  rangeMaxPercent: number;
}>`
  position: absolute;
  left: ${({ rangeMinPercent }) => `${rangeMinPercent + 2}%`};
  right: ${({ rangeMaxPercent }) => `${rangeMaxPercent + 2}%`};
  height: 4px;
  top: 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.mainColor.blue500};
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -14px;
  left: -3px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  pointer-events: none;
  &::-webkit-slider {
    position: absolute;
    top: -9px;
    width: 100%;
  }
  &::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 0.5px solid #f5f5f5;
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;
const FilterPriceRangeMax = styled.input`
  position: absolute;
  top: -14px;
  left: 0px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  pointer-events: none;
  &::-webkit-slider-thumb {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 0.5px solid #f5f5f5;
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;
