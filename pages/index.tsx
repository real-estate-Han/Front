import styled from '@emotion/styled';
import useStore from '@zustand/store';
import { Map, MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { use, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import Modal from '@components/Modal';

import { useQuery } from '@apollo/client';

export default function Home() {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA, {
    ssr: true,
  });
  const [map, setMap] = useState<kakao.maps.Map>();
  const { modalState, changeModalState } = useStore((state) => state);
  const KakaoMapUtil = dynamic(() => import('@components/KakaomapUtil'), {
    ssr: false,
  });
  const getTexts = (size: number) => {
    // 한 클러스터 객체가 포함하는 마커의 개수에 따라 다른 텍스트 값을 표시합니다
    if (size < 10) {
      return '삐약';
    } else if (size < 30) {
      return '꼬꼬';
    } else if (size < 50) {
      return '꼬끼오';
    } else {
      return '치멘';
    }
  };
  return (
    <div>
      {modalState ? (
        <Modal closeModal={changeModalState}>
          <></>
        </Modal>
      ) : (
        <></>
      )}

      <Warp>
        <MapPostList>
          <>
            <Kakomap
              center={{ lat: 37.76005219169334, lng: 126.77987452889714 }}
              level={9}
              isPanto={true}
              onCreate={setMap}
            >
              <MarkerClusterer
                averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                minLevel={10} // 클러스터 할 최소 지도 레벨
                disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
                calculator={[1, 5, 10]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
                texts={getTexts} // 클러스터의 크기에 따라 표시할 텍스트를 설정한다
              >
                {clusterData?.allpost?.posts.map((pos: any) => (
                  <MapMarker
                    key={`${pos.itemGeoLocation.lat}-${pos.itemGeoLocation.lng}`}
                    position={{
                      lat: pos.itemGeoLocation.lat,
                      lng: pos.itemGeoLocation.lng,
                    }}
                  />
                ))}
              </MarkerClusterer>
              <KakaoMapUtil />
            </Kakomap>
          </>

          <PostList>asd</PostList>
        </MapPostList>
        <section>
          <h1 onClick={changeModalState}>카테고리</h1>
          <nav>매물 이모티콘 모음 자리</nav>
        </section>
        <section>
          <article>매물별 아이템 리스트자리</article>
        </section>
      </Warp>
    </div>
  );
}

const Warp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  & section:nth-of-type(1) {
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  & section:nth-of-type(2) {
    border: 1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;
const MapPostList = styled.div`
  display: flex;
  width: 90%;
  height: 60%;
  margin: 0 auto;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  transition: 0.5s;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;
const Kakomap = styled(Map)`
  width: 500px;
  height: 400px;
  border: 1px solid black;
  transition: 0.5s;
  @media (min-width: 1200px) {
    width: 600px;
    height: 600px;
  }
`;
const PostList = styled.div`
  background-color: red;
  width: 500px;
  height: 400px;
  transition: 0.5s;
  @media (min-width: 1200px) {
    width: 600px;
    height: 600px;
  }
`;
