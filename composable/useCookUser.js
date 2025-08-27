export const useCookUser = async (dataUser) => {

  const runtimeConfig =   useRuntimeConfig()


  const { data: userData } = await useFetch(`/api/v2/user/get-by-user`,{
          headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
          query:{
            username:dataUser.username
          }
  });

  console.log("🚀 ~ getTemplateData ~ userData by xyzzzz:", userData.value);

return userData.value?.data ;

}
