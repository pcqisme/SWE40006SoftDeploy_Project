import {createTRPCRouter, protectedProcedure} from "~/server/api/trpc";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {z} from "zod";
import * as process from "node:process";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_S3!,
    secretAccessKey: process.env.AWS_SECRET_KEY_S3!,
  },
});

export const awsRouter = createTRPCRouter({
  generatePresignedUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1), // File name for the image
        fileType: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { fileName, fileType } = input;

      const bucketName = process.env.AWS_BUCKET_NAME!;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName, // File name in S3
        ContentType: fileType,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const signedUrl = await getSignedUrl(client, command, {
        expiresIn: 60,
      });

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        uploadUrl: signedUrl, // URL to upload the image
        publicUrl: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`, // Public URL of the image
      };
    }),
})