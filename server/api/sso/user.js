import { apiResponse } from "~/utils/apiResponse"

export default defineEventHandler(async (event) => {

  const tsso_sesssion_id =  getCookie(event,"tsso_sesssion_id")
  const tsso_expiryDate =  getCookie(event,"tsso_expiryDate")
  const tsso_accessToken =  getCookie(event,"tsso_accessToken")
  const tsso_refreshToken =  getCookie(event,"tsso_refreshToken")

  const ssoCookieData = {
    session_id: tsso_sesssion_id,
    expiryDate: tsso_expiryDate,
    accessToken: tsso_accessToken,
    refreshToken: tsso_refreshToken,
  };


  const url = getRequestURL(event)

  const runtimeConfig = useRuntimeConfig();



  const appOrigin = `${url.protocol}//${url.host}`;

  const data = await $fetch(`${runtimeConfig.public.taoAuthURL}/api/v2/sso/user?app=${appOrigin}&taoAuthToken=${runtimeConfig.public.taoAuthToken}&refreshToken=${ssoCookieData.refreshToken}&accessToken=${ssoCookieData.accessToken}&session_id=${ssoCookieData.session_id}`)

  return apiResponse(200,data.data,"success")

})
