import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import dynamic from 'next/dynamic';
import { GeoLocation } from '@utils/type';
import PostMain from './main';
import Swal from 'sweetalert2';
export default function PostItem() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const [position, setPosition] = useState<GeoLocation>({
    lat: 0,
    lng: 0,
  });
  const [kakaoAddress, setKakaoAddress] = useState<string>('');
  const [defaltPosition, setDefaltPosition] = useState<GeoLocation>({
    lat: 37.854572222429134,
    lng: 126.78755348011892,
  });
  const [mapLevel, setMapLevel] = useState(10);
  const getByGeoCoder = (lng: number, lat: number) => {
    if (!map) return;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setKakaoAddress(result[0]?.road_address?.address_name as string);
      }
    });
  };
  const kakaomapref = useRef<kakao.maps.Map>();
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
          setDefaltPosition({
            lat: parseFloat(result[0].y),
            lng: parseFloat(result[0].x),
          });
          setMapLevel(3);
        }
      });
  };

  const findGeoLocation = () => {
    Swal.fire({
      title: '도로명 주소를 입력해 주세요',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: '검색',
      showLoaderOnConfirm: true,
      preConfirm: address => {
        return getByAddress(address);
      },
    });
  };

  useEffect(() => {
    getByGeoCoder(position?.lng, position?.lat);
  }, [position]);

  const KakaoMapUtil = dynamic(() => import('@components/kakaoMapUtils'), {
    ssr: false,
  });
  return (
    <Wrap>
      <Kakomap
        center={defaltPosition}
        level={mapLevel}
        isPanto={true}
        onClick={(_t, mouseEvent) =>
          setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
        onCreate={setMap}
      >
        {position && (
          <MapMarker position={position}>
            <div className="AddressInfo">
              <span>{kakaoAddress}</span>
            </div>
          </MapMarker>
        )}
        <KakaoMapUtil />
      </Kakomap>
      <label>
        <button onClick={findGeoLocation}>도로명 주소 검색</button>
      </label>
      <PostMain position={position} kakaoAddress={kakaoAddress} />
    </Wrap>
  );
}
const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */

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
  .AddressInfo {
    /* display: flex;
    width: 150px;
    height: 30px;
    position: relative;
    left: -8px;
    top: -13px;
    border: 2px solid black;
    border-radius: 20px;
    padding: 5px;
    background-color: aqua;
    font-size: 11px;
    font-weight: 700; */
  }
`;
const Kakomap = styled(Map)`
  width: 400px;
  height: 400px;
  border: 1px solid black;
  transition: 0.5s;
  @media (min-width: 1200px) {
    width: 600px;
    height: 600px;
  }
`;
