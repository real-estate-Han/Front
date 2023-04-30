import React from 'react';
import { postType } from '@utils/type';
import styled from '@emotion/styled';
import Image from 'next/image';
import { boxShadow } from '@components/stylesUtil';

interface PostItemProps {
  postData: postType;
  widthPercent: number;
}
function PostItem({ postData, widthPercent }: PostItemProps) {
  console.log(postData);
  return (
    <Wrapper widthPercent={widthPercent}>
      <div className="titmeImg">
        <Image
          priority
          src={postData?.itemTitleimg}
          style={{ borderRadius: '4px' }}
          alt="titleImage"
          width={170}
          height={200}
        />
        <div className="likeButton">
          <Image priority src="/icon/favor.svg" width={28} height={28} alt="favor" />
        </div>
      </div>
      <div className="itemType">월세 4000</div>
      <div className="itemDetail">원룸</div>
      <div className="itemDetail">2층, 33.05m2, 관리비 없음</div>
      <div className="itemExtra">깨끗하고 조용해서 생활하기 편리</div>
    </Wrapper>
  );
}
export default PostItem;

const Wrapper = styled.div<{ widthPercent: number }>`
  /* float: left; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 167px;
  height: 281px;
  background: #ffffff;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-style: normal;
  letter-spacing: -0.02em;
  .titmeImg {
    position: relative;
    .likeButton {
      position: absolute;
      width: 28px;
      height: 28px;
      right: 10px;
      top: 10px;
    }
  }
  .itemType {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
  .itemDetail {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.02em;
    color: #444444;
  }
  .itemExtra {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.02em;
    color: #888888;
    /* overflow: hidden; */
  }
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1.2vmin;
  .ItemPrice {
    display: flex;
  }
`;
{
  /* <PostInfo>
        <p>매물번호{postData.itemUniqueID}</p>
        <div className="ItemPrice">
          {postData.itemDeposit && (
            <p>
              <span>보</span>
              {postData.itemDeposit}
            </p>
          )}
          {postData.itemMonthly && (
            <p>
              <span>월</span>
              {postData.itemMonthly}
            </p>
          )}
          {postData.itemJense && (
            <p>
              <span>전</span>
              {postData.itemJense}
            </p>
          )}
          {postData.itemSale && (
            <p>
              <span>매</span>
              {postData.itemSale}
            </p>
          )}
        </div>
        {postData.itemAddress}
      </PostInfo> */
}
