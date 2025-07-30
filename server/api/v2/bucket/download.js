import { getFileBucketData } from "~/db";
import { downloadFormAppwrite } from "~/utils/appwrite";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const { file } = getQuery(event);

    if (!file) {
      return apiResponse(400, [], "Missing 'file' parameter in query");
    }

    const fileData = await getFileBucketData(file);

    if (!fileData.length) {
      return apiResponse(404, [], "File not found");
    }

    const filePointerId = fileData[0].pointer;

    const resp = await downloadFormAppwrite(
      filePointerId,
      runtimeConfig.appWriteProject,
      runtimeConfig.appWriteBucket
    );

    return apiResponse(200, [resp], "File downloaded successfully");
  } catch (error) {
    console.error(error);
    return apiResponse(500, [], "Download failed");
  }
});
