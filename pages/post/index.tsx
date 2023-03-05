import styled from '@emotion/styled';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Swal from 'sweetalert2';
import { postType } from '@utils/type';
import Image from 'next/image';
import PostItemList from './postItemList';
import { S3Client, AbortMultipartUploadCommand, PutObjectCommand } from '@aws-sdk/client-s3';
export default function PostItem() {
  const {
    register,

    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<postType>();
  const client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });
  const bucketParams = {
    Bucket: 'real-estate-han',
    // Specify the name of the new object. For example, 'index.html'.
    // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
    Key: 'test01',
    // Content of the new object.
    Body: 'Hello World!',
  };
  const run = async () => {
    try {
      const data = await client.send(new PutObjectCommand(bucketParams));
      console.log('Successfully uploaded object: ' + bucketParams.Bucket + '/' + bucketParams.Key);
      return data; // For unit tests.
    } catch (err) {
      console.log('Error', err);
    }
  };
  const [textBox, setTextBox] = useState<number>();
  const [titleImg, setTitleImg] = useState<string>();
  const [detailImg, setDetailImg] = useState<string[]>();

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let theFile;
    if (event.target.id === 'itemTitleImg') {
      const reader = new FileReader();
      theFile = files && files[0];
      theFile && reader.readAsDataURL(theFile);
      reader.onload = () => {
        setTitleImg(reader.result as string);
      };
    } else {
      let fileUrl: string[] = [];

      theFile = files!;
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

  const onSubmit: SubmitHandler<postType> = (data) => {
    console.log('data', data);
    run();
    data.itemUniqueId && setTextBox(data?.itemUniqueId);
  };

  return (
    <Wrap>
      <h3>상품추가 페이지</h3>
      <></>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          {titleImg && <Image src={titleImg} alt="title_img" width="40" height={40}></Image>}
          <label>
            <span>타이틀 이미지</span>
            <input onChange={onFileChange} id="itemTitleImg" hidden type={'file'} />
          </label>
          {detailImg?.map((img, idx) => {
            return <Image key={idx} src={img} alt="titleImg" width="40" height={40}></Image>;
          })}

          <label>
            <span>디테일 이미지</span>
            <input hidden type={'file'} multiple onChange={onFileChange} />
          </label>
        </section>
        <section>
          <PostItemList register={register} errors={errors} />
        </section>
        <input type="submit"></input>
      </form>
      <p>{textBox}</p>
      <div></div>
    </Wrap>
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
