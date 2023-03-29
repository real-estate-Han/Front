import styled from "@emotion/styled";

import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { postInputType, postType } from "@utils/type";
import Image from "next/image";
import PostItemList from "./postItemList";
import { useMutation } from "@apollo/client";
import { Creat_POST } from "@utils/apollo/gqls";
import imageCompression from "browser-image-compression";
import { S3UpLoadFile } from "./S3util";

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
  const [tabIndex, setTabIndex] = useState("monthly/House");
  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const option = {
      maxSizeMB: 2,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    let theFile;
    if (event.target.id === "itemTitleImg") {
      const reader = new FileReader();
      theFile = files && files[0];
      if (theFile) {
        const compressedFile = await imageCompression(theFile, option);

        theFile && setTitleFile(compressedFile);
        theFile && reader.readAsDataURL(theFile);
        reader.onload = () => {
          setTitleImg(reader.result as string);
        };
      }
    } else {
      let fileUrl: string[] = [];
      theFile = files!;
      let fileArr = [];

      for (let i = 0; i < theFile.length; i++) {
        const compressedFile = await imageCompression(theFile[i], option);
        fileArr.push(compressedFile);

        const reader = new FileReader();

        reader.onload = () => {
          fileUrl.push(reader.result as string);
          setDetailImg([...fileUrl]);
        };

        reader.readAsDataURL(theFile[i]);
      }
      setDetailFile(fileArr);
    }
  };
  const [CreatPost, { data, loading, error }] = useMutation(Creat_POST);
  const onSubmit: SubmitHandler<postInputType> = async data => {
    const titleS3URL = titleFile && (await S3UpLoadFile(titleFile));
    let detailS3URL: string[] = [];
    if (detailFile) {
      for (let i = 0; i < detailFile.length; i++) {
        const url = await S3UpLoadFile(detailFile[i]);
        detailS3URL.push(url!);
      }
    }

    const PostInputData = {
      ...data,
      itemAddress: kakaoAddress,
      itemTitleimg: titleS3URL,
      itemDetailimg: detailS3URL,
    };

    const Geo = position;
    CreatPost({ variables: { postInput: PostInputData, geo: Geo } });
    error &&
      Swal.fire({
        title: error.message,
        icon: "error",
        confirmButtonText: "확인",
      });
    !error &&
      Swal.fire({
        title: "매물이 등록되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
  };
  // const newTabArr = new Map([
  //   ["house", <PostItemList register={register} errors={errors} />],
  //   ["factory", <div />],
  // ]);

  return (
    <>
      <ImageContainer>
        <div className="tilteImgBox">
          <label htmlFor="itemTitleImg">
            <p>메인 사진 고르기</p>
            <input
              onChange={onFileChange}
              id="itemTitleImg"
              hidden
              type={"file"}
            />
          </label>
          {titleImg ? (
            <Image src={titleImg} alt="title_img" width={150} height={120} />
          ) : null}
        </div>
        <div className="detailImgBox">
          <label htmlFor="detailImg">
            <p>상세 사진 고르기</p>
            <input
              hidden
              id="detailImg"
              type={"file"}
              multiple
              onChange={onFileChange}
            />
          </label>
          {detailImg?.map((img, idx) => {
            return (
              <Image
                key={idx}
                src={img}
                alt="titleImg"
                width={150}
                height={120}
              />
            );
          })}
        </div>
      </ImageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <span>매물 종류 : </span>
          <select
            {...register("itemType")}
            onChange={e => {
              setTabIndex(e.currentTarget.value);
            }}
          >
            <option value="monthly/House">집/월세 </option>
            <option value="jense/House">집/전세</option>
            <option value="sale/House">집/매매</option>
            <option value="monthly/Mart">상가/기타</option>
            <option value="sale/Factory">공장-창고/매매</option>
            <option value="monthly/Factory">공장-창고/임대</option>
            <option value="sale/Land">토지/매대</option>
            <option value="monthly/Land">토지/임대</option>
          </select>
        </>
        <section>
          {/* {newTabArr.get(tabIndex)} */}
          <PostItemList
            tabIndex={tabIndex}
            register={register}
            errors={errors}
          />
        </section>
        <input type="submit"></input>
      </form>
    </>
  );
}

const ImageContainer = styled.section`
  display: flex;
  width: 90%;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .tilteImgBox {
    width: 100%;
    border: 1px solid #000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .detailImgBox {
    border: 1px solid #000;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
  }
`;
