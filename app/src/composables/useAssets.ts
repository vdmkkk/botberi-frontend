//@ts-nocheck
import { s3Client } from '../boot/minio';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const useAssets = () => {
  const getAsset = async (bucket: string, key: string) => {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
  };

  const uploadAsset = async (bucket: string, key: string, file: File) => {
    const fileArrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: new Uint8Array(fileArrayBuffer),
      ContentType: file.type || 'application/octet-stream',
    });
    return await s3Client.send(command).then(async (res) => {
      return res;
    });
  };

  const deleteAsset = async (bucket: string, key: string) => {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    return await s3Client.send(command).then(async (res) => {
      return res;
    });
  };

  return { getAsset, uploadAsset, deleteAsset };
};

export default useAssets;
