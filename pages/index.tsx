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
import MobileHomeContent from '@components/Mobile/Home/MobileHomeContent';
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

export default function Home() {
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' });
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [isMobile]);
  return (
    <Warp>
      {mobileView ? <MobileHomeContent /> : null}

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
