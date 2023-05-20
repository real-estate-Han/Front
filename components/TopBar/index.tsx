import react from 'react';
import styled from '@emotion/styled';
import { MdArrowBackIos } from 'react-icons/md';
const TopBar = () => {
  return (
    <Wrap>
      <MdArrowBackIos size={28} />
      <div className="maintitle">매물 등록</div>
      <div className="subtitle"></div>
    </Wrap>
  );
};

export default TopBar;

const Wrap = styled.div`
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
  margin-bottom: 28px;
  .maintitle {
    color: #222222;
  }
  .subtitle {
    color: #666666;
  }
`;
