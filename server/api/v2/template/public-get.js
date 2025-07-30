import { eq, and } from "drizzle-orm";
import { addToTemplateDownloads, db, templateData } from "~/db/index";
import { getQuery, getHeader } from "h3";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);
    const uid = body.uid;

    if (!uid) {
      return apiResponse(400, [], "Missing template ID");
    }

    const templateInfo = await db
      .select()
      .from(templateData)
      .where(
        and(
          eq(templateData.id, uid),
          eq(templateData.public, true)
        )
      );

    if (templateInfo.length === 0) {
      return apiResponse(404, [], "Template not found or not public");
    }

    const appHeader = getHeader(event, "X-COOK-APP");
    if (appHeader?.toLowerCase() === "cli") {
      await addToTemplateDownloads(uid);
    }

    return apiResponse(200, templateInfo[0], "Template fetched successfully");
  } catch (error) {
    console.error("Error:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
