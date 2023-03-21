import styled from "@emotion/styled";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";

import KakaomapUtil from "@components/KakaomapUtil";
import { useCallback, useEffect, useRef, useState } from "react";
interface KakaoMapProps {}
export default function ClusterMap({}: KakaoMapProps) {
  const [info, setInfo] = useState<{
    position: {
      lat: number;
      lng: number;
    };
    content: string;
  }>();

  const [map, setMap] = useState<kakao.maps.Map>();

  const [markers, setMarkers] = useState<
    {
      position: {
        lat: number;
        lng: number;
      };
      content: string;
    }[]
  >([]);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const getGeoCoder = (lng: number, lat: number) => {
    if (!map) return;
  };

  const addMarker = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("파주아울렛 ", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: parseFloat(data[i].y),
              lng: parseFloat(data[i].x),
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };
  useEffect(() => {
    addMarker();
  }, [map]);

  return (
    <>
      <Kakomap
        center={{ lat: 37.76005219169334, lng: 126.77987452889714 }}
        level={3}
        isPanto={true}
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
        onCreate={setMap}
      >
        {markers &&
          markers.map(marker => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => {
                setInfo(marker),
                  getGeoCoder(marker.position.lat, marker.position.lng);
              }}
              title={marker.content}
            ></MapMarker>
          ))}
        {position && <MapMarker position={position} />}
        <ZoomControl position={kakao?.maps?.ControlPosition?.BOTTOMLEFT} />
        <MapTypeControl position={kakao?.maps?.ControlPosition?.TOPRIGHT} />
      </Kakomap>
    </>
  );
}

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
