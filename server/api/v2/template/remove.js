import { eq } from "drizzle-orm";
import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { uid } = getQuery(event);

    if (!uid) {
      return apiResponse([], "UID is required", 400);
    }

    const deleted = await db
      .delete(templateData)
      .where(eq(templateData.id, uid));

    return apiResponse([], "Template deleted", 200);
  } catch (error) {
    console.error("Delete error:", error);
    return apiResponse([], "Internal server error", 500);
  }
});
