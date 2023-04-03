import { MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

export default function KakaoMapUtil() {
  return (
    <>
      <ZoomControl position={kakao?.maps?.ControlPosition?.BOTTOMLEFT} />
      <MapTypeControl position={kakao?.maps?.ControlPosition?.TOPRIGHT} />
    </>
  );
}
