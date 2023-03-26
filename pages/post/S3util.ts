import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client: any = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3UpLoadFile = async (titleFile?: File) => {
  try {
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: titleFile?.name,
    };
    console.log(bucketParams);
    const command: any = new PutObjectCommand(bucketParams);
    const url = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });
    console.log("url", url);
    const uploadRes = await fetch(url, {
      method: "PUT",
      body: titleFile,
      headers: {
        "Content-type": titleFile!.type,
      },
    });
    console.log("uploadRes", uploadRes);
    const S3FileURL = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${titleFile?.name}`;
    return S3FileURL;
  } catch (err) {
    console.log("Error", err);
  }
};
export const S3UpLoadFiles = async (detailFile?: File[]) => {
  try {
    let S3FileURLs: string[] = [];
    detailFile?.forEach(async file => {
      const url = await S3UpLoadFile(file);
      S3FileURLs.push(url!);
    });

    return S3FileURLs;
  } catch (err) {
    console.log("Error", err);
  }
};

export const S3DeleteFile = async (fileurl?: string) => {
  try {
    const fileName = fileurl?.split("/").pop();
    const bucketParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileName,
    };
    const data = await client.send(new DeleteObjectCommand(bucketParams));
  } catch (err) {
    console.log("Error", err);
  }
};

export const S3DeleteFiles = async (detailFile?: File[]) => {
  try {
    detailFile?.forEach(async file => {
      S3DeleteFile(file.name);
    });
  } catch (err) {
    console.log("Error", err);
  }
};
