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
            <div>한세일부동산</div>
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
`;
const WaterMark = styled.div`
  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
  width: 200px;
  height: 100px;
  background: rgba(245, 241, 241, 0.475);
  z-index: 3;
  color: ${({ theme }) => theme.mainColor.blue500};
  display: flex;
  justify-content: center;
  align-items: center;
`;
