import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const S3_BUCKET = process.env.S3_BUCKET || 'acmud-bucket';
const S3_REGION = process.env.S3_REGION || 'us-east-2';

// S3 object connection
const s3 = new S3Client({
  region: S3_REGION,
});

type uploadParams = {
  key: string;
  buffer: Buffer;
  mimetype: string;
  isPublic?: boolean;
};

/**
 * Upload a file to aws S3, and return the url of this
 * @returns URL of the file
 */
export async function uploadFile({
  key,
  buffer,
  mimetype,
  isPublic = false,
}: uploadParams) {
  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      ContentType: mimetype,
      Key: key,
      Body: buffer,
      ACL: isPublic ? 'public-read' : 'private',
    })
  );

  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`;
}
