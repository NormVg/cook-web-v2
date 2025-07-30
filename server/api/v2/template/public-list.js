import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const templates = await db
      .select()
      .from(templateData)
      .where(eq(templateData.public, true));

    if (templates.length === 0) {
      return apiResponse([], "No public templates found", 404);
    }

    return apiResponse(templates, "Public templates fetched", 200);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return apiResponse([], "Internal server error", 500);
  }
});
