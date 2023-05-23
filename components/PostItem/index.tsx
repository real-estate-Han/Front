import React, { useEffect, useState } from 'react';
import { postType } from '@utils/type';
import styled from '@emotion/styled';
import Image from 'next/image';
import useStore from '@zustand/store';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useRouter } from 'next/router';

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
        <div className="itemType">월세 4000</div>
        <div className="itemDetail">원룸</div>
        <div className="itemDetail">2층, 33.05m2, 관리비 없음</div>
        <div className="itemExtra">깨끗하고 조용해서 생활하기 편리</div>
      </div>
    </Wrapper>
  );
};
export default PostItems;

const Wrapper = styled.div<{ widthPercent: number; wide: boolean | undefined }>`
  display: flex;
  flex-direction: ${({ wide }) => (wide ? 'row' : 'column')};
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: ${({ wide }) => (wide ? '350px' : '167px')};
  height: ${({ wide }) => (wide ? '211px' : '311px')};
  background: #ffffff;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-style: normal;
  letter-spacing: -0.02em;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 5px;
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
  .detailbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: ${({ wide }) => (wide ? '6px' : '8px')};
  }
`;
