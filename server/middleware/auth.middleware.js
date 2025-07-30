import { validateAppKey } from "~/db";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  try {
    if (!event.path.startsWith("/api/v2/")) {
      return;
    }

    const appHeader = getHeader(event, "X-COOK-APP");
    const keyHeader = getHeader(event, "X-COOK-key")?.trim();

    if (!appHeader) {

      return apiResponse(400, [], "app not defined");

    }

    if (appHeader.toLowerCase() === "cli") {


      if (!keyHeader) {
        return apiResponse(400, [], "CLI key missing");
      }

      const isValid = await validateAppKey(keyHeader);
      if (!isValid) {
        return apiResponse(401, [], "Invalid CLI key");
      }





    } else if (appHeader.toLowerCase() === "web") {



      if (!keyHeader) {
        return apiResponse(400, [], "WEB key missing");
      }

      if (keyHeader !== runtimeConfig.public.taoTokenWeb) {
        return apiResponse(401, [], "Invalid WEB key");
      }




    } else {
      return apiResponse(400, [], "Invalid app type");
    }

  } catch (error) {
    console.error("💥 Auth Middleware Error:", error);
    return apiResponse(400, [], "check your headers");
  }
});
