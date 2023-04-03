import { Logo } from '@components/Logo';
import Modal from '@components/Modal';
import styled from '@emotion/styled';
import LoginContent from '@components/Modal/LoginContent';
import useStore from '@zustand/store';
import SignupContent from '@components/Modal/SignupContent';
import DetailContent from '@components/Modal/DetailContent';

import { useRouter } from 'next/router';

const FooterContent = () => {
  const { loginState, signupState, detailState, changeDetailState, changeSignUpState, changeLoginState } = useStore(
    state => state,
  );
  const param = useRouter();

  return (
    <Wrapper>
      <div>회사소개 | 의뢰하기 | 이용약관 | 개인정보처리방침</div>
      <div>
        <p>한세일 부동산</p>
        <p>상호 : 한세일 부동산|대표자 : 한세일 | 주소 : 경기도 파주시 문산읍</p>
        <p>사업자등록번호 : 000 | 부동산등록번호 : 1111</p>
        <p>전화 : 031-954-1111 | 팩스 : 031-954-1110 | 이메일 : sale@naver.com</p>
      </div>
      <div>대표전화 call center 031-954-1111</div>
    </Wrapper>
  );
};

export default FooterContent;

const Wrapper = styled.div``;
