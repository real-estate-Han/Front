import styled from '@emotion/styled';

const CommonButton = styled.button`
  width: 80%;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard';
  font-style: normal;
  display: block;
  border-radius: 4px;
  color: white;
  background-color: ${({ theme }) => theme.mainColor.blue500};
  border: none;
  margin: 15px auto;
  padding: 12.5px 0;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.mainColor.blue700};
  }
`;
export default CommonButton;
