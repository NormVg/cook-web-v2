import axios from "axios";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const runtimeConfig  = useRuntimeConfig()


    if (!body || !body.username || !body.taoAccessToken || !body.taoRefreshToken) {
      return { statusCode: 400, data: [], status: "args not found" }
    }

    const url = getRequestURL(event)

    const appOrigin = `${url.protocol}//${url.host}`;


    const origin = `${getRequestProtocol(event)}://${getRequestHost(event)}`



    const options = {
      method: 'GET',
      url: `${runtimeConfig.public.taoAuthURL}/api/data/user`,
      params: {
        username: body.username,
        taoAuth: runtimeConfig.public.taoAuthToken,
        app: origin,
        accessToken: body.taoAccessToken,
        refreshToken: body.taoRefreshToken
      }
    };


      const { data } = await axios.request(options);
      console.log(data);
      return data //{ statusCode: 200, data: data, status: "good" };



    // return { statusCode: 200, data: data, status: "good" };
  } catch (error) {
    return { statusCode: 500, data: {}, status: error };
  }
});
