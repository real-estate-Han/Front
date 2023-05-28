import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  MdArrowBackIos,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md';

const AskedPage = () => {
  const router = useRouter();
  // 뒤로가기 버튼
  const onClickBackBtn = () => {
    router.back();
  };
  // dropdownmenu
  const wholeTextArray = [
    '주택',
    '원룸',
    '투_쓰리룸',
    '아파트',
    '오피스텔',
    '상가',
    '토지',
    '공장_창고',
  ];

  // 문의 제목 토글
  const [AskTilteToggle, setAskTilteToggle] = useState<boolean>(false);
  const onClickTitleToggle = () => {
    setAskTilteToggle(!AskTilteToggle);
  };
  return (
    <>
      <AskContainer>
        <AskHeader>
          <BackBtn onClick={onClickBackBtn}>
            {' '}
            <MdArrowBackIos size={28} color="black" />
          </BackBtn>
          <AskHeadTitle>문의 하기</AskHeadTitle>
        </AskHeader>
        <AskTitle>
          한세일 부동산에 문의합니다. <br />
          담당자가 문의 확인 후 연락드립니다.
        </AskTitle>
        <Phone>
          <PhoneNumber>휴대폰 번호</PhoneNumber>
          <PhoneNumberBox>
            <PhoneNumberInner type="tel" placeholder="010 1234 1234" />
            <PhoneNumberButton>연락처 변경</PhoneNumberButton>
          </PhoneNumberBox>
          <SafeNumber>연락처는 050 안심번호로 전달됩니다.</SafeNumber>
        </Phone>
        <AskContentWrap>
          <AskContentDiv>문의내용</AskContentDiv>
          <AskTitleToggleWrap>
            <AskTilteSelect onClick={onClickTitleToggle}>
              문의 종류 선택
              {AskTilteToggle ? (
                <MdKeyboardArrowDown size={28} className="TitleButton" />
              ) : (
                <MdKeyboardArrowUp size={28} className="TitleButton" />
              )}
            </AskTilteSelect>
          </AskTitleToggleWrap>
          <AskContentSelect placeholder="문의 내용 작성" />
        </AskContentWrap>
        <AskButton>문의 하기</AskButton>
      </AskContainer>
    </>
  );
};
export default AskedPage;

const AskContainer = styled.div`
  margin-left: 20px;
`;
const AskHeader = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 63px;
  margin-bottom: 16x;
`;
const BackBtn = styled.div``;
const AskHeadTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const AskTitle = styled.section`
  margin-top: 53px;
  font-size: 20px;
`;
const Phone = styled.section`
  margin-top: 53px;
`;
const PhoneNumber = styled.div`
  margin-top: 28px;
  align-items: center;
  font-size: 14px;
`;
const PhoneNumberBox = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
`;
const PhoneNumberInner = styled.input`
  margin-top: 9px;
  width: 238px;
  height: 44px;
  color: black;
  outline: none;
  &::placeholder {
    text-align: center;
    color: rgba(0, 0, 0, 0.38);
  }
`;
const PhoneNumberButton = styled.button`
  margin-top: 9px;
  margin-left: 11px;
  width: 98px;
  height: 50px;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.54);
  border-radius: 2px;
`;
const SafeNumber = styled.div`
  margin-top: 14px;
  color: rgba(0, 0, 0, 0.38);
  font-size: 14px;
`;
const AskContentWrap = styled.section`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;
const AskContentDiv = styled.div`
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.38);
`;
const AskTitleToggleWrap = styled.div``;
const AskTilteSelect = styled.button`
  margin-top: 11px;
  color: rgba(0, 0, 0, 0.38);
  width: 355px;
  height: 42px;
  outline: none;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.54);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  .TitleButton {
    color: rgba(0, 0, 0, 0.38);
  }
`;

const AskContentSelect = styled.textarea`
  margin-top: 9px;
  color: black;
  width: 350px;
  height: 179px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.54);
  border-radius: 2px;

  &::placeholder {
    text-align: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.38);
  }
`;
const AskButton = styled.button`
  margin-top: 30px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.87);
  color: white;
  font-size: 14px;
  width: 350px;
  height: 56px;
`;
