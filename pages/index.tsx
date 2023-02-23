import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Map } from 'react-kakao-maps-sdk';
export default function Home() {
  return (
    <div>
      <div>메인페이지</div>
      <Map
        center={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
        style={{ width: '500px', height: '500px' }}
      ></Map>
    </div>
  );
}
