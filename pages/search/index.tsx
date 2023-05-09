import styled from '@emotion/styled';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function SearchPage() {
  const [backPoint, setBackPoint] = useState<boolean>(false);
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>('saleItem');

  return (
    <>
      <BackPoint>뒤로</BackPoint>
      <Sale>
        <SaleItem
          selected={selected}
          onClick={() => {
            setSelected('saleItem');
          }}
        >
          매물
        </SaleItem>
        <SaleNumber
          selected={selected}
          onClick={() => {
            setSelected('saleNumber');
          }}
        >
          매물번호
        </SaleNumber>
      </Sale>

      <SearchBar ref={inputBoxRef}>
        <Image className="searchicon" src="/icon/search.svg" width={28} height={28} alt="search.svg"></Image>
        <input className="searchinput" placeholder="지역명 또는 단지명을 입력하세요" />
        <Image className="cancleicon" src="/icon/cancle.svg" width={28} height={28} alt="cancle.svg"></Image>
      </SearchBar>

      <SearchExample>
        <h2>이렇게 검색해보세요.</h2>
        <Image className="localicon" src="/icon/local.svg" width={28} height={28} alt="local.svg"></Image>
        <div>지역 ex) 파주시</div>
        <div>아파트 ex) 휴먼시아 아파트</div>
        <div>기차역 ex) 문산역</div>
      </SearchExample>
    </>
  );
}
const BackPoint = styled.section``;
const Sale = styled.section`
  width: 100%;
  height: 58px;
  border: 1px solid transparent;
  border-bottom: 1px solid black;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const SaleItem = styled.div<{ selected: string }>`
  position: relative;
  ::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 0;
    display: ${({ selected }) => (selected === 'saleItem' ? 'block' : 'none')};
    width: 100%;
    height: 5px;
    margin: -10px 0 0 0;
    background: moccasin;
  }
`;
const SaleNumber = styled.div<{ selected: string }>`
  margin-left: 10px;
  position: relative;
  ::after {
    content: '';
    display: ${({ selected }) => (selected === 'saleNumber' ? 'block' : 'none')};
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 5px;
    margin: -10px 0 0 0;
    background: moccasin;
  }
`;
const SearchBar = styled.div`
  width: 100%;
  height: 58px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;

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
    .cancleicon {
      margin-left: 5px;
      margin-right: 10px;
    }
  }
`;
const SearchExample = styled.div`
  width: 100%;
  height: 552px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  .localicon {
    margin-left: 10px;
    margin-right: 5px;
  }
`;
