import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3UpLoadFile = async (titleFile?: File, detailFile?: File[]) => {
  try {
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: titleFile?.name,
    };
    const url = await getSignedUrl(client, new PutObjectCommand(bucketParams), {
      expiresIn: 3600,
    });
    const uploadRes = await fetch(url, {
      method: "PUT",
      body: titleFile,
      headers: {
        "Content-type": titleFile!.type,
      },
    });

    const S3FileURL = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${titleFile?.name}`;
    return S3FileURL;
  } catch (err) {
    console.log("Error", err);
  }
};
export const S3DeleteFile = async (titleFile?: File, detailFile?: File[]) => {
  try {
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: titleFile?.name,
    };
    const data = await client.send(new DeleteObjectCommand(bucketParams));
  } catch (err) {
    console.log("Error", err);
  }
};
