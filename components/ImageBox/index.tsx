import styled from '@emotion/styled';
import Image from 'next/image';

interface ImageBoxProps {
  src: string;
  alt: string;
  watermark?: string;
}
const ImageBox = ({ src, alt, watermark }: ImageBoxProps) => {
  return (
    <>
      <ImageWrap>
        <Image src={src || './next.svg'} alt={alt} fill />
        {watermark === 'on' ? (
          <WaterMark>
            <span>한세일부동산</span>
            <span>031-953-6300</span>
            <span>010-5351-1613</span>
          </WaterMark>
        ) : null}
      </ImageWrap>
    </>
  );
};

export default ImageBox;

const ImageWrap = styled.div`
  width: 100%;
  height: 40vh;
  max-height: 600px;
  position: relative;
  @media (min-width: 1000px) {
    height: 50vh;
    max-height: 700px;
  }
`;
const WaterMark = styled.div`
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
  width: 200px;
  height: 100px;
  background: rgba(226, 216, 216, 0.781);
  z-index: 3;
  color: ${({ theme }) => theme.mainColor.blue500};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
`;
