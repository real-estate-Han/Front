import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import dynamic from 'next/dynamic';
import { GeoLocation } from '@utils/type';
import Swal from 'sweetalert2';
import TopBar from '@components/TopBar';
import CommonButton from '@components/Button';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DETAIL_POST } from '@utils/apollo/gqls';

import UpdateMain from '@components/Mobile/UpdatePage/main';

const UpdatePage = () => {
  const router = useRouter();
  const detailID = router.query.id;
  const {
    data: DetailData,
    loading,
    error,
  } = useQuery(GET_DETAIL_POST, {
    variables: {
      postId: detailID,
    },
    fetchPolicy: 'cache-first',
  });

  const [map, setMap] = useState<kakao.maps.Map>();
  const [position, setPosition] = useState<GeoLocation>({
    lat: 0,
    lng: 0,
  });
  const [kakaoLoadAddress, setKakaoLoadAddress] = useState<string>('');
  const [kakaoAddress, setKakaoAddress] = useState<string>('');
  const [region_1depth, setRegion_1depth] = useState<string>('');
  const [region_2depth, setRegion_2depth] = useState<string>('');
  const [region_3depth, setRegion_3depth] = useState<string>('');
  const [defaltPosition, setDefaltPosition] = useState<GeoLocation>({
    lat: 37.854572222429134,
    lng: 126.78755348011892,
  });
  const [mapLevel, setMapLevel] = useState(10);
  useEffect(() => {
    if (DetailData) {
      setPosition({
        lat: DetailData?.post?.itemGeoLocation.lat,
        lng: DetailData?.post?.itemGeoLocation.lng,
      });
      setDefaltPosition({
        lat: DetailData?.post?.itemGeoLocation.lat,
        lng: DetailData?.post?.itemGeoLocation.lng,
      });
      setKakaoLoadAddress(DetailData?.post?.itemLoadAddress);
      setKakaoAddress(DetailData?.post?.itemAddress);
      setRegion_1depth(DetailData?.post?.region_1depth);
      setRegion_2depth(DetailData?.post?.region_2depth);
      setRegion_3depth(DetailData?.post?.region_3depth);
      setMapLevel(3);
    }
  }, [DetailData]);
  const getByGeoCoder = (lng: number, lat: number) => {
    if (!map) return;
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setKakaoLoadAddress(result[0]?.road_address?.address_name as string);
        setKakaoAddress(result[0]?.address?.address_name as string);
        setRegion_1depth(result[0]?.address?.region_1depth_name as string);
        setRegion_2depth(result[0]?.address?.region_2depth_name as string);
        setRegion_3depth(result[0]?.address?.region_3depth_name as string);
      }
    });
  };

  const getByAddress = (address: string | undefined) => {
    if (!map) return;
    let geocoder = new kakao.maps.services.Geocoder();
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
          setMapLevel(2);
        }
      });
  };

  const findGeoLocation = () => {
    Swal.fire({
      title: '주소를 입력해 주세요',
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

  const sendSMS = () => {
    const encodedPhoneNumber = encodeURIComponent('010-6788-7335');
    const encodedMessage = encodeURIComponent('안녕하세요. 메시지 내용입니다.');
    const url = `sms:${encodedPhoneNumber}?body=${encodedMessage}`;

    window.location.href = url;
  };

  return (
    <Wrap>
      <TopBar
        mainTitle="매물 등록"
        ArrowFn={() => {
          router.back();
        }}
      />
      <Kakomap
        center={defaltPosition}
        level={mapLevel}
        isPanto
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
              <span>{kakaoLoadAddress ?? kakaoAddress}</span>
            </div>
          </MapMarker>
        )}
        <KakaoMapUtil />
      </Kakomap>
      <a href="tel:01067887335">01067887335</a>
      <CommonButton onClick={findGeoLocation}>주소 검색</CommonButton>
      <button type="button" onClick={sendSMS}>
        전화번호
      </button>
      <Hr />
      <UpdateMain
        prvdata={DetailData?.post}
        position={position}
        region_1depth={region_1depth}
        region_2depth={region_2depth}
        region_3depth={region_3depth}
        kakaoAddress={kakaoAddress}
        kakaoLoadAddress={kakaoLoadAddress}
      />
    </Wrap>
  );
};

export default UpdatePage;
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
`;
const Hr = styled.hr`
  border: none;
  width: 100vw;
  height: 1px;

  background-color: #f5f5f5;
  margin: 10px;
`;
const Kakomap = styled(Map)`
  width: 100vw;
  height: 400px;
  border-radius: 4px;
  transition: 0.5s;

  @media (min-width: 1000px) {
    width: 1000px;
    height: 600px;
  }
`;
