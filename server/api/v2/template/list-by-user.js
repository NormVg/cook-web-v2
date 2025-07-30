import { eq } from "drizzle-orm";
import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { username } = getQuery(event);

    if (!username) {
      return apiResponse(400, [], "Username is required");
    }

    const templates = await db
      .select()
      .from(templateData)
      .where(eq(templateData.author, username));

    if (templates.length === 0) {
      return apiResponse(404, [], "No templates found");
    }

    return apiResponse(200, templates, "Templates fetched successfully");
  } catch (error) {
    console.error("Fetch templates error:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
