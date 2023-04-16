import styled from '@emotion/styled';
import useStore from '@zustand/store';
import { Map, MarkerClusterer, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { use, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import Modal from '@components/Modal';
import PostItem from '@components/PostItem';
import { useQuery } from '@apollo/client';
import KakaoMapUtil from '@components/kakaoMapUtils';
import { postType } from '@utils/type';
import { initializeApollo } from '@utils/apollo/apolloclient';
import Image from 'next/image';

import { useMediaQuery } from 'react-responsive';
import ClusterMap from '@components/KakaoMap/clusterMap';
import MobileHomeContent from '@components/Mobile/MobileHomeContent';
//apollo client SSR
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CLUSTER_DATA,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

interface makerType {
  position: { lat: number; lng: number };
  content: postType;
}

export default function Home() {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  const { detailState, changeDetailState, setDetailID, setDetailType } = useStore(state => state);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [mapState, setMapState] = useState<any>();
  //useMediaQuery
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' });
  // 카카오맵 그려진 후 map 데이터 받아와서 있으면 유틸 렌더링 하기
  const KakaoMapUtils = () => {
    if (!map) return null;
    return <KakaoMapUtil></KakaoMapUtil>;
  };

  const mapRef = useRef<kakao.maps.Map>(null);
  const [selectedData, setSelectedData] = useState<postType[]>();

  //현재 지도에 보여지는 맵의 경계값을 받아와서 해당 경계값에 포함되는 데이터만 필터링
  const bounds = () => {
    if (!map && !mapState) return;
    const bounds = new kakao.maps.LatLngBounds(mapState?.sw, mapState?.ne!);
    const filterdata = clusterData?.allpost?.posts.filter((p: any) => {
      const contain = bounds.contain(new kakao.maps.LatLng(p.itemGeoLocation.lat, p.itemGeoLocation.lng));

      return contain;
    });
    setSelectedData(filterdata);
  };

  //맨처음 경계값에 대한 자료가 안들어가 있어 초기값을 설정해줌
  // map이 아직 그려지지 않아서 경계값을 받아올 수 없음 그래서 처음에는 ssr로 데이터 받아와야함
  useEffect(() => {
    setSelectedData(clusterData?.allpost?.posts);
  }, []);

  //지도가 움직일때마다 경계값을 받아와서 필터링
  useEffect(() => {
    const debounce = setTimeout(() => {
      return bounds();
    }, 400);
    return () => clearTimeout(debounce);
  }, [mapState]);

  const onClusterclick = (_target: any, cluster: any) => {
    const mapr = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = mapr && mapr.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대
    mapr && mapr.setLevel(level!, { anchor: cluster.getCenter() });
  };

  const MarkerContainer = ({ position, content }: makerType) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={() => {
          changeDetailState();
          setDetailID(content._id!);
          setDetailType(content.itemType!);
        }} // 마커를 클릭했을 때 실행할 함수
        onMouseOver={() => setIsVisible(true)} // 마커에 마우스를 올렸을 때 간단히 매물 보여주기
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && <PostItem widthPercent={100} postData={content}></PostItem>}
      </MapMarker>
    );
  };
  return (
    <Warp>
      {isMobile ? <MobileHomeContent /> : null}

      {/* <ClusterMap /> */}
    </Warp>
  );
}

const Warp = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  & section:nth-of-type(1) {
    /* border: 1px solid blue; */
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  & section:nth-of-type(2) {
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;
// const MapPostList = styled.div`
//   display: flex;
//   width: 100%;
//   height: 60%;
//   margin: 0 auto;
//   gap: 1rem;
//   justify-content: center;
//   align-items: center;

//   transition: 0.5s;
//   @media (max-width: 800px) {
//     display: flex;
//     flex-direction: column;
//   }
// `;
// const Kakomap = styled(Map)`
//   box-sizing: border-box;
//   /* border: 1px solid black; */
//   transition: 0.5s;
//   /* padding: 5px; */
//   @media (max-width: 600px) {
//     width: 100%;
//     height: 60vh;
//   }
//   @media (min-width: 800px) {
//     width: 400px;
//     height: 400px;
//   }
//   @media (min-width: 1200px) {
//     width: 600px;
//     height: 600px;
//   }
// `;
// const PostList = styled.div`
//   /* background-color: red; */
//   border: 1px solid black;
//   padding: 5px;
//   width: 50%;
//   min-width: 500px;
//   min-height: 400px;
//   transition: 0.5s;
//   @media (min-width: 800px) {
//     min-width: 400px;
//     min-height: 400px;
//   }
//   @media (max-width: 600px) {
//     display: none;
//   }
//   @media (min-width: 1200px) {
//     width: 600px;
//     height: 600px;
//   }
// `;
