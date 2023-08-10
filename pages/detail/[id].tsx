/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
import { S3DeleteFile, S3DeleteFiles } from '@utils/S3util';
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
  MdOutlineArrowForwardIos,
  MdOutlineFavorite,
  MdOutlineMailOutline,
} from 'react-icons/md';
import DebtIcon from 'public/icon/debt';
import ImageBox from '@components/ImageBox';
import CommonButton from '@components/Button';
import {
  DELETE_POST,
  FAVOR_TOGGLE,
  GET_DETAIL_POST,
  IS_LOGINED,
  GET_CLUSTER_DATA,
} from '@utils/apollo/gqls';
import {
  TitleString,
  formatDate,
  itemFloorString,
  itemMoveinString,
  itemParkingString,
  itemPriceString,
  itemRoomString,
  itemSpacem2,
  itemtransactionTypeString,
} from '@utils/postString';
import FixedMap from '@components/KakaoMap/fixedMap';

export interface LoginContentType {
  email: string;
  password: string;
}

interface CustomWindow extends Window {
  MSStream?: any;
}

const DetailPage = () => {
  const router = useRouter();
  const detailID = router.query.id;
  const [currentSlide, setCurrentSlide] = useState(1);
  const { likePostState, changeLikeState } = useStore(state => state);
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
    checkLogin().then(res => {
      if (res?.data?.checklogin?.status === 'owner') {
        Swal.fire({
          title: '정말 삭제하시겠습니까?',
          text: '삭제된 데이터는 복구되지 않습니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
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
            router.push('/main');
          }
        });
      } else {
        Swal.fire({
          title: '권한이 없습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    });
  };
  const [checkLogin, { data: isLogined, error: loginErr }] = useLazyQuery(
    IS_LOGINED,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache',
    },
  );
  const [isFavor, setIsFavor] = useState(false);
  const [favorMutate, { error: favorErr }] = useMutation(FAVOR_TOGGLE);
  const [isOwner, setIsOwner] = useState(false);

  const IsOwnerLogin = async () => {
    await checkLogin().then(res => {
      if (res?.data?.checklogin?.status === 'owner') {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    });
  };

  useEffect(() => {
    IsOwnerLogin();
  }, [isOwner]);

  const FavorToggle = () => {
    checkLogin().then(res => {
      if (res?.data?.checklogin?.checklogin === 'success') {
        if (!favorErr) {
          favorMutate({
            variables: { PostId: detailID },
          }).then(res => {
            if (res) {
              localStorage.setItem(
                'likeposts',
                JSON.stringify(res.data.likePost),
              );
              changeLikeState(res.data.likePost);
              setIsFavor(!isFavor);
            }
          });
        }
      }
      if (
        res?.data?.checklogin?.checklogin === 'failed' ||
        isLogined === undefined
      ) {
        Swal.fire({
          title: '로그인이 필요합니다.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    className: 'slides',
    beforeChange: (current: number, next: number) => setCurrentSlide(next + 1),
    nextArrow: <MdOutlineArrowForwardIos size={28} color="white" />,
    prevArrow: <MdArrowBackIos size={28} color="white" />,
  };

  const ShareClick = () => {
    const shareUrl = window && window.location.href;
    const shareData = {
      title: '123', // 공유될 제목
      text: 'qwe', // 공유될 설명
      url: shareUrl, // 공유될 URL
      files: [], // 공유할 파일 배열
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData);
    }
  };

  useEffect(() => {
    if (likePostState.includes(detailID as string)) {
      setIsFavor(true);
    } else {
      setIsFavor(false);
    }
  }, [likePostState]);
  const OptiobnString = DetailData?.post?.itemOption?.split('/');
  const SecurityString = DetailData?.post?.itemSecurity?.split(',');
  const itemMoreInfoString = DetailData?.post?.itemMoreInfo?.split('/');

  const sendSMS = (uniqueID: number) => {
    if (window) {
      const { userAgent } = window.navigator;
      const customWindow: CustomWindow = window;
      const isIOS =
        (/iPad|iPhone|iPod/.test(userAgent) && !customWindow?.MSStream) ||
        false;
      const isAndroid = /Android/.test(userAgent);
      const encodedPhoneNumber = encodeURIComponent('010-6788-7335');
      const encodedMessage = encodeURIComponent(
        `매물번호 ${uniqueID} 보고 연락드립니다.`,
      );

      if (isIOS) {
        const url = `sms:${encodedPhoneNumber}&body=${encodedMessage}`;
        window.location.href = url;
      }
      if (isAndroid) {
        const url = `sms:${encodedPhoneNumber}?body=${encodedMessage}`;
        window.location.href = url;
      }
    }
  };

  return (
    <Wrap>
      <TopbarBox>
        <MdArrowBackIos
          size={28}
          onClick={() => {
            router.back();
          }}
          color="white"
        />
        <div className="maintitle" />
        <div className="subtitle">
          <div>
            <MdOutlineFileUpload size={28} color="white" onClick={ShareClick} />
          </div>
          <div>
            {isFavor ? (
              <MdOutlineFavorite
                size={28}
                color="#FF9E00"
                onClick={FavorToggle}
              />
            ) : (
              <MdFavoriteBorder size={28} color="white" onClick={FavorToggle} />
            )}
          </div>
        </div>
      </TopbarBox>

      <Slider {...settings}>
        <ImageBox
          src={DetailData?.post.itemTitleimg}
          watermark={DetailData?.post.itemWaterMark}
          alt="title"
        />
        {DetailData?.post.itemDetailimg.map((pic: string, index: number) => {
          return (
            <React.Fragment key={pic}>
              <ImageBox src={pic} alt="titleImage" />
            </React.Fragment>
          );
        })}
      </Slider>
      <SlideNumber>
        {currentSlide}/{DetailData?.post.itemDetailimg.length + 1}
      </SlideNumber>
      {isOwner ? (
        <OwnerBox>
          <CommonButton
            onClick={() => {
              router.push(`/updatepage/${detailID}`);
            }}
          >
            수정
          </CommonButton>
          <CommonButton onClick={DeletePost}>삭제</CommonButton>
        </OwnerBox>
      ) : null}
      <PostTable1>
        <div className="uniqeNuberbar">
          <div className="uniqeNuber">
            등록번호 {DetailData?.post?.itemUniqueID}
          </div>
          <div className="postdate">
            {formatDate(DetailData?.post?.createdAt)}
          </div>
        </div>
        <div className="itemaddress">
          {' '}
          경기 {DetailData?.post?.region_2depth}{' '}
          {DetailData?.post?.region_3depth}
        </div>
        <div className="itemprice">
          {' '}
          {TitleString(DetailData?.post?.transactionType, DetailData?.post)}
        </div>
        <div className="itemmanage">
          {' '}
          관리비
          {DetailData?.post?.itemManagement ?? 0}만원
        </div>
        <div className="itemfavor">
          관심 매물 등록 {DetailData?.post?.itemFavorCount}회
        </div>
      </PostTable1>
      <PostTable2>
        <div className="detailinfo">상세정보</div>
        <div className="iteminfo">
          <MdAspectRatio size={24} />
          <p>{itemSpacem2(DetailData?.post?.itemType, DetailData?.post)}</p>
        </div>
        <div className="iteminfo">
          <MdOutlineSpaceDashboard size={24} />
          <p> {itemRoomString(DetailData?.post?.itemType, DetailData?.post)}</p>
        </div>
        <div className="iteminfo">
          <MdOutlineGarage size={24} />
          <p>
            {itemParkingString(DetailData?.post?.itemType, DetailData?.post)}
          </p>
        </div>
        <div className="iteminfo">
          {itemFloorString(DetailData?.post?.itemType, DetailData?.post)}
        </div>
        <div className="iteminfo">
          {itemMoveinString(DetailData?.post?.itemType, DetailData?.post)}
        </div>
        <div className="iteminfo">
          <DebtIcon />
          <p>
            융자 /{' '}
            {DetailData?.post?.itemLoan !== '' &&
            DetailData?.post?.itemLoan !== null
              ? `${DetailData?.post?.itemLoan}`
              : '(문의)'}
          </p>
        </div>
        <p
          className="moreinfo"
          onClick={() => {
            Swal.fire({
              title: '준비중입니다.',
              text: '더 많은 정보는 준비중입니다.',
              icon: 'info',
              confirmButtonText: '확인',
            });
          }}
        >
          <span>더보기</span>
          <MdOutlineArrowForwardIos size={18} />
        </p>
      </PostTable2>
      <PostTable3>
        <div className="detailinfo">가격정보</div>
        <div className="iteminfo">
          <div>
            {itemtransactionTypeString(
              DetailData?.post?.transactionType,
              DetailData?.post,
            )}
          </div>
          <div style={{ fontWeight: '400' }}>
            {itemPriceString(
              DetailData?.post?.transactionType,
              DetailData?.post,
            )}
          </div>
        </div>
        <div className="iteminfo">
          <div>관리비</div>
          <div className="itemmanage" style={{ fontWeight: '400' }}>
            <div style={{ border: '1px solid #f5f5f5', paddingBottom: '8px' }}>
              매월 {DetailData?.post?.itemManagement ?? 0}만원
              <br />
              <span>
                (
                {DetailData?.post?.itemManagementInfo !== '' &&
                DetailData?.post?.itemManagementInfo !== undefined &&
                DetailData?.post?.itemManagementInfo !== null
                  ? `${DetailData?.post?.itemManagementInfo} 포함`
                  : '문의'}
                )
              </span>
            </div>
            <div>
              별도 금액으로 부과되는 사용료
              <br />
              <span>
                {DetailData?.post?.itemManagementException !== ''
                  ? DetailData?.post?.itemManagementException
                  : '(문의)'}
              </span>
            </div>
          </div>
        </div>
        <div className="iteminfo">
          <div>주차</div>
          <div style={{ fontWeight: '400' }}>
            {DetailData?.post?.itemParking}
            (주차비{' '}
            {DetailData?.post?.itemParkingFee !== '' &&
            DetailData?.post?.itemParkingFee !== undefined &&
            DetailData?.post?.itemParkingFee !== null
              ? `${DetailData?.post?.itemParkingFee}원`
              : '문의'}
            )
          </div>
        </div>
      </PostTable3>
      <PostTable4>
        <div className="detailinfo">옵션</div>
        <div className="optionlist">
          {OptiobnString?.map((element: string, idx: number) => {
            return (
              <div className="optiondiv" key={idx}>
                {' '}
                {element}
              </div>
            );
          })}
        </div>
      </PostTable4>
      <PostTable4>
        <div className="detailinfo">
          보안/안전시설 {SecurityString?.length ?? 0}개
        </div>
        <div> {SecurityString}</div>
      </PostTable4>
      <PostTable3>
        <div className="detailinfo">위치 </div>
        <FixedMap positionprops={DetailData?.post?.itemGeoLocation} />
      </PostTable3>
      <PostTable5>
        <div className="detailinfo">상세설명 </div>
        <div className="moreinfolist">
          {itemMoreInfoString?.map((element: string, idx: number) => {
            return <div key={idx}>{element}</div>;
          })}
        </div>
      </PostTable5>
      <PostTable6>
        <div className="detailinfo">담당 공인중개사 </div>
        <div className="chargeinfo">
          <div>
            <span>담당</span> : {DetailData?.post?.itemCharge}
          </div>
          <div>
            <span>연락처</span> : 031-953-6300
          </div>
          <div>
            <span>부동산 중개 등록번호</span> : 41480-2023-00100
          </div>
          <div>
            <span>주소</span> : 경기도 파주시 문산읍 우계로 493
          </div>
        </div>
      </PostTable6>

      <FooterBox>
        <div className="buttonbox">
          <button
            type="button"
            className="snsButton"
            onClick={() => {
              sendSMS(DetailData?.post?.itemUniqueID);
            }}
          >
            <MdOutlineMailOutline size={28} />
          </button>
          <CommonButton>
            <a href="tel:0319536300">
              <span className="callherf">전화하기</span>
            </a>
          </CommonButton>
        </div>
      </FooterBox>
    </Wrap>
  );
};

export default DetailPage;
const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  overflow-x: hidden;
  overflow-y: auto;
  .slides {
    position: relative;
    .slick-prev,
    .slick-next {
      position: absolute;
      top: 50%;
    }
    .slick-prev {
      left: 5%;
      z-index: 10;
    }
    .slick-next {
      right: 5%;
      z-index: 10;
    }
  }
`;
const OwnerBox = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  gap: 10px;
  background: #ffffff;
  padding: 20px;
  margin: 8px auto;
  width: 100%;
  height: 50x;
  position: relative;
  border-radius: 10px;
  @media (min-width: 1000px) {
    width: 1000px;
  }
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
  right: 3vw;
  top: calc(170px + 10vh);
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
    @media (max-width: 430px) {
      font-size: 20px;
    }
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

  width: 100%;
  height: 440px;
  margin-bottom: 8px;
  position: relative;
  .detailinfo {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  .iteminfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    p {
      font-size: 16px;
      color: #222222;
    }
  }
  .moreinfo {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 18px;
    @media (max-width: 700px) {
      left: 300px;
      top: 360px;
    }
    @media (min-width: 700px) {
      right: 10vw;
      bottom: 50px;
    }
    font-weight: 400;
    font-size: 16px;

    letter-spacing: -0.02em;
    color: #0059f9;
    text-align: center;
  }
`;

const PostTable3 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;

  width: 100%;
  height: 340px;
  margin-bottom: 8px;
  position: relative;
  .detailinfo {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  .iteminfo {
    display: grid;
    grid-template-columns: 30% 70%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid #f5f5f5;
  }
  .itemmanage {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .moreinfolist {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const PostTable4 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;

  width: 100%;
  height: 130px;
  margin-bottom: 8px;
  position: relative;
  .detailinfo {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  .optionlist {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    height: 100%;
  }
  .optiondiv {
    display: flex;
    width: 300px;
    height: 100%;
  }
`;
const PostTable5 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;

  width: 100%;
  height: 270px;
  overflow-y: auto;
  margin-bottom: 8px;
  position: relative;
  .detailinfo {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  .moreinfolist {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
const PostTable6 = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  padding: 20px;

  width: 100%;
  height: 196px;
  overflow-y: auto;
  margin-bottom: 8px;
  position: relative;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  .detailinfo {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 20px;
  }
  .chargeinfo {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 102px;
  background: #f5f5f5;
  box-sizing: border-box;
  border: 1px solid #f5f5f5;

  z-index: 100;
  @media (min-width: 1000px) {
    width: 1000px;
    left: calc(50% - 500px);
    display: none;
  }
  .buttonbox {
    background: #f5f5f5;
    border: none;
    font-size: 14px;
    position: fixed;
    padding: 10px;
    bottom: 40px;
    left: 0;
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (min-width: 1000px) {
      width: 900px;
      left: calc(50% - 500px);
      padding-left: 50px;
    }
  }
  .snsButton {
    outline: none;
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    display: flex;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    background-color: ${({ theme }) => theme.mainColor.blue500};
  }
  .callherf {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`;
