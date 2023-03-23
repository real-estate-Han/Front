import React from "react";
import { postType } from "@utils/type";
import styled from "@emotion/styled";
import Image from "next/image";
interface PostItemProps {
  postData: postType;
}
const PostItem = ({ postData }: PostItemProps) => {
  return (
    <Wrapper>
      <Image
        src={postData?.itemTitleimg}
        alt="titleImage"
        width={200}
        height={120}
        // placeholder="blur"
      ></Image>
      <div>{postData.itemAddress}</div>
    </Wrapper>
  );
};
export default PostItem;

const Wrapper = styled.div`
  float: left;
  display: flex;
  width: 50%;

  max-height: 120px;
  height: 100%;
  background-color: aqua;
`;
