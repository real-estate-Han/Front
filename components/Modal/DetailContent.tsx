import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Inputs } from '@components/Inputs';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DELETE_POST, GET_DETAIL_POST, GET_USER } from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
import Image from 'next/image';
import { S3DeleteFile, S3DeleteFiles } from '@utils/S3util';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { css } from '@emotion/react';
import TopBar from '@components/TopBar';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  MdArrowBackIos,
  MdFavoriteBorder,
  MdOutlineFileUpload,
  MdAspectRatio,
  MdOutlineSpaceDashboard,
  MdOutlineGarage,
  MdOutlineCalendarToday,
} from 'react-icons/md';
import DebtIcon from 'public/icon/debt';
import HomeIcon from 'public/icon/homeicon';
export interface LoginContentType {
  email: string;
  password: string;
}

const DetailContent = () => {
  const { detailID, detailType, changeDetailState } = useStore(state => state);
  const itemDetailsellType = detailType && detailType.split('/')[0]; //transactionType
  const itemDetailType = detailType && detailType.split('/')[1]; //itemType
  const [currentSlide, setCurrentSlide] = useState(1);
  const {
    data: DetailData,
    loading,
    error,
  } = useQuery(GET_DETAIL_POST, {
    variables: {
      postId: detailID,
    },
    fetchPolicy: 'network-only',
  });

  const [deleteMutate, { error: mutateErr }] = useMutation(DELETE_POST);
  const DeletePost = () => {
    // console.log(mutateErr);
    if (!mutateErr) {
      Swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제된 데이터는 복구되지 않습니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then(async result => {
        if (result.isConfirmed) {
          await deleteMutate({
            variables: { deletePostId: detailID },
            refetchQueries: [{ query: GET_CLUSTER_DATA }],
          }).then(async () => {
            await S3DeleteFile(DetailData.post.itemTitleimg);
            await S3DeleteFiles(DetailData.post.itemDetailimg);
          });
          Swal.fire('삭제되었습니다.', '', 'success');
          changeDetailState();
        }
      });
    } else {
      Swal.fire(mutateErr.message, '', 'error');
    }
  };
  const settings = {
    infinite: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next + 1),
  };

  const shareUrl = window.location.href;

  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: shareUrl,
      });
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  return (
    <Wrap className="DetailContent">
      <TopbarBox>
        <MdArrowBackIos size={28} onClick={changeDetailState} color="white" />
        <div className="maintitle"></div>
        <div className="subtitle">
          <div>
            <MdOutlineFileUpload size={28} color="white" onClick={handleClick} />
          </div>
          <div>
            <MdFavoriteBorder size={28} color="white" />
          </div>
        </div>
      </TopbarBox>

      {/* <button onClick={DeletePost}>삭제하기</button> */}
      <Slider {...settings}>
        <ImageBox>
          <Image
            src={DetailData?.post.itemTitleimg || './next.svg'}
            alt="titleImage"
            // style={{ objectFit: 'contain' }}
            fill
          ></Image>
        </ImageBox>
        {DetailData?.post.itemDetailimg.map((pic: string, index: number) => {
          return (
            <ImageBox>
              <Image key={index} src={pic || './next.svg'} alt="titleImage" fill />
            </ImageBox>
          );
        })}
      </Slider>
      <SlideNumber>
        {currentSlide}/{DetailData?.post.itemDetailimg.length + 1}
      </SlideNumber>
      <PostTable1>
        <div className="uniqeNuberbar">
          <div className="uniqeNuber">등록번호 12345678</div>
          <div className="postdate">2023.03.28</div>
        </div>
        <div className="itemaddress"> 경기 파주시 파평면 율곡리</div>
        <div className="itemprice"> 매매 3억 3천</div>
        <div className="itemmanage"> 관리비 10만원</div>
        <div className="itemfavor">관심 매물 등록 5회</div>
      </PostTable1>
      <PostTable2>
        <div className="itemtitle">상세정보</div>
        <></>
      </PostTable2>
      <PostTable>
        <tbody>
          <tr>
            <th>매물번호</th>
            <td>{DetailData?.post.itemUniqueID}</td>
          </tr>
          <tr>
            <th>매물 주소</th>
            <td>{DetailData?.post.itemAddress}</td>
          </tr>
        </tbody>
      </PostTable>
      <PostTable>
        <tbody>
          {itemDetailsellType == 'jense' && (
            <>
              <th>전세</th>
              <td>{DetailData?.post.itemJense}</td>
            </>
          )}
          {itemDetailsellType == 'sale' && (
            <>
              <th>매매가</th>
              <td>{DetailData?.post.itemSale}</td>
            </>
          )}
          <tr>
            {itemDetailsellType == 'monthly' && (
              <>
                <th>월세</th>
                <td>{DetailData?.post.itemMonthly}</td>
                <th>보증금</th>
                <td>{DetailData?.post.itemDeposit}</td>
              </>
            )}
          </tr>
          {itemDetailType !== 'land' && (
            <>
              <tr>
                <th>관리비</th>
                <td>{DetailData?.post.itemManagement}</td>
                <th>층수</th>
                <td>{DetailData?.post.itemFloor}</td>
              </tr>
            </>
          )}
          {(itemDetailType === 'House' || itemDetailType === 'Mart') && (
            <>
              <tr>
                <th>공급면적</th>
                <td>{DetailData?.post.itemManagement}</td>
                <th>전용면적</th>
                <td>{DetailData?.post.itemFloor}</td>
              </tr>
              <tr>
                <th>엘리베이터</th>
                <td>{DetailData?.post.itemElevator}</td>
                <th>난방방식</th>
                <td>{DetailData?.post.itemHeating}</td>
              </tr>
              <tr>
                <th>주차</th>
                <td>{DetailData?.post.itemParking}</td>
                <th>발코니/배란다</th>
                <td>{DetailData?.post.itemBalcony}</td>
              </tr>
              <tr>
                <th>방향</th>
                <td>{DetailData?.post.itemDirection}</td>
                <th>입주가능날짜</th>
                <td>{DetailData?.post.itemMovein}</td>
              </tr>
            </>
          )}
          {(itemDetailType === 'Factory' || itemDetailType === 'Mart') && (
            <>
              <tr>
                <th>대지면적</th>
                <td>{DetailData?.post.itemAreaLand}</td>
                <th>건축면적</th>
                <td>{DetailData?.post.itemAreaBuilding}</td>
              </tr>
              <tr>
                <th>건물층고</th>
                <td>{DetailData?.post.itemFloorHeight}</td>
                <th>화물차량 진입</th>
                <td>{DetailData?.post.itemTruck}</td>
              </tr>
            </>
          )}
          <tr>
            <th>사용 용도</th>
            <td>{DetailData?.post.itemPurpose}</td>
            <th>사용 승인일</th>
            <td>{DetailData?.post.itemApproval}</td>
          </tr>
          {itemDetailType === 'Land' && (
            <>
              <tr>
                <th>토지합계면적</th>
                <td>{DetailData?.post.itemAreaTotal}</td>
                <th>지목</th>
                <td>{DetailData?.post.itemLandType}</td>
                <th>필지수</th>
                <td>{DetailData?.post.itemLandNumber}</td>
              </tr>
            </>
          )}
        </tbody>
      </PostTable>
      <PostTable>
        <tbody>
          <tr>
            <th>가까운 지하철</th>
            <td>{DetailData?.post.itemSubway}</td>
          </tr>
          <tr>
            <th>옵션/추가설명</th>
            <td>{DetailData?.post.itemOption}</td>
          </tr>
        </tbody>
      </PostTable>
    </Wrap>
  );
};

export default DetailContent;
const Wrap = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  overflow-x: hidden;
  overflow-y: auto;
`;
const PostTable = styled.table`
  width: 100%;

  border-collapse: collapse;
  empty-cells: show;
  border-spacing: 0;
  border: 1px solid #e9ecef;

  tbody {
    border: 1px solid #e9ecef;
    th {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #e9ecef;
      border-bottom: 1px solid #e9ecef;
      border-right: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      background-color: #f8f9fa;
      text-align: center;
    }
    td {
      padding: 0.75rem;
      /* vertical-align: top; */
      border-top: 1px solid #e9ecef;
      border-bottom: 1px solid #e9ecef;
      border-right: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      text-align: center;
    }
  }
`;

const ImageBox = styled.div`
  width: 100%;
  height: 40vh;
  max-height: 300px;

  position: relative;
  /* @media (min-width: 400px) {
    max-height: 200px;
  }
  @media (min-width: 600px) {
    height: 50vh;
    max-height: 400px;
  }
  @media (min-width: 900px) {
    height: 70vh;
    max-height: 500px;
  } */
`;
const TopbarBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin-top: 43px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  /* border-bottom: 1px solid #f5f5f5; */
  /* margin-bottom: 28px; */
  .maintitle {
    color: #222222;
  }
  .subtitle {
    color: #666666;
    gap: 4px;
    display: flex;
  }
`;
const SlideNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;

  position: absolute;
  width: 40px;
  height: 22px;
  left: 330px;
  top: 258px;
  color: white;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.02em;

  background: rgba(0, 0, 0, 0.54);
  border-radius: 11px;
`;

const PostTable1 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;
  gap: 8px;
  width: 100%;
  height: 181px;
  margin-bottom: 8px;
  .uniqeNuberbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 24px;
  }
  .uniqeNuber {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 5px 12px;

    color: #ffffff;
    width: 124px;
    height: 24px;
    font-size: 12px;

    background: #222222;
    border-radius: 12px;
  }
  .postdate {
    font-size: 14px;
    color: #888888;
  }
  .itemfavor {
    font-weight: 400;
    font-size: 12px;
    color: #0059f9;
  }
  .itemmanage {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  .itemprice {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
  }
  .itemaddress {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
  }
`;

const PostTable2 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;
  gap: 20px;
  width: 100%;
  height: 440px;
  margin-bottom: 8px;
`;
