import { eq } from "drizzle-orm";
import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { username } = getQuery(event);

    if (!username) {
      return apiResponse(400, [], "Missing `username` in query");
    }

    const userDataDB = await db
      .select()
      .from(userData)
      .where(eq(userData.username, username));

    if (userDataDB.length === 0) {
      return apiResponse(404, [], "User not found");
    }

    return apiResponse(200, [userDataDB[0]], "User fetched");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
