import * as sdk from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { ID } from "appwrite";
import { Client, Storage } from "appwrite";


async function uploadFileToAppwrite(
  filePath,
  filename,
  projectKey,
  bucketKey,
  apiKey
) {
  const client = new sdk.Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectKey)
    .setKey(apiKey);

  const storage = new sdk.Storage(client);
  const nodeFile = InputFile.fromPath(filePath, filename);

  try {
    const response = await storage.createFile(bucketKey, ID.unique(), nodeFile);
    console.log(response);

    return response;
  } catch (error) {
    throw new Error("Failed to upload file to Appwrite");
  }
}

function downloadFormAppwrite(fileID,projectKey,bucketKey) {
  const client = new Client();

  const storage = new Storage(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(projectKey); // Your project ID

  const result = storage.getFileDownload(bucketKey, fileID);

  console.log(result); // Resource URL

  return result;
}

async function removeFormAppwrite(fileID,projectKey,bucketKey) {
  const client = new Client();

  const storage = new Storage(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject(projectKey); // Your project ID

  await storage.deleteFile(bucketKey,fileID)

  // console.log(result); // Resource URL

  // return result;
}

export { uploadFileToAppwrite , downloadFormAppwrite,removeFormAppwrite};
