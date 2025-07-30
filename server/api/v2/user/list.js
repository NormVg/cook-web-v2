import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const userDataDB = await db.select().from(userData);

    if (userDataDB.length === 0) {
      return apiResponse(404, [], "No users found");
    }

    return apiResponse(200, userDataDB, "Users fetched");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
