import { css } from '@emotion/react';

export const GlobalStyles = css`
  * {
    @media (min-width: 1000px) {
      &::-webkit-scrollbar {
        width: 6px; /* 스크롤바의 너비 */
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #9faffd; /* 스크롤바의 색상 */

        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
      }
    }
  }
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
