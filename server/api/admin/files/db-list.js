import { db, fileBucket } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    // Get all files from database
    const files = await db.select().from(fileBucket);

    return apiResponse(200, files, "Database files fetched successfully");
  } catch (error) {
    console.error("Error fetching DB files:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
