import styled from '@emotion/styled';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import Swal from 'sweetalert2';
import { postInputType, postType } from '@utils/type';
import Image from 'next/image';
import { PostItemList } from '@components/Inputs/postItemList';
import { useMutation } from '@apollo/client';
import { Creat_POST } from '@utils/apollo/gqls';
import imageCompression from 'browser-image-compression';
import { S3UpLoadFile } from '../../../utils/S3util';
import CommonButton from '@components/Button';
import CommonLabel from '@components/Label';
import Hr from '@components/Hr';
import SelectedButton from '@components/Button/selectedButton';

interface KakaoMapProps {
  kakaoLoadAddress?: string;
  kakaoAddress?: string;
  position: { lng: number; lat: number };
  region_1depth?: string;
  region_2depth?: string;
  region_3depth?: string;
}

export default function PostMain({
  kakaoLoadAddress,
  region_1depth,
  region_2depth,
  region_3depth,
  kakaoAddress,
  position,
}: KakaoMapProps) {
  const [titleImg, setTitleImg] = useState<string>();
  const [detailImg, setDetailImg] = useState<string[]>();
  const [titleFile, setTitleFile] = useState<File>();
  const [detailFile, setDetailFile] = useState<File[]>([]);
  const [transactionType, setTransactionType] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');

  const {
    register,
    setError,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<postType>();

  const handleTransactionTypeChange = (event: any) => {
    event && setTransactionType(event.target.value);
  };
  const handleItemTypeChange = (event: any) => {
    event && setItemType(event?.target.value);
  };

  const [tabIndex, setTabIndex] = useState('monthly/House');
  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const option = {
      maxSizeMB: 2,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    let theFile;
    if (event.target.id === 'itemTitleImg') {
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
    // const titleS3URL = titleFile && (await S3UpLoadFile(titleFile));
    // let detailS3URL: string[] = [];
    // if (detailFile) {
    //   for (let i = 0; i < detailFile.length; i++) {
    //     const url = await S3UpLoadFile(detailFile[i]);
    //     detailS3URL.push(url!);
    //   }
    // }

    const PostInputData = {
      ...data,
      itemAddress: kakaoAddress,
      kakaoLoadAddress: kakaoLoadAddress,
      region_1depth: region_1depth,
      region_2depth: region_2depth,
      region_3depth: region_3depth,
      // itemTitleimg: titleS3URL,
      // itemDetailimg: detailS3URL,
      itemType: itemType,
      transactionType: transactionType,
    };
    console.log(PostInputData);
    // const Geo = position;
    // CreatPost({ variables: { postInput: PostInputData, geo: Geo } });
    // error &&
    //   Swal.fire({
    //     title: error.message,
    //     icon: 'error',
    //     confirmButtonText: '확인',
    //   });
    // !error &&
    //   Swal.fire({
    //     title: '매물이 등록되었습니다.',
    //     icon: 'success',
    //     confirmButtonText: '확인',
    //   });
  };

  return (
    <>
      <ImageContainer>
        <div className="tilteImgBox">
          <CommonLabel htmlFor="itemTitleImg">
            <span>메인 사진 고르기</span>
          </CommonLabel>
          <input onChange={onFileChange} id="itemTitleImg" hidden type={'file'} />
          {titleImg ? <Image src={titleImg} alt="title_img" width={150} height={120} /> : null}
        </div>
        <div className="detailImgBox">
          <CommonLabel htmlFor="detailImg">
            상세 사진 고르기
            <input hidden id="detailImg" type={'file'} multiple onChange={onFileChange} />
          </CommonLabel>
          <div className="detailimglist">
            {detailImg?.map((img, idx) => {
              return (
                <Image key={idx} src={img} alt="titleImg" width={150} height={120} style={{ marginLeft: '5px' }} />
              );
            })}
          </div>
        </div>
      </ImageContainer>
      <Hr></Hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div>
            <SelectedButton
              value="monthly"
              name="monthly"
              onClick={handleTransactionTypeChange}
              selected={transactionType}
            >
              월세
            </SelectedButton>
            <SelectedButton value="jense" name="jense" onClick={handleTransactionTypeChange} selected={transactionType}>
              전세
            </SelectedButton>
            <SelectedButton value="sale" name="sale" onClick={handleTransactionTypeChange} selected={transactionType}>
              매매
            </SelectedButton>
          </div>
        </>
        <Hr></Hr>
        <>
          <div>
            <SelectedButton value="oneroom" onClick={handleItemTypeChange} selected={itemType}>
              원룸
            </SelectedButton>

            <SelectedButton value="tworoom" onClick={handleItemTypeChange} selected={itemType}>
              투-쓰리룸
            </SelectedButton>
            <SelectedButton value="office" onClick={handleItemTypeChange} selected={itemType}>
              오피스텔
            </SelectedButton>
            <SelectedButton value="house" onClick={handleItemTypeChange} selected={itemType}>
              주택
            </SelectedButton>
            <SelectedButton value="apartment" onClick={handleItemTypeChange} selected={itemType}>
              아파트
            </SelectedButton>
            <SelectedButton value="land" onClick={handleItemTypeChange} selected={itemType}>
              토지
            </SelectedButton>
            <SelectedButton value="factory" onClick={handleItemTypeChange} selected={itemType}>
              공장-창고
            </SelectedButton>
            <SelectedButton value="shop" onClick={handleItemTypeChange} selected={itemType}>
              상가
            </SelectedButton>
          </div>
        </>
        <section>
          <PostItemList
            itemType={itemType}
            transactionType={transactionType}
            tabIndex={tabIndex}
            register={register}
            errors={errors}
            getValues={getValues}
          />
        </section>
        <CommonButton type="submit">제출</CommonButton>
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
    /* border: 1px solid #000; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .detailImgBox {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: auto;
  }
  .detailimglist {
    box-sizing: border-box;
    padding: 0 10px;
    flex: none;
    gap: 5px;
    width: 100%;
  }
`;