import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { username } = getQuery(event);

    if (!username) {
      return apiResponse(400, [], "Missing `username` in query");
    }

    const templates = await db
      .select()
      .from(templateData)
      .where(
        and(
          eq(templateData.author, username),
          eq(templateData.public, true)
        )
      );

    if (templates.length === 0) {
      return apiResponse(404, [], "No public templates found for this user");
    }

    return apiResponse(200, templates, "Public templates fetched");
  } catch (error) {
    console.error("Error fetching user templates:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
