import styled from "@emotion/styled";
import useStore from "@zustand/store";
import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import Modal from "@components/Modal";
const srcURL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
import { postShorten } from "@components/PostItem";

export default function Home() {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const { modalState, changeModalState } = useStore(state => state);
  const KakaoMap = dynamic(() => import("@components/KakaoMap/clusterMap"), {
    ssr: false,
  });
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
          <KakaoMap></KakaoMap>

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
