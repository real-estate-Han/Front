import styled from '@emotion/styled';

const CommonButton = styled.button<{ whiteButton?: boolean | undefined }>`
  width: 80%;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard';
  font-style: normal;
  display: block;
  border-radius: 4px;
  border: ${({ whiteButton }) => (whiteButton ? '1px solid #D9D9D9;' : 'none')};
  color: ${({ whiteButton }) => (whiteButton ? 'black' : 'white')};
  background-color: ${({ theme, whiteButton }) =>
    whiteButton ? 'white' : theme.mainColor.blue500};
  margin: 15px auto;
  padding: 12.5px 0;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, whiteButton }) =>
      whiteButton ? 'gray' : theme.mainColor.blue700};
  }
`;
export default CommonButton;
