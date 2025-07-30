import { eq } from "drizzle-orm";
import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);


    if (!body || !body.username ){
      return apiResponse(400, [], "Missing required fields");
    }

    const userDataDB = await db
      .select()
      .from(userData)
      .where(eq(userData.username, body.username));

    if (userDataDB.length === 0) {
      return apiResponse(404, [{ isValid: false }], "user not found");
    }

    return apiResponse(200, [{ isValid: true }], "user found");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
