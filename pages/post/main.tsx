import styled from "@emotion/styled";

import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Swal from "sweetalert2";
import { postType } from "@utils/type";
import Image from "next/image";
import PostItemList from "./postItemList";
import { Map } from "react-kakao-maps-sdk";

import { S3UpLoadFile, S3DeleteFile, S3UpLoadFiles } from "./S3util";
import KakaomapUtil from "@components/KakaomapUtil";
import dynamic from "next/dynamic";
import { GeoLocation } from "@utils/type";

interface KakaoMapProps {
  kakaoAddress: string | undefined;
  position: { lng: number; lat: number };
}

export default function PostMain({ kakaoAddress, position }: KakaoMapProps) {
  const [titleImg, setTitleImg] = useState<string>();
  const [detailImg, setDetailImg] = useState<string[]>();
  const [titleFile, setTitleFile] = useState<File>();
  const [detailFile, setDetailFile] = useState<File[]>([]);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<postType>();

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let theFile;
    if (event.target.id === "itemTitleImg") {
      const reader = new FileReader();
      theFile = files && files[0];
      theFile && setTitleFile(theFile);
      theFile && reader.readAsDataURL(theFile);
      reader.onload = () => {
        setTitleImg(reader.result as string);
      };
    } else {
      let fileUrl: string[] = [];
      theFile = files!;
      setDetailFile(Array.from(theFile));
      for (let i = 0; i < theFile.length; i++) {
        const reader = new FileReader();

        reader.onload = () => {
          fileUrl.push(reader.result as string);
          setDetailImg([...fileUrl]);
        };

        reader.readAsDataURL(theFile[i]);
      }
    }
  };

  const onSubmit: SubmitHandler<postType> = async data => {
    const urls = detailFile && (await S3UpLoadFiles(detailFile));
    console.log(urls);
    // S3DeleteFile(
    //   "https://real-estate-han.s3.ap-northeast-2.amazonaws.com/bird1.png"
    // );
  };

  // console.log(kakaoAddress);
  return (
    <>
      <h3>상품추가 페이지</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          {titleImg && (
            <Image
              src={titleImg}
              alt="title_img"
              width="40"
              height={40}
            ></Image>
          )}
          <label>
            <span>타이틀 이미지</span>
            <input
              onChange={onFileChange}
              id="itemTitleImg"
              hidden
              type={"file"}
            />
          </label>
          {detailImg?.map((img, idx) => {
            return (
              <Image
                key={idx}
                src={img}
                alt="titleImg"
                width="40"
                height={40}
              ></Image>
            );
          })}

          <label>
            <span>디테일 이미지</span>
            <input hidden type={"file"} multiple onChange={onFileChange} />
          </label>
        </section>
        <section>
          <PostItemList register={register} errors={errors} />
        </section>
        <input type="submit"></input>
      </form>
    </>
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
