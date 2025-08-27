export const useRenewConKey = async (dataUser) => {

  const runtimeConfig = useRuntimeConfig()

  const { data: userData } = await useFetch(`/api/v2/user/change-key`, {
    headers: {
      "X-COOK-APP": "web",
      "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
    },
    query: {
      uid: dataUser.id,
      username: dataUser.username,
      email: dataUser.email
    }
  })


  console.log("🚀 ~ getTemplateData ~ userData by conkeyyy:", userData.value)
  return userData.value?.data[0].connKey;
}
