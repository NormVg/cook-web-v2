import { eq } from "drizzle-orm";
import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);

    if (!body || !body.key ){
      return apiResponse(400, [], "Missing required fields");
    }

    const userDataDB = await db
      .select()
      .from(userData)
      .where(eq(userData.connectionKey, body.key));

    const isValid = userDataDB.length > 0;

    return apiResponse(200, [{ isValid }], "Validation check complete");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
