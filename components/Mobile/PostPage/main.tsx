import styled from '@emotion/styled';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import imageCompression from 'browser-image-compression';
import Image from 'next/image';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { postInputType, postType } from '@utils/type';
import PostItemList from '@components/Mobile/PostPage/postItemList';
import { Creat_POST, GET_CLUSTER_DATA, IS_LOGINED } from '@utils/apollo/gqls';
import CommonButton from '@components/Button';
import CommonLabel from '@components/Label';
import Hr from '@components/Hr';
import SelectedButton from '@components/Button/selectedButton';
import { S3UpLoadFile } from '../../../utils/S3util';
import CircleLoading from '@components/Loding/circleLoding';

interface KakaoMapProps {
  kakaoLoadAddress?: string;
  kakaoAddress?: string;
  position: { lng: number; lat: number };
  region_1depth?: string;
  region_2depth?: string;
  region_3depth?: string;
}

const PostMain = ({
  kakaoLoadAddress,
  region_1depth,
  region_2depth,
  region_3depth,
  kakaoAddress,
  position,
}: KakaoMapProps) => {
  const [titleImg, setTitleImg] = useState<string>();
  const [detailImg, setDetailImg] = useState<string[]>();
  const [titleFile, setTitleFile] = useState<File>();
  const [detailFile, setDetailFile] = useState<File[]>([]);
  const [transactionType, setTransactionType] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');
  const [waterMark, setWaterMark] = useState<string>('');
  const {
    register,
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
  const handleWaterMarkChange = (event: any) => {
    event && setWaterMark(event.target.value);
  };

  const [tabIndex, setTabIndex] = useState('monthly/House');

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
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
      let fileArr: File[] = [];

      for (let i = 0; i < theFile.length; i++) {
        imageCompression(theFile[i], option).then(res => {
          fileArr.push(res);
        });

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

  const [CreatPost, { data, loading: postLoading, error }] =
    useMutation(Creat_POST);
  const [checkLogin, { data: isLogined, error: loginErr }] = useLazyQuery(
    IS_LOGINED,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'no-cache',
    },
  );
  useEffect(() => {
    checkLogin().then(res => {
      if (
        res?.data?.checklogin?.checklogin === 'failed' ||
        res?.data?.checklogin?.status === 'geust'
      ) {
        Swal.fire({
          title: '관리자자격이 필요합니다',
          icon: 'error',
          confirmButtonText: '확인',
        });
        router.push('/');
      }
    });
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<postInputType> = data => {
    checkLogin().then(async res => {
      if (res?.data?.checklogin?.status === 'owner') {
        const titleS3URL = titleFile && (await S3UpLoadFile(titleFile));
        let detailS3URL: string[] = [];
        for (let i = 0; i < detailFile.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const res = await S3UpLoadFile(detailFile[i]);
          if (res) {
            detailS3URL.push(res);
          }
        }

        const PostInputData = {
          ...data,
          itemAddress: kakaoAddress,
          itemLoadAddress: kakaoLoadAddress ?? '',
          region_1depth,
          region_2depth,
          region_3depth,
          itemTitleimg: titleS3URL ?? '',
          itemDetailimg: detailS3URL,
          itemType,
          transactionType,
          itemWaterMark: waterMark,
          itemFavorCount: 0,
        };

        const Geo = position;

        CreatPost({
          variables: { postInput: PostInputData, geo: Geo },
          refetchQueries: [{ query: GET_CLUSTER_DATA }],
        });
        error &&
          Swal.fire({
            title: error.message,
            icon: 'error',
            confirmButtonText: '확인',
          });
        !error &&
          Swal.fire({
            title: '매물이 등록되었습니다.',
            icon: 'success',
            confirmButtonText: '확인',
          }).then(() => {
            router.push('/main');
          });
      }
      if (
        res?.data?.checklogin?.checklogin === 'failed' ||
        res?.data?.checklogin?.status === 'geust'
      ) {
        Swal.fire({
          title: '관리자자격이 필요합니다',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    });
  };

  return (
    <>
      <ImageContainer>
        <div className="tilteImgBox">
          <CommonLabel htmlFor="itemTitleImg">
            <span>메인 사진 고르기</span>
          </CommonLabel>
          <input onChange={onFileChange} id="itemTitleImg" hidden type="file" />
          {titleImg ? (
            <Image src={titleImg} alt="title_img" width={150} height={120} />
          ) : null}
        </div>
        <div className="detailImgBox">
          <CommonLabel htmlFor="detailImg">
            상세 사진 고르기
            <input
              hidden
              id="detailImg"
              type="file"
              multiple
              onChange={onFileChange}
            />
          </CommonLabel>
          <div className="detailimglist">
            {detailImg?.map((img, idx) => {
              return (
                <Image
                  // eslint-disable-next-line react/no-array-index-key
                  key={img}
                  src={img}
                  alt="titleImg"
                  width={150}
                  height={120}
                  style={{ marginLeft: '5px' }}
                />
              );
            })}
          </div>
        </div>
      </ImageContainer>
      <Hr />
      <>
        <span>워터마크 적용하기</span>
        <div>
          <SelectedButton
            type="button"
            value="on"
            onClick={handleWaterMarkChange}
            selected={waterMark}
          >
            적용
          </SelectedButton>
          <SelectedButton
            type="button"
            value="off"
            onClick={handleWaterMarkChange}
            selected={waterMark}
          >
            미적용
          </SelectedButton>
        </div>
        <Hr />
        <span>거래 종류</span>
        <div>
          <SelectedButton
            type="button"
            value="monthly"
            name="monthly"
            onClick={handleTransactionTypeChange}
            selected={transactionType}
          >
            월세
          </SelectedButton>
          <SelectedButton
            type="button"
            value="jense"
            name="jense"
            onClick={handleTransactionTypeChange}
            selected={transactionType}
          >
            전세
          </SelectedButton>
          <SelectedButton
            type="button"
            value="sale"
            name="sale"
            onClick={handleTransactionTypeChange}
            selected={transactionType}
          >
            매매
          </SelectedButton>
        </div>
      </>
      <Hr />
      <>
        <span>매물 종류</span>
        <div>
          <SelectedButton
            type="button"
            value="oneroom"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            원룸
          </SelectedButton>

          <SelectedButton
            type="button"
            value="tworoom"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            투-쓰리룸
          </SelectedButton>
          <SelectedButton
            type="button"
            value="office"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            오피스텔
          </SelectedButton>
          <SelectedButton
            type="button"
            value="house"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            주택
          </SelectedButton>
          <SelectedButton
            type="button"
            value="apartment"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            아파트
          </SelectedButton>
          <SelectedButton
            type="button"
            value="land"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            토지
          </SelectedButton>
          <SelectedButton
            type="button"
            value="factory"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            공장-창고
          </SelectedButton>
          <SelectedButton
            type="button"
            value="shop"
            onClick={handleItemTypeChange}
            selected={itemType}
          >
            상가
          </SelectedButton>
        </div>
      </>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Hr />
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
        <CommonButton disabled={postLoading} type="submit">
          제출
        </CommonButton>
      </form>
      {postLoading ? <CircleLoading /> : null}
    </>
  );
};
export default PostMain;
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
