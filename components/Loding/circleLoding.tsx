/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const CircleLoading = () => {
  return (
    <ModalStyled className="loadingio-spinner-ripple-ypfp02kigx">
      <div className="ldio-9sbzoicyj8m">
        <div />
        <div />
      </div>
    </ModalStyled>
  );
};

export default CircleLoading;

const ModalStyled = styled.div`
  position: fixed;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  z-index: 9999;
  @keyframes ldio-9sbzoicyj8m {
    0% {
      top: 96px;
      left: 96px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 18px;
      left: 18px;
      width: 156px;
      height: 156px;
      opacity: 0;
    }
  }
  .ldio-9sbzoicyj8m div {
    position: absolute;
    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    animation: ldio-9sbzoicyj8m 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .ldio-9sbzoicyj8m div:nth-child(1) {
    border-color: #93dbe9;
    animation-delay: 0s;
  }
  .ldio-9sbzoicyj8m div:nth-child(2) {
    border-color: #689cc5;
    animation-delay: -0.5s;
  }
  .loadingio-spinner-ripple-ypfp02kigx {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #f1f2f3;
  }
  .ldio-9sbzoicyj8m {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-9sbzoicyj8m div {
    box-sizing: content-box;
  }
`;
