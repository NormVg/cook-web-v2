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
    console.log(templateDataRaw[0]);

    const deleted = await db
      .delete(templateData)
      .where(eq(templateData.id, uid));

    await $fetch("/api/v2/bucket/remove",{
      query:{
        file:templateDataRaw[0].fileID
      }
    })

    return apiResponse(200,[], "Template deleted");
  } catch (error) {
    console.error("Delete error:", error);
    return apiResponse(500,[], "Internal server error");
  }
});
