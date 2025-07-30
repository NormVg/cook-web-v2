import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event);

    const runtimeConfig  = useRuntimeConfig()


    if (!body || !body.username || !body.taoAccessToken || !body.taoRefreshToken) {
      return { statusCode: 400, data: [], status: "args not found" }
    }

    const url = getRequestURL(event)

    const appOrigin = `${url.protocol}//${url.host}`;

    const {data} = await $fetch(`${runtimeConfig.public.taoAuthURL}/api/v2/service/get-user?username=${body.username}&taoAuthToken=${runtimeConfig.public.taoAuthToken}&app=${appOrigin}`)

    const respData = {
      id:data[0].id,
      name:data[0].name,
      email:data[0].email,
      username:data[0].username,
      displayUsername:data[0].displayUsername,
      about:data[0].about,
      location:data[0].location,
      who:data[0].who
    }

    return apiResponse(200,[respData],"success")
  } catch (error) {
    console.error(error);
    return apiResponse(500,[],"Internal Server Error")
  }
})
