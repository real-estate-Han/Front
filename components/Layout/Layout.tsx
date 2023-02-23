import { Input } from '@components/Input';
import { Logo } from '@components/Logo';
import styled from '@emotion/styled';
import Link from 'next/link';

type childeren = { children: React.ReactNode };

export const Layout = ({ children }: childeren) => {
  return (
    <Wrapper>
      <Header>
        <StyledLogo size={2}>한세일부동산</StyledLogo>
        <div className="loginButton">
          <button>로그인</button>
          <button>메뉴</button>
        </div>
      </Header>

      <Content>{children}</Content>
      <Footer>© {new Date().getFullYear()} NickOvchinnikov. All rights reserved.</Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 0.1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};

  /* @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (min-width: 960px) {
    grid-template-columns: 1fr 4fr 2fr;
    grid-template-areas:
      'header  header  search'
      'content content content'
      'footer  footer  footer';
  } */
`;
export const Content = styled.main`
  grid-area: content;
  min-height: 84vh;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.font.regular};
`;

export const StyledLogo = styled(Logo)`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.components.primary};
  border: 1px solid ${({ theme }) => theme.font.regular};
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.components.primary};
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5vmin;
  width: 100%;
  align-items: center;
  & .loginButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5vmin;
    margin-right: 5vmin;
  }
`;

export const SearchInput = styled(Input)`
  width: 100%;
  height: 10vmin;
`;

export const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
`;