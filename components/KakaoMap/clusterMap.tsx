import styled from '@emotion/styled';
import useStore from '@zustand/store';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import PostItem from '@components/PostItem';
import { useQuery } from '@apollo/client';
import KakaoMapUtil from '@components/kakaoMapUtils';
import { postType } from '@utils/type';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import useStoreFilter from '@zustand/filter';

interface makerType {
  position: { lat: number; lng: number };
  content: postType;
}
interface Iprops {
  initialData?: [postType];
}
const ClusterMap = ({ initialData }: Iprops) => {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  const { setDetailID, setDetailType } = useStore(state => state);
  const { setFilterdData } = useStoreFilter(state => state);
  const [clusterDataState, setClusterDataState] = useState<any>();
  useEffect(() => {
    if (initialData) {
      setClusterDataState(initialData);
    } else {
      setClusterDataState(clusterData?.allpost?.posts);
    }
  }, [clusterData]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [mapState, setMapState] = useState<any>();
  // useMediaQuery
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' });
  // 카카오맵 그려진 후 map 데이터 받아와서 있으면 유틸 렌더링 하기
  // eslint-disable-next-line react/no-unstable-nested-components
  const KakaoMapUtils = () => {
    if (!map) return null;
    return <KakaoMapUtil />;
  };

  const mapRef = useRef<kakao.maps.Map>(null);
  const [selectedData, setSelectedData] = useState<postType[]>();

  // 현재 지도에 보여지는 맵의 경계값을 받아와서 해당 경계값에 포함되는 데이터만 필터링
  const bounds = () => {
    if (!map && !mapState) return;
    const bounds = new kakao.maps.LatLngBounds(mapState?.sw, mapState?.ne);
    if (initialData) {
      const filterdata = initialData.filter((p: any) => {
        const contain = bounds.contain(
          new kakao.maps.LatLng(p.itemGeoLocation.lat, p.itemGeoLocation.lng),
        );

        return contain;
      });
      setFilterdData(filterdata);
      setSelectedData(filterdata);
    } else {
      const filterdata = clusterData?.allpost?.posts.filter((p: any) => {
        const contain = bounds.contain(
          new kakao.maps.LatLng(p.itemGeoLocation.lat, p.itemGeoLocation.lng),
        );

        return contain;
      });
      setFilterdData(filterdata);
      setSelectedData(filterdata);
    }
  };

  // 맨처음 경계값에 대한 자료가 안들어가 있어 초기값을 설정해줌
  // map이 아직 그려지지 않아서 경계값을 받아올 수 없음 그래서 처음에는 ssr로 데이터 받아와야함
  useEffect(() => {
    setSelectedData(clusterData?.allpost?.posts);
  }, []);

  // 지도가 움직일때마다 경계값을 받아와서 필터링
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
  const router = useRouter();
  // eslint-disable-next-line react/no-unstable-nested-components
  const MarkerContainer = ({ position, content }: makerType) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={() => {
          setDetailID(content._id!);
          setDetailType(content.itemType!);
          router.push(`/detail/${content._id}`);
        }} // 마커를 클릭했을 때 실행할 함수
        onMouseOver={() => setIsVisible(true)} // 마커에 마우스를 올렸을 때 간단히 매물 보여주기
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && <PostItem widthPercent={100} postData={content} />}
      </MapMarker>
    );
  };
  return (
    <>
      <MapPostList>
        <>
          <Kakomap
            center={{ lat: 37.854572222429134, lng: 126.78755348011892 }}
            level={8}
            isPanto
            onCreate={setMap}
            ref={mapRef}
            onBoundsChanged={map =>
              setMapState({
                sw: map.getBounds().getSouthWest(),
                ne: map.getBounds().getNorthEast(),
              })
            }
          >
            <MarkerClusterer
              averageCenter // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
              minLevel={2} // 클러스터 할 최소 지도 레벨
              disableClickZoom // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
              calculator={[4, 8, 16, 32]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
              onClusterclick={onClusterclick}
            >
              {clusterDataState?.map((pos: any) => (
                <MarkerContainer
                  key={`${pos.itemGeoLocation.lat}-${pos.itemGeoLocation.lng}`}
                  position={{
                    lat: pos.itemGeoLocation.lat,
                    lng: pos.itemGeoLocation.lng,
                  }}
                  content={pos}
                />
              ))}
            </MarkerClusterer>
            <KakaoMapUtils />
          </Kakomap>
        </>
      </MapPostList>
    </>
  );
};
export default ClusterMap;

const MapPostList = styled.div`
  @media (max-width: 999px) {
    box-sizing: border-box;
    padding-top: 100px;
    display: flex;
    width: 100%;
    height: 60%;

    justify-content: center;
    align-items: center;
    transition: 0.5s;
    position: fixed;
    top: 135px;
    left: 0;
  }

  @media (min-width: 1000px) {
    box-sizing: border-box;
    width: 100%;
    height: 60%;
    position: fixed;
    top: 227px;
    left: 0;
    display: flex;
    width: 100%;
    height: 60%;
    justify-content: center;
    align-items: center;
  }
`;
const Kakomap = styled(Map)`
  box-sizing: border-box;
  width: 100%;
  height: 70vh;
  border-top: 2px solid #f5f5f5;
  @media (min-width: 1000px) {
    width: 1000px;
    height: 700px;
  }
`;
/* border: 1px solid black; */
/* transition: 0.5s; */
/* padding: 5px; */
/* @media (max-width: 600px) {
    width: 100%;
    height: 60vh;
  }
  @media (min-width: 800px) {
    width: 400px;
    height: 400px;
  }
  @media (min-width: 1200px) {
    width: 600px;
    height: 600px;
  } */

const PostList = styled.div`
  /* background-color: red; */
  border: 1px solid black;
  padding: 5px;
  width: 50%;
  min-width: 500px;
  min-height: 400px;
  transition: 0.5s;
  @media (min-width: 800px) {
    min-width: 400px;
    min-height: 400px;
  }
  @media (max-width: 600px) {
    display: none;
  }
  @media (min-width: 1200px) {
    width: 600px;
    height: 600px;
  }
`;
