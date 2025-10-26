import * as sdk from "node-appwrite";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { fileId } = body;

    if (!fileId) {
      return apiResponse(400, [], "File ID is required");
    }

    const runtimeConfig = useRuntimeConfig();

    const client = new sdk.Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(runtimeConfig.appWriteProject)
      .setKey(runtimeConfig.appWriteKey);

    const storage = new sdk.Storage(client);

    // Delete the file from Appwrite
    await storage.deleteFile(runtimeConfig.appWriteBucket, fileId);

    return apiResponse(200, { fileId }, "File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    return apiResponse(500, [], "Failed to delete file: " + error.message);
  }
});
