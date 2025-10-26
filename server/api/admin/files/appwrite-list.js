import * as sdk from "node-appwrite";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();

    const client = new sdk.Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(runtimeConfig.appWriteProject)
      .setKey(runtimeConfig.appWriteKey);

    const storage = new sdk.Storage(client);

    // List all files in the bucket
    let allFiles = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const response = await storage.listFiles(
        runtimeConfig.appWriteBucket,
        [sdk.Query.limit(limit), sdk.Query.offset(offset)]
      );

      allFiles = allFiles.concat(response.files);
      offset += limit;
      hasMore = response.files.length === limit;
    }

    return apiResponse(200, allFiles, "Appwrite files fetched successfully");
  } catch (error) {
    console.error("Error fetching Appwrite files:", error);
    return apiResponse(500, [], "Failed to fetch Appwrite files: " + error.message);
  }
});
