import { getFileBucketData, removeFromFileBucketData } from "~/db";
import { downloadFormAppwrite, removeFormAppwrite } from "~/utils/appwrite";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const { file } = getQuery(event);

    if (!file) {
      return apiResponse(400, [], "Missing 'file' parameter");
    }

    const fileData = await getFileBucketData(file);

    if (!fileData.length) {
      return apiResponse(404, [], "File not found");
    }

    const filePointerId = fileData[0].pointer;

    await removeFormAppwrite(
      filePointerId,
      runtimeConfig.appWriteProject,
      runtimeConfig.appWriteBucket
    );
    await removeFromFileBucketData(file);

    return apiResponse(200, [{ deleted: true }], "File deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);
    return apiResponse(500, [], "File deletion failed");
  }
});
