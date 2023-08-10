/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowForwardIos } from 'react-icons/md';
import { useQuery } from '@apollo/client';
import { MdOutlineSearch } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useInView } from 'react-intersection-observer';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import useStoreFilter, {
  filterInitialData,
  selectedDataFn,
} from '@zustand/filter';
import { postType } from '@utils/type';
import PostItems from '@components/PostItem';
import useStore from '@zustand/store';
import StaticMap from '@components/KakaoMap/staticMap';

const PCviewContent = () => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  const postData = clusterData?.allpost?.posts;
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    filtercondition,
    setFilterCondition,
    filterdData,
    setFilterdData,
    setSelectedData,
    setIsFiltered,
    isFiltered,
  } = useStoreFilter(state => state);

  useEffect(() => {
    setFilterdData(clusterData?.allpost?.posts);
  }, [clusterData]);

  const prefilter = async (type: string) => {
    await setFilterCondition('type', type);
    return type;
  };

  const filterButton = () => {
    const selected = selectedDataFn(postData, filtercondition);
    setSelectedData(selected);
    setIsFiltered(true);
    router.push('/main');
  };

  useEffect(() => {
    if (router.asPath === '/') {
      setIsFiltered(false);
    }
    if (filtercondition.type !== 'none' && !isFiltered) {
      filterButton();
    }
  }, [filtercondition]);

  // intersection observer
  const [ref, inView] = useInView({
    threshold: 1,
  });
  const [postitem, setPostitem] = useState<postType[]>([]);
  const [postCount, setpostCount] = useState<number>(0);
  const [popularItem, setPopularItem] = useState<postType[]>([]);
  const totalCount = clusterData?.allpost?.posts?.length;

  const scrollEvent = () => {
    let predata = clusterData?.allpost?.posts;

    let currentdata = [...predata].slice(postCount, postCount + 5);
    setPostitem([...postitem, ...currentdata]);
  };
  useEffect(() => {
    if (clusterData?.allpost?.posts) {
      const popular = clusterData?.allpost?.posts;
      const newpopular = [...popular]
        .sort((a, b) => b.itemFavorCount - a.itemFavorCount)
        .slice(0, 5);

      setPopularItem(newpopular);
    }
  }, []);
  useEffect(() => {
    if (postCount === 0) {
      setPostitem(clusterData?.allpost?.posts?.slice(0, 5));
      setpostCount(postCount + 5);
    }
    if (inView && postCount <= totalCount) {
      scrollEvent();
      setpostCount(postCount + 5);
    }
  }, [inView]);

  const { changeLoginState } = useStore(state => state);
  const [isLogined, setIsLogined] = useState<string>('');
  const checkLogin = () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      setIsLogined('success');
    } else {
      setIsLogined('fail');
    }
  };
  useEffect(() => {
    checkLogin();
    console.log(isLogined);
  }, [isLogined]);

  const { clearState } = useStore(state => state);

  const LogoutButton = () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('likeposts');
        localStorage.removeItem('mycontents');
        localStorage.removeItem('userstatus');
        Swal.fire({
          title: '로그아웃 되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      }
      clearState();
    });
  };

  return (
    <Wrap>
      <TopBanner>
        <span className="titleLogo">한세일 부동산</span>

        {isLogined === 'success' ? (
          <span className="loginspan" onClick={LogoutButton}>
            로그아웃
          </span>
        ) : (
          <span className="loginspan" onClick={changeLoginState}>
            로그인
          </span>
        )}
      </TopBanner>
      <TopBox>
        <BrandingBox>
          <div>
            고객 신뢰를 최우선시 하는
            <br />
            전문가가 당신을 도와드립니다.
          </div>
          <div className="rightarrow">
            <MdArrowForwardIos size={20} />
          </div>
        </BrandingBox>
      </TopBox>
      <MapBOx>
        <StaticMap />
        <ItemList>
          <ItemTabBar>
            <div>전체매물 {clusterData?.allpost?.totalPosts}</div>
            <div>지도내 매물 {filterdData?.length}</div>
          </ItemTabBar>
          <ItemBoxs>
            {filterdData?.map((p: postType) => {
              return (
                <>
                  <PostItems wide key={p._id} widthPercent={40} postData={p} />
                </>
              );
            })}
          </ItemBoxs>
        </ItemList>
      </MapBOx>
      <div className="filtertitle">조건별 매물 검색</div>
      <div className="itemcategorylist ">
        {filerImage.map(item => {
          return (
            <ItemBox
              key={item.key}
              onClick={() => {
                prefilter(item.filtername);
              }}
              bg={item.imageData}
            >
              <span className="oneroomText">{item.title}</span>
            </ItemBox>
          );
        })}
      </div>
      <div className="filtertitle">문산읍 인기매물</div>
      <div className="recommandItem">
        {popularItem?.map((p: postType, idx: number) => {
          // eslint-disable-next-line react/no-array-index-key
          return (
            <>
              <PostItems key={p._id} widthPercent={40} postData={p} />

              {/* <div className="scrollRef" ref={ref} /> */}
            </>
          );
        })}
      </div>
    </Wrap>
  );
};

export default PCviewContent;

const Wrap = styled.div`
  @media (max-width: 999px) {
    display: none;
  }
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow-y: visible;
    box-sizing: border-box;
    padding: 0 20px;
  }

  /* border: 1px solid black; */

  .filtertitle {
    width: 100%;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 20px;
  }
  .itemcategorylist {
    width: 100%;
    display: flex;
    flex: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    min-width: 100%;
    overflow: auto;
    height: 180px;
    margin-bottom: 30px;

    .oneroomText {
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px;
      border-radius: 4px;
    }
  }
  .itemcategory {
    /* float: left; */
    flex: none;
    display: flex;
    margin-right: 10px;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    background: #0059f9;
    border-radius: 4px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #ffffff;
    background-size: cover;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }
  }

  .recommandItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; // 각 아이템을 자리에 맞게 배치
    width: 100%;
    height: 100%;
    gap: 10px;
    margin-bottom: 30px;
    background-color: #ffffff;
    /* & > * {
      flex-basis: 33%; // 한 줄에 4개 아이템이 들어가도록 설정
    } */
  }
  .scrollRef {
    width: 1px;
    height: 1px;
  }
`;
const TopBanner = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .loginspan {
    margin-right: 20px;
    width: 100px;
  }
  .titleLogo {
    color: #0059f9;
    font-size: 20px;
    line-height: 24px;
    font-style: normal;
    font-weight: 700;
    width: 100%;
    height: 24px;
    margin-top: 41px;
    margin-bottom: 31px;
  }
`;
const MapBOx = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;
const ItemBox = styled.div<{ bg: string }>`
  flex: none;
  display: flex;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  background: #0059f9;
  border-radius: 4px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  background-size: cover;
  background-image: url(${props => props.bg});
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`;
const TopBox = styled.div`
  width: 100%;
`;
const BrandingBox = styled.div`
  width: 100%;
  height: 74px;
  box-sizing: border-box;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #9faffd;
  color: white;
  border-radius: 4px;
  margin-bottom: 16px;
  padding-left: 22px;
  padding-right: 10px;
  .rightarrow {
    font-size: 20px;
  }
`;
const ItemList = styled.div`
  width: 50%;
  height: 500px;
  overflow-y: auto;
  box-sizing: border-box;
  padding-left: 50px;
  /* position: relative; */
  padding-top: 30px;
`;
const ItemTabBar = styled.div`
  width: 40%;
  height: 30px;
  background-color: #fff;
  z-index: 3;
  display: flex;
  justify-content: center;
  gap: 50px;
  position: absolute;
  left: 60%;
  top: 0;
`;
const ItemBoxs = styled.div``;

export const filerImage = [
  { key: 0, imageData: '/oneroom.jpg', title: '원룸', filtername: 'oneroom' },
  {
    key: 1,
    imageData: '/tworoom.jpg',
    title: '투-쓰리룸',
    filtername: 'tworoom',
  },
  {
    key: 2,
    imageData: '/officetel.jpg',
    title: '오피스텔',
    filtername: 'office',
  },
  {
    key: 3,
    imageData: '/apartmentimage.jpg',
    title: '아파트',
    filtername: 'apartment',
  },
  { key: 4, imageData: '/house.jpg', title: '주택', filtername: 'house' },
  {
    key: 5,
    imageData: '/shopimage.jpg',
    title: '상가',
    filtername: 'shop',
  },
  {
    key: 6,
    imageData: '/factory.jpg',
    title: '공장/창고',
    filtername: 'factory',
  },

  {
    key: 7,
    imageData: '/landimage.jpg',
    title: '토지',
    filtername: 'land',
  },
];
