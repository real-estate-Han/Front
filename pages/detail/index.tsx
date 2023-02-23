import Head from 'next/head';
import Image from 'next/image';

import { css } from '@emotion/react';
import { Map } from 'react-kakao-maps-sdk';
export default function Detail() {
  return (
    <div>
      <div>디테일페이지</div>
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '360px' }}></Map>
    </div>
  );
}
