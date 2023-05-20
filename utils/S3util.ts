import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client: any = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});
// 파일 받아 S3에 업로드 후 url 반환
export const S3UpLoadFile = async (titleFile?: File) => {
  try {
    const S3key = `${titleFile?.name}`;
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: S3key,
    };

    const command: any = new PutObjectCommand(bucketParams);
    const url = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    const uploadRes = await fetch(url, {
      method: 'PUT',
      body: titleFile,
      headers: {
        'Content-type': titleFile!.type,
      },
    });

    const S3FileURL = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${S3key}`;
    return S3FileURL;
  } catch (err) {
    console.log('Error', err);
  }
};

// url로 파일 삭제
export const S3DeleteFile = async (fileurl?: string) => {
  try {
    const fileName = fileurl?.split('/').pop();
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileName,
    };
    const data = await client.send(new DeleteObjectCommand(bucketParams));
  } catch (err) {
    console.log('Error', err);
  }
};

// eslint-disable-next-line require-await
export const S3DeleteFiles = async (detailFile?: File[]) => {
  try {
    detailFile?.forEach(async file => {
      await S3DeleteFile(file.name);
    });
  } catch (err) {
    console.log('Error', err);
  }
};
