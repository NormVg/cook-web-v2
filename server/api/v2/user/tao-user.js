import { apiResponse } from "~/utils/apiResponse";
import { auth } from "~/utils/auth";


export default defineEventHandler(async (event) => {
  try {


    const config = useRuntimeConfig()

    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session ) {

      console.log("🚀 ~ file: tao-user.js:17 ~ session:", session);

      return apiResponse(401, [], "Unauthorized");


    }

    const userName = session.user.username;
    console.log("🚀 ~ file: tao-user.js:23 ~ userName:", userName)

    const url = `${config.public.taoAuthURL}/api/v2/service/get-user?username=${userName}&taoAuthToken=${config.public.taoAuthToken}&app=${config.public.appURL}`


    const userData = await $fetch(url)


    console.log("🚀 ~ file: tao-user.js:26 ~ userData:", userData)


    return apiResponse(200, userData.data, "User fetched");

    // return { statusCode: 200, data: data, status: "good" };
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
