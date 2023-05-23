import { MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

const KakaoMapUtil = () => {
  return (
    <>
      <ZoomControl position={kakao?.maps?.ControlPosition?.BOTTOMLEFT} />
      <MapTypeControl position={kakao?.maps?.ControlPosition?.TOPRIGHT} />
    </>
  );
};
export default KakaoMapUtil;
