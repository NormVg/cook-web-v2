import { eq } from "drizzle-orm";
import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body?.uid || !body?.updateData) {
      return apiResponse([], "Invalid input", 400);
    }

    const { uid, updateData } = body;

    const result = await db
      .update(templateData)
      .set(updateData)
      .where(eq(templateData.id, uid));

    // Optional: You can check if anything was updated
    if (result.rowCount === 0) {
      return apiResponse([], "No template found with given UID", 404);
    }

    return apiResponse([], "Template updated successfully", 200);
  } catch (error) {
    console.error("Update error:", error);
    return apiResponse([], "Internal server error", 500);
  }
});
