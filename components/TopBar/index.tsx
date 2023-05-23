import styled from '@emotion/styled';
import { MdArrowBackIos } from 'react-icons/md';

interface Props {
  mainTitle: string;
  ArrowFn: () => void;
}
const TopBar = ({ mainTitle, ArrowFn }: Props) => {
  return (
    <TopbarBox>
      <MdArrowBackIos size={28} onClick={ArrowFn} />
      <div className="maintitle">{mainTitle}</div>
    </TopbarBox>
  );
};

export default TopBar;

const TopbarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 45px;
  margin-top: 43px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 40px;
  border-bottom: 1px solid #f5f5f5;
  /* margin-bottom: 28px; */
  .maintitle {
    color: #222222;
  }
  .subtitle {
    color: #666666;
  }
`;
