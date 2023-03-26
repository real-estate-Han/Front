import React from "react";
import { postType } from "@utils/type";
import styled from "@emotion/styled";
import Image from "next/image";
interface PostItemProps {
  postData: postType;
  widthPercent: number;
}
const PostItem = ({ postData, widthPercent }: PostItemProps) => {
  return (
    <Wrapper widthPercent={widthPercent}>
      <>
        <Image
          src={
            postData?.itemTitleimg ||
            "https://real-estate-han.s3.ap-northeast-2.amazonaws.com/dog.png"
          }
          alt="titleImage"
          width={120}
          height={120}
        ></Image>
      </>
      <PostInfo>
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
      </PostInfo>
    </Wrapper>
  );
};
export default PostItem;

const Wrapper = styled.div<{ widthPercent: number }>`
  float: left;
  display: flex;
  width: ${props => props.widthPercent + "%"};
  min-width: 180px;
  max-height: 120px;
  height: 100%;
  background-color: antiquewhite;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
