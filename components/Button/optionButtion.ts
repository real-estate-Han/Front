import styled from '@emotion/styled';

const OptionButton = styled.button<{
  selected: string | number | undefined;
  value: string | number | undefined;
}>`
  box-sizing: border-box;
  border: 0.4px solid #666666;
  border-radius: 4px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 8px 8px;
  font-size: 14px;
  background-color: ${props =>
    props.selected === props.value
      ? props.theme.mainColor.blue500
      : 'transparent'};
  color: ${props => (props.selected === props.value ? 'white' : '#666666')};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;

  line-height: 17px;
  letter-spacing: -0.02em;
  @media (max-width: 420px) {
    font-size: 12px;
  }
`;

export default OptionButton;
