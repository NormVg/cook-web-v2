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

    console.log("Attempting to delete file bucket entry:", file);

    // Get the file bucket data
    const fileData = await getFileBucketData(file);

    if (!fileData.length) {
      console.warn("File bucket entry not found:", file);
      return apiResponse(404, [], "File not found in database");
    }

    const filePointerId = fileData[0].pointer;
    console.log("Appwrite file pointer ID:", filePointerId);

    // Remove from Appwrite storage
    try {
      await removeFormAppwrite(
        filePointerId,
        runtimeConfig.appWriteProject,
        runtimeConfig.appWriteBucket
      );
      console.log("Successfully deleted from Appwrite:", filePointerId);
    } catch (appwriteError) {
      console.error("Appwrite deletion error:", appwriteError);
      // Continue to delete from database even if Appwrite deletion fails
    }

    // Remove from fileBucket database table
    await removeFromFileBucketData(file);
    console.log("Successfully deleted from fileBucket table:", file);

    return apiResponse(200, [{ deleted: true }], "File deleted successfully");
  } catch (error) {
    console.error("Delete failed:", error);
    return apiResponse(500, [], "File deletion failed: " + error.message);
  }
});
