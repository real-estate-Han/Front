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
    arrows: true,
    dots: true,
  };
  const sideBannerSite = [
    {
      url: 'https://rtms.molit.go.kr/index.do',
      img: '/trademanage.png',
      id: 1,
    },
    { url: 'https://www.nts.go.kr/', img: '/taxhome.png', id: 2 },
    {
      url: 'https://kras.go.kr:444/cmmmain/goMainPage.do',
      img: '/workconfotable.png',
      id: 3,
    },
    { url: 'https://www.lh.or.kr/', img: '/lh.png', id: 4 },
    {
      url: 'https://www.gov.kr/portal/main/nologin',
      img: '/minone24.png',
      id: 5,
    },
    { url: 'http://www.molit.go.kr/portal.do', img: '/landtraffic.png', id: 6 },
    { url: 'http://www.iros.go.kr/PMainJ.jsp', img: '/internetD.png', id: 7 },
    { url: 'https://seereal.lh.or.kr/main.do', img: '/seereal.png', id: 8 },
    { url: 'http://rt.molit.go.kr/', img: '/realtimetrade.png', id: 9 },
    { url: 'https://www.wetax.go.kr/main/', img: '/wetax.png', id: 10 },
    {
      url: 'https://www.reb.or.kr/r-one/main.do',
      img: '/estatetotal.png',
      id: 11,
    },
    { url: 'https://www.eais.go.kr/', img: '/seumta.png', id: 12 },
  ];
  const router = useRouter();
  return (
    <>
      {wide ? (
        <SideBanner border wide>
          <Slider {...widesettings}>
            {sideBannerSite.map(site => {
              return (
                <BannerSite
                  wide
                  key={site.id}
                  img={site.img}
                  onClick={() => {
                    window.open(site.url);
                  }}
                />
              );
            })}
          </Slider>
        </SideBanner>
      ) : (
        <SideBanner border>
          <Slider {...settings}>
            {sideBannerSite.map(site => {
              return (
                <BannerSite
                  key={site.id}
                  img={site.img}
                  onClick={() => {
                    window.open(site.url);
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

const SideBanner = styled.div<{ border: boolean; wide?: boolean }>`
  ${({ wide }) =>
    wide
      ? ` width: 100%;
  height: 100%;`
      : `  width:100%;
  height: 200px;`};

  background-color: white;
  /* border: 1px solid ${({ theme }) => theme.mainColor.blue200}; */
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px;
`;

const BannerSite = styled.div<{ img: string; wide?: boolean }>`
  ${({ wide }) =>
    wide
      ? ` width: 600px;
  height: 100px;`
      : `width: 600px;
  height: 100px;`};

  border-radius: 20px;
  box-sizing: border-box;
  background-image: url(${({ img }) => img});
  background-size: contain;
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
    /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5); */
  }
`;
