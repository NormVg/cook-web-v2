export const useUserTemplateList = async  (userData) => {
  const config = useRuntimeConfig()

   const { data, pending, error, refresh } = await useFetch('/api/v2/template/list-by-user',{
    headers:{
      "X-COOK-APP": "web",
      "X-COOK-KEY": config.public.taoTokenWeb,
    },
    query:{
      username: userData.username
    }
  })

  return data.value.data
}
