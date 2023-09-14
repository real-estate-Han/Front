import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { GeoLocation } from '@utils/type';
import KakaoMapUtil from '@components/kakaoMapUtils';

interface KakaoMapProps {
  positionprops: GeoLocation;
}
const FixedMap = ({ positionprops }: KakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [position, setPosition] = useState<GeoLocation>({
    lat: positionprops?.lat,
    lng: positionprops?.lng,
  });
  // eslint-disable-next-line react/no-unstable-nested-components
  const KakaoMapUtils = () => {
    if (!map) return null;
    return <KakaoMapUtil />;
  };

  useEffect(() => {
    setPosition({ lat: positionprops?.lat, lng: positionprops?.lng });
  }, [positionprops]);

  return (
    <>
      {positionprops ? (
        <Kakomap center={position} level={3} isPanto onCreate={setMap}>
          {position && <MapMarker position={position} />}
          <KakaoMapUtils />
        </Kakomap>
      ) : (
        <div>위치정보가 없습니다.</div>
      )}
    </>
  );
};
export default FixedMap;
const Kakomap = styled(Map)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: 0.5s;
  @media (min-width: 1000px) {
    width: 100%
    height: 600px;
  }
`;
