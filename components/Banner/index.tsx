/* eslint-disable react/no-array-index-key */

import styled from '@emotion/styled';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

interface BannerProps {
  wide?: boolean;
}
export const Banner = ({ wide }: BannerProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    cssEase: 'linear',
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 100,
    arrows: false,
  };
  const widesettings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    cssEase: 'linear',
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 100,
    arrows: false,
  };
  const sideBannerSite = [
    { url: 'https://rtms.molit.go.kr/index.do', img: '/trademanage.png' },
    { url: 'https://www.nts.go.kr/', img: '/taxhome.png' },
    {
      url: 'https://kras.go.kr:444/cmmmain/goMainPage.do',
      img: '/workconfotable.png',
    },
    { url: 'https://www.lh.or.kr/', img: '/lh.png' },
    {
      url: 'https://www.gov.kr/portal/main/nologin',
      img: '/minone24.png',
    },
    { url: 'http://www.molit.go.kr/portal.do', img: '/landtraffic.png' },
    { url: 'http://www.iros.go.kr/PMainJ.jsp', img: '/internetD.png' },
    { url: 'https://seereal.lh.or.kr/main.do', img: '/seereal.png' },
    { url: 'http://rt.molit.go.kr/', img: '/realtimetrade.png' },
    { url: 'https://www.wetax.go.kr/main/', img: '/wetax.png' },
    { url: 'https://www.reb.or.kr/r-one/main.do', img: '/estatetotal.png' },
    { url: 'https://www.eais.go.kr/', img: '/seumta.png' },
  ];
  const router = useRouter();
  return (
    <>
      {wide ? (
        <SideBanner border>
          <Slider {...widesettings}>
            {sideBannerSite.map((site, index) => {
              return (
                <BannerSite
                  key={index}
                  img={site.img}
                  onClick={() => {
                    router.push(site.url);
                  }}
                />
              );
            })}
          </Slider>
        </SideBanner>
      ) : (
        <SideBanner border>
          <Slider {...settings}>
            {sideBannerSite.map((site, index) => {
              return (
                <BannerSite
                  key={index}
                  img={site.img}
                  onClick={() => {
                    router.push(site.url);
                  }}
                />
              );
            })}
          </Slider>
        </SideBanner>
      )}
    </>
  );
};

const SideBanner = styled.div<{ border: boolean }>`
  width: 200px;
  height: 440px;
  background-color: white;
  /* border: 1px solid ${({ theme }) => theme.mainColor.blue200}; */
  border-radius: 20px;
`;

const BannerSite = styled.div<{ img: string }>`
  width: 50px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.mainColor.blue200};
  border-radius: 20px;
  box-sizing: border-box;
  background-image: url(${({ img }) => img});
  background-size: contain;
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  }
`;
