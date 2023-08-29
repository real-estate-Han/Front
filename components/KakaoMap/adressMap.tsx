import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { GeoLocation } from '@utils/type';

interface KakaoMapProps {
  setKakaoAddress: Dispatch<SetStateAction<string | undefined>>;
  setKakaoGeo: Dispatch<SetStateAction<GeoLocation>>;
}
const AdressMap = ({ setKakaoAddress, setKakaoGeo }: KakaoMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [position, setPosition] = useState<GeoLocation>({
    lat: 0,
    lng: 0,
  });

  const getByGeoCoder = (lng: number, lat: number) => {
    if (!map) return;
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setKakaoAddress(result[0]?.road_address?.address_name);
      }
    });
  };

  // const getByAddress = (address: string) => {
  //   if (!map) return;
  //   let geocoder = new kakao.maps.services.Geocoder();
  //   geocoder.addressSearch(address, function (result, status) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       console.log(result);
  //     }
  //   });
  // };

  useEffect(() => {
    getByGeoCoder(position?.lng, position?.lat);
  }, [position]);

  return (
    <>
      <Kakomap
        center={{ lat: 37.76005219169334, lng: 126.77987452889714 }}
        level={4}
        isPanto
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
        onCreate={setMap}
      >
        {position && <MapMarker position={position} />}
        <ZoomControl position={kakao?.maps?.ControlPosition?.BOTTOMLEFT} />
        <MapTypeControl position={kakao?.maps?.ControlPosition?.TOPRIGHT} />
      </Kakomap>
    </>
  );
};

const Kakomap = styled(Map)`
  width: 500px;
  height: 400px;
  border: 1px solid black;
  transition: 0.5s;
  @media (min-width: 1000px) {
    width: 1000px;
    height: 600px;
  }
`;
