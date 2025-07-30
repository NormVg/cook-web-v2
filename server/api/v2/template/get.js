import { getTemplateByUsername } from "~/db/callDB";
import { addToTemplateDownloads } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const { uid, username } = getQuery(event);

    if (!uid || !username) {
      return apiResponse(400, [], "invalid request");
    }

    const templateInfo = await getTemplateByUsername(username, uid);

    if (!templateInfo || templateInfo.length === 0) {
      return apiResponse(404, [], "not found");
    }

    const appHeader = getHeader(event, "X-COOK-APP");

    if (appHeader?.toLowerCase() === "cli") {

      await addToTemplateDownloads(uid);

    }

    return apiResponse(200, templateInfo, "good");
  } catch (error) {
    console.error("Handler error:", error);
    return apiResponse(500, [], "internal server error");
  }
});
