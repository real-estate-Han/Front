import styled from '@emotion/styled';
import { MdOutlineLocationOn, MdLocationCity, MdOutlineDirectionsSubwayFilled } from 'react-icons/md';

function SearchExample() {
  return (
    <SearchExampleContainer>
      <SearchExampleTitle>이렇게 검색해보세요</SearchExampleTitle>
      <SearchExampleDiv>
        <LocalContainer>
          <MdOutlineLocationOn size={24} color="#0059F9" />
          <LocalWrap>
            <LoclaDiv>지역</LoclaDiv>
            <LocalEx>ex) 파주시</LocalEx>
          </LocalWrap>
        </LocalContainer>
        <LocalContainer>
          <MdLocationCity size={24} color="#0059F9" />
          <LocalWrap>
            {' '}
            <LoclaDiv>아파트</LoclaDiv>
            <LocalEx>ex) 휴먼시아 아파트</LocalEx>
          </LocalWrap>
        </LocalContainer>
        <LocalContainer>
          <MdOutlineDirectionsSubwayFilled size={24} color="#0059F9" />
          <LocalWrap>
            <LoclaDiv>기차역</LoclaDiv>
            <LocalEx>ex) 문산역</LocalEx>
          </LocalWrap>
        </LocalContainer>
      </SearchExampleDiv>
    </SearchExampleContainer>
  );
}

const SearchExampleContainer = styled.div`
  width: 100%;
  height: 552px;
  /* border: 1px solid transparent; */
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
const SearchExampleTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 18px;
`;

const SearchExampleDiv = styled.div`
  /* text-align: left; */
`;
const LocalContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const LocalWrap = styled.div`
  margin-left: 7px;
`;

const LoclaDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #222222;
  font-size: 16px;
  margin-bottom: 4px;
`;
const LocalEx = styled.div`
  display: flex;
  flex-direction: row;
  color: #888888;
  font-size: 12px;
`;
export default SearchExample;
