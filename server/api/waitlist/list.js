import { db, waitListUser } from "~/db";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async () => {
  try {
    const all_data = await db.select().from(waitListUser);

    return apiResponse({
      statusCode: 200,
      data: all_data,
      msg: "Fetched waitlist users successfully",
    });
  } catch (error) {
    return apiResponse({
      statusCode: 500,
      data: [],
      msg: "Failed to fetch waitlist users",
    });
  }
});
