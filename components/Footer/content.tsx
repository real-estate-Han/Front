import styled from '@emotion/styled';

const FooterContent = () => {
  return (
    <Wrapper>
      <div>회사소개 | 의뢰하기 | 이용약관 | 개인정보처리방침</div>
      <div>
        <p>한세일 부동산</p>
        <p>
          상호 : 한세일 부동산|대표자 : 한세일 | 주소 : 경기도 파주시 문산읍
        </p>
        <p> 부동산중개등록번호 : 41480-2023-00100</p>
        <p>
          전화 : 031-954-6300 | 팩스 : 031-954-1110 | 이메일 : sale@naver.com
        </p>
      </div>
      <div>대표전화 call center 031-954-1110</div>
    </Wrapper>
  );
};

export default FooterContent;

const Wrapper = styled.div`
  @media (max-width: 1000px) {
    visibility: hidden;
    display: none;
  }
  @media (min-width: 1000px) {
    padding-top: 10px;
  }
`;
