import { eq } from "drizzle-orm";
import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { key } = getQuery(event);

    if (!key) {
      return apiResponse(400, [], "Missing `key` in query");
    }

    const userDataDB = await db
      .select()
      .from(userData)
      .where(eq(userData.connectionKey, key));

    if (userDataDB.length === 0) {
      return apiResponse(404, [], "User not found with provided connection key");
    }

    return apiResponse(200, [userDataDB[0]], "User data fetched");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
