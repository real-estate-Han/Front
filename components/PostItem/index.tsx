import React, { useEffect, useState } from 'react';
import { postType } from '@utils/type';
import styled from '@emotion/styled';
import Image from 'next/image';
import useStore from '@zustand/store';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useRouter } from 'next/router';
import { TitleString, itemSpace, itemTypeString } from '@utils/postString';

interface PostItemProps {
  postData: postType;
  widthPercent: number;
  wide?: boolean;
}
const PostItems = ({ postData, widthPercent, wide }: PostItemProps) => {
  const router = useRouter();
  const { likePostState } = useStore(state => state);
  const [isFavor, setIsFavor] = useState(false);
  const openDetail = (id: string) => {
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    if (likePostState.includes(postData._id!)) {
      setIsFavor(true);
    } else {
      setIsFavor(false);
    }
  }, [likePostState]);

  return (
    <Wrapper
      widthPercent={widthPercent}
      wide={wide}
      onClick={openDetail.bind(null, postData?._id as string)}
    >
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
          {isFavor ? (
            <MdOutlineFavorite size={28} color="#FF9E00" />
          ) : (
            <MdFavoriteBorder size={28} color="white" />
          )}
        </div>
      </div>
      <div className="detailbox">
        <div className="itemType">
          {TitleString(postData?.transactionType, postData)}
        </div>
        <div className="itemDetail">
          {itemTypeString(postData?.itemType, postData)}
        </div>
        <div className="itemDetail">
          {postData?.itemFloor
            ? `${postData?.itemFloor}층`
            : `${postData?.itemLandNumber}필지`}
          , {itemSpace(postData?.itemType, postData)}, 관리비{' '}
          {postData?.itemManagement ?? 0}만원
        </div>
        <div className="itemExtra">{postData?.itemOption}</div>
      </div>
    </Wrapper>
  );
};
export default PostItems;

const Wrapper = styled.div<{ widthPercent: number; wide: boolean | undefined }>`
  display: flex;
  flex-direction: ${({ wide }) => (wide ? 'row' : 'column')};
  width: ${({ wide }) => (wide ? '350px' : '167px')};
  height: ${({ wide }) => (wide ? '211px' : '331px')};
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  background: #ffffff;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-style: normal;
  letter-spacing: -0.02em;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 403px) {
    flex-direction: row;
    width: 400px;
    height: 211px;
  }
  @media (min-width: 404px) {
  }
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
  }
  .detailbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: ${({ wide }) => (wide ? '6px' : '8px')};
  }
`;
