import { getAllBucket } from "~/db/callDB";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const data = await getAllBucket();
    return apiResponse(200, data, "Fetched all file buckets successfully");
  } catch (error) {
    return apiResponse(500, [], "Failed to fetch file buckets");
  }
});
