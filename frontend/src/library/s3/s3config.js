import AWS, { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'

// Set the AWS Region
const REGION = "us-west-2"; //REGION
const albumBucketName = "quickben"; //BUCKET_NAME

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: REGION }),
        identityPoolId: "us-west-2:c53e9040-78d1-403f-b129-a0bd6870d620", // IDENTITY_POOL_ID
    }),
    params: { Bucket: albumBucketName }
});

// Add a photo to an album
const addPhoto = async (albumName, file) => {
    const albumPhotosKey = `dev/${albumName}/`
    const fileName = file.name;
    const photoKey = albumPhotosKey + fileName;
    const uploadParams = {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file
    };
    try {
        await s3.send(new PutObjectCommand(uploadParams));
        const url = `https://${albumBucketName}.s3.${REGION}.amazonaws.com/${photoKey}`
        return url;
    } catch (err) {
        console.log("There was an error uploading your photo: ", err);
        return
    }
};

export { addPhoto }