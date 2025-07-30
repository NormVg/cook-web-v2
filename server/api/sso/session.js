import { apiResponse } from "~/utils/apiResponse";
import { getLoginSSO, isToken, isTokenValid, refreshTokenSSO } from "~/utils/tao-sso-client";

export default defineEventHandler(async (event) => {


  const body = getQuery(event)

  try {


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


  // console.log("🚀 ~ defineNuxtRouteMiddleware ~ ssoCookieData:", ssoCookieData)




  const url = getRequestURL(event)

  const runtimeConfig = useRuntimeConfig();



  const appOrigin = `${url.protocol}//${url.host}`;

  const redirectTo = `${appOrigin}${body.to ?  body.to : '/'}`

  // console.log("🚀 ~ defineEventHandler ~ redirectTo:", redirectTo)



  const is_token = await isToken(ssoCookieData)

  // console.log("🚀 ~ defineEventHandler ~ is_token:", is_token)

  if (is_token){


    const is_token_valid = await isTokenValid(ssoCookieData,runtimeConfig.public.taoAuthURL,runtimeConfig.public.taoAuthToken, appOrigin)

    // console.log("🚀 ~ defineEventHandler ~ is_token_valid:", is_token_valid)



    if (is_token_valid === undefined){
      const sso_login_url = await getLoginSSO(runtimeConfig.public.taoAuthToken,runtimeConfig.public.taoAuthURL,runtimeConfig.public.taoAuthCallback,appOrigin)
      return await sendRedirect(event,sso_login_url)

    }

    if (is_token_valid === false) {

      const newTokenSSO = await refreshTokenSSO(ssoCookieData,runtimeConfig.public.taoAuthURL, runtimeConfig.public.taoAuthToken,appOrigin)

      // console.log("🚀 ~ defineEventHandler ~ newTokenSSO:", newTokenSSO)

      return await sendRedirect(event,`/api/sso/auth?accessToken=${newTokenSSO.accessToken}&refreshToken=${newTokenSSO.refreshToken}&id=${ssoCookieData.session_id}&expiryDate=${newTokenSSO.expiryDate}&next=${redirectTo}`)

    }


    return apiResponse(200,[{...ssoCookieData,isSession:true}],"success")

  }

  if (!is_token) {
    return apiResponse(401,[{isSession:false}],"Authentication required or failed.")
  }


  } catch (error) {
    console.error(error);
    return apiResponse(500,[],"internal server error")
  }
})
