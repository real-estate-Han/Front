import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import dynamic from "next/dynamic";
import { GeoLocation } from "@utils/type";
import PostMain from "./main";
export default function PostItem() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [position, setPosition] = useState<GeoLocation>({
    lat: 0,
    lng: 0,
  });
  const [kakaoAddress, setKakaoAddress] = useState<string>("");

  const getByGeoCoder = (lng: number, lat: number) => {
    if (!map) return;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setKakaoAddress(result[0]?.road_address?.address_name as string);
      }
    });
  };

  const getByAddress = (address: string | undefined) => {
    if (!map) return;
    var geocoder = new kakao.maps.services.Geocoder();
    address &&
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setPosition({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
        }
      });
  };

  useEffect(() => {
    getByGeoCoder(position?.lng, position?.lat);
  }, [position]);

  const KakaoMapUtil = dynamic(() => import("@components/KakaomapUtil"), {
    ssr: false,
  });
  return (
    <Wrap>
      <Kakomap
        center={{ lat: 37.76005219169334, lng: 126.77987452889714 }}
        level={6}
        isPanto={true}
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
        onCreate={setMap}
      >
        {position && <MapMarker position={position} />}
        <KakaoMapUtil />
      </Kakomap>
      <label>
        <input
          onChange={e => {
            setKakaoAddress(e.target.value);
          }}
        ></input>
        <button onClick={getByAddress.bind(null, kakaoAddress)}>검색</button>
      </label>
      <PostMain position={position} kakaoAddress={kakaoAddress} />
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid red;

  form {
    width: 90%;
  }
  section:nth-of-type(1) {
    border: 1px solid blue;
  }
  section:nth-of-type(2) {
    border: 1px solid green;
    width: 100%;
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
