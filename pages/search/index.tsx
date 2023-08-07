/* eslint-disable react/no-array-index-key */
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
  // 검색창 자동완성
  const wholeTextArray = [
    'apple',
    'banana',
    'coding',
    'javascript',
    '원티드',
    '프리온보딩',
    '프론트엔드',
  ];
  const [inputValue, setInputValue] = useState<string>('');
  const [isHaveInputValue, setIsHaveInputValue] = useState<boolean>(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter(textItem =>
        textItem.includes(inputValue),
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem: string) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

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
    <SearchWrap>
      <Sale>
        <BackBtn onClick={onClickBackBtn}>
          {' '}
          <MdArrowBackIos size={28} color="black" />
        </BackBtn>
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
      <div>
        <header>
          <SearchBar ref={inputBoxRef} onClick={onClickSearchBtn}>
            <MdOutlineSearch size={28} color="black" className="searchicon" />
            <div>
              {salesInput ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={changeInputValue}
                  onKeyUp={handleDropDownKey}
                  className="searchinput"
                  placeholder="매물번호 입력"
                />
              ) : (
                <input
                  type="text"
                  value={inputValue}
                  onChange={changeInputValue}
                  onKeyUp={handleDropDownKey}
                  className="searchinput"
                  placeholder="지역명 또는 단지명을 입력하세요."
                />
              )}
              <MdCancel
                size={28}
                color="#D9D9D9"
                className="cancleicon"
                onClick={() => setInputValue('')}
              >
                &times;
              </MdCancel>
              {isHaveInputValue && (
                <DropDownBox>
                  {dropDownList.length === 0 && (
                    <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
                  )}
                  {dropDownList.map((dropDownItem, dropDownIndex) => {
                    return (
                      <DropDownItem
                        key={dropDownIndex}
                        onClick={() => clickDropDownItem(dropDownItem)}
                        onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                        className={
                          dropDownItemIndex === dropDownIndex ? 'selected' : ''
                        }
                      >
                        {dropDownItem}
                      </DropDownItem>
                    );
                  })}
                </DropDownBox>
              )}
            </div>
          </SearchBar>
        </header>
        <div>
          {record ? <RecentSearch /> : saleNumberEmpty ? '' : <SearchExample />}
        </div>
      </div>
      {/* <WholeBox> */}
      {/* <Title text="AutoComplete" /> */}
      {/* <InputBox> */}
      {/* <Input type="text" value={inputValue} onChange={changeInputValue} onKeyUp={handleDropDownKey} />
          <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
        </InputBox>
        {isHaveInputValue && (
          <DropDownBox>
            {dropDownList.length === 0 && <DropDownItem>해당하는 단어가 없습니다</DropDownItem>}
            {dropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <DropDownItem
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={dropDownItemIndex === dropDownIndex ? 'selected' : ''}
                >
                  {dropDownItem}
                </DropDownItem>
              );
            })}
          </DropDownBox>
        )}
      </WholeBox> */}
    </SearchWrap>
  );
};
export default SearchPage;
const BackBtn = styled.section`
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 5px;
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
  /* display: flex; */
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
const SearchWrap = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;
const activeBorderRadius = '16px 16px 0 0';
const inactiveBorderRadius = '16px 16px 16px 16px';

const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;
const DeleteButton = styled.div`
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`;

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`;
