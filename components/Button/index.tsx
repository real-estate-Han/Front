import styled from '@emotion/styled';

const CommonButton = styled.button`
  width: 80vw;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Pretendard';
  font-style: normal;

  border-radius: 4px;
  color: white;
  background-color: ${({ theme }) => theme.mainColor.blue500};
  border: none;
  margin: 15px 0;
  padding: 12.5px 0;
`;
export default CommonButton;
