import styled from '@emotion/styled';

const SelectedButton = styled.button<{
  selected: string | number | boolean;
  value: string | number | boolean;
}>`
  border-radius: 15px;
  border: none;
  margin: 10px 5px 0 5px;
  padding: 6px 16px;
  font-size: 18px;
  background-color: ${props =>
    props.selected === props.value ? props.theme.mainColor.blue500 : '#F5F5F5'};
  color: ${props => (props.selected === props.value ? 'white' : 'black')};
`;

export default SelectedButton;
