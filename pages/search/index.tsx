import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdOutlineLocationOn,
  MdLocationCity,
  MdDirectionsSubway,
} from 'react-icons/md';
import { MdOutlineSearch, MdCancel, MdArrowBackIos } from 'react-icons/md';
import SearchExample from './searchExample';
import RecentSearch from './recentSearch';

interface onAddKeyword {
  id: number;
  text: string;
}

const SearchPage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('saleItem');
  const [salesInput, setSalesInput] = useState<boolean>(false);
  const [saleNumberEmpty, setSaleNumberEmpty] = useState<boolean>(false);
  const [record, setRecord] = useState<boolean>(false);
  const inputBoxRef = useRef<HTMLDivElement>(null);

  const onClickBackBtn = () => {
    router.back();
  };
  const onClickSearchBtn = () => {
    setRecord(true);
  };
  const onClickSales = () => {
    setSalesInput(!salesInput);
  };
  const onClickNumber = () => {
    setSaleNumberEmpty(!saleNumberEmpty);
  };

  return (
    <>
      <BackBtn onClick={onClickBackBtn}>
        {' '}
        <MdArrowBackIos size={28} color="black" />
      </BackBtn>
      <Sale>
        <SaleItem
          selected={selected}
          onClick={() => {
            setSelected('saleItem');
            onClickSales();
            onClickNumber();
          }}
        >
          매물
        </SaleItem>
        <SaleNumber
          selected={selected}
          onClick={() => {
            setSelected('saleNumber');
            onClickSales();
            onClickNumber();
          }}
        >
          매물번호
        </SaleNumber>
      </Sale>
      <SearchWrap>
        <header>
          <SearchBar ref={inputBoxRef} onClick={onClickSearchBtn}>
            <MdOutlineSearch size={28} color="black" className="searchicon" />
            {salesInput ? (
              <input className="searchinput" placeholder="매물번호 입력" />
            ) : (
              <input
                className="searchinput"
                placeholder="지역명 또는 단지명을 입력하세요."
              />
            )}

            <MdCancel size={28} color="#D9D9D9" className="cancleicon" />
          </SearchBar>
        </header>
        <div>
          {record ? <RecentSearch /> : saleNumberEmpty ? '' : <SearchExample />}
        </div>
      </SearchWrap>
    </>
  );
};
export default SearchPage;
const BackBtn = styled.section`
  margin-left: 20px;
  margin-top: 5px;
`;
const Sale = styled.section`
  width: 100%;
  height: 55px;
  border: 1px solid transparent;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
  font-size: 16px;
`;
const SaleItem = styled.div<{ selected: string }>`
  position: relative;
  margin-left: 20px;
  color: ${({ selected }) => (selected === 'saleItem' ? 'black' : '#D9D9D9')};

  ::after {
    content: '';
    position: absolute;
    top: 47px;
    left: 0;
    display: ${({ selected }) => (selected === 'saleItem' ? 'block' : 'none')};
    width: 100%;
    height: 2px;
    margin: -10px 0 0 0;
    background: #222222;
  }
`;
const SaleNumber = styled.div<{ selected: string }>`
  margin-left: 7px;
  position: relative;
  color: ${({ selected }) => (selected === 'saleNumber' ? 'black' : '#D9D9D9')};

  ::after {
    content: '';
    display: ${({ selected }) =>
      selected === 'saleNumber' ? 'block' : 'none'};
    position: absolute;
    top: 47px;
    left: 0;
    width: 100%;
    height: 2px;
    margin: -10px 0 0 0;
    background: #222222;
  }
`;
const SearchBar = styled.div`
  width: 90%;
  height: 52.05px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-left: 20px;

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
  .cancleicon {
    margin-left: 5px;
    margin-right: 20px;
  }
`;
const SearchWrap = styled.div``;
