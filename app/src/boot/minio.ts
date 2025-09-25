import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FetchHttpHandler } from '@aws-sdk/fetch-http-handler';

const s3Client = new S3Client({
  endpoint: process.env.VUE_APP_MINIO_HOST as string,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.VUE_APP_MINIO_LOGIN as string,
    secretAccessKey: process.env.VUE_APP_MINIO_PASSWORD as string,
  },
  forcePathStyle: true,
  requestHandler: new FetchHttpHandler(),
  requestChecksumCalculation: 'WHEN_REQUIRED',
});

export { s3Client };
