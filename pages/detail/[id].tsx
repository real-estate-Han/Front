/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  DELETE_POST,
  FAVOR_TOGGLE,
  GET_DETAIL_POST,
  IS_LOGINED,
} from '@utils/apollo/gqls';
import Swal from 'sweetalert2';
import useStore from '@zustand/store';
import { S3DeleteFile, S3DeleteFiles } from '@utils/S3util';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
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
} from 'react-icons/md';
import DebtIcon from 'public/icon/debt';
import HomeIcon from 'public/icon/homeicon';
import ImageBox from '@components/ImageBox';

export interface LoginContentType {
  email: string;
  password: string;
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
          router.push('/main');
        }
      });
    } else {
      Swal.fire(mutateErr.message, '', 'error');
    }
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
  useEffect(() => {
    checkLogin();
  }, []);

  const FavorToggle = () => {
    checkLogin().then(res => {
      console.log(res);
      if (res.data.checklogin.checklogin === 'success') {
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
        res.data.checklogin.checklogin === 'failed' ||
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

  const handleClick = () => {
    const shareUrl = window && window.location.href;
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: shareUrl,
      });
    } else {
      alert(`Share this link: ${shareUrl}`);
    }
  };

  const openDetail = (id: string) => {
    router.push(`/detail/${id}`);
  };
  useEffect(() => {
    if (likePostState.includes(detailID as string)) {
      setIsFavor(true);
    } else {
      setIsFavor(false);
    }
  }, [likePostState]);

  return (
    <Wrap className="DetailContent">
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
            <MdOutlineFileUpload
              size={28}
              color="white"
              onClick={handleClick}
            />
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
            <React.Fragment key={index}>
              <ImageBox src={pic} alt="titleImage" />
            </React.Fragment>
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
        <div className="detailinfo">상세정보</div>
        <div className="iteminfo">
          <MdAspectRatio size={24} />
          <p>연 146.05m2 / 대지 244m2</p>
        </div>
        <div className="iteminfo">
          <MdOutlineSpaceDashboard size={24} />
          <p> 쓰리룸 / 화장실 2개</p>
        </div>
        <div className="iteminfo">
          <MdOutlineGarage size={24} />
          <p>세대당 3대 주차가능</p>
        </div>
        <div className="iteminfo">
          <MdOutlineCalendarToday size={24} />
          <p>1 ~ 3층 / 3층</p>
        </div>
        <div className="iteminfo">
          <HomeIcon />
          <p> 즉시 입주 가능</p>
        </div>
        <div className="iteminfo">
          <DebtIcon />
          <p>융자 / 무</p>
        </div>
        <p className="moreinfo">
          <span>더보기</span>
          <MdOutlineArrowForwardIos size={18} />
        </p>
      </PostTable2>
      <PostTable3>
        <div className="detailinfo">가격정보</div>
        <div className="iteminfo">
          <div>매매</div>
          <div style={{ fontWeight: '400' }}> 3억 9000만원</div>
        </div>
        <div className="iteminfo">
          <div>관리비</div>
          <div className="itemmanage" style={{ fontWeight: '400' }}>
            <div style={{ border: '1px solid #f5f5f5', paddingBottom: '8px' }}>
              매월 3만원
              <br />
              <span>(청소비 포함)</span>
            </div>
            <div>
              별도 금액으로 부과되는 사용료
              <br />
              <span>난방비, 전기료, 수도료, 가스사용료</span>
            </div>
          </div>
        </div>
        <div className="iteminfo">
          <div>주차</div>
          <div style={{ fontWeight: '400' }}> 가능 (무료)</div>
        </div>
      </PostTable3>
    </Wrap>
  );
};

export default DetailPage;
const Wrap = styled.div`
  box-sizing: border-box;
  width: 100vw;
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
`;
