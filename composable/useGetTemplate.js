

export const useGetTemplate = async  (template_id,userData) => {
  const isSession = useCookie("isSession");
  console.log("🚀 ~ useTemplate ~ isSession:", isSession.value);

  const runtimeConfig =   useRuntimeConfig()
    // console.log(runtimeConfig.public.taoTokenWeb);

    if (isSession.value) {

      const usernameUser = userData.username;
      console.log("🚀 ~ getTemplateData ~ usernameData:", usernameUser);

      const {data} = await useFetch(`/api/v2/template/get?username=${usernameUser}&uid=${template_id}`,{

      headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
      })

      // console.log("🚀 ~ getTemplateData ~ data:", data.value.data[0])

      return data.value.data[0]
    }
};
