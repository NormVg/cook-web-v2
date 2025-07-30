import { getLoginSSO } from "~/utils/tao-sso-client";

export default defineEventHandler(async (event) => {
  try {

  const url = getRequestURL(event)

  const runtimeConfig = useRuntimeConfig();



  const appOrigin = `${url.protocol}//${url.host}`;

    const taoAuthToken = runtimeConfig.public.taoAuthToken;
    const taoAuthCallback = runtimeConfig.public.taoAuthCallback;
    const taoAuthURL = runtimeConfig.public.taoAuthURL;


    const redirect_url = await getLoginSSO(
      taoAuthToken,
      taoAuthURL,
      taoAuthCallback,
      appOrigin
    );

    console.log(redirect_url);

    // await navigateTo(redirect_url, { external: true });
    return sendRedirect(event,redirect_url)
  } catch (error) {
    console.error(error);
  }
});
