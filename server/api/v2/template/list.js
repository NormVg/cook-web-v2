import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const templates = await db.select().from(templateData);

    if (templates.length === 0) {
      return apiResponse(404, [], "No templates found");
    }

    return apiResponse(200, templates, "Templates fetched successfully");
  } catch (error) {
    console.error("Error fetching templates:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
