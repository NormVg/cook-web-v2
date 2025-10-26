import { eq } from "drizzle-orm";
import { db, templateData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { uid } = getQuery(event);

    if (!uid) {
      return apiResponse( 400,[], "UID is required");
    }

    const templateDataRaw = await db.select().from(templateData).where(eq(templateData.id,uid))

    if (templateDataRaw.length === 0) {
      return apiResponse(404, [], 'uid not found');
    }

    const template = templateDataRaw[0];
    console.log("Deleting template:", template);

    const fileID = template.fileID;

    const runtimeConfig = useRuntimeConfig()

    // First delete the file from Appwrite bucket and fileBucket table
    try {
      const bucketResponse = await $fetch("/api/v2/bucket/remove", {
        query: {
          file: fileID  // This is the fileBucket.id
        },
        headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
      });
      console.log("Bucket deletion response:", bucketResponse);
    } catch (bucketError) {
      console.error("Bucket deletion error:", bucketError);
      // Continue with template deletion even if bucket deletion fails
    }

    // Then delete the template from database
    await db.delete(templateData).where(eq(templateData.id, uid));

    return apiResponse(200, [], "Template and associated files deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    return apiResponse(500, [], "Internal server error: " + error.message);
  }
});
