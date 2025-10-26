export const useGetUserPublicTemplates = async (username) => {
  const runtimeConfig = useRuntimeConfig()

  if (!username) {
    return [];
  }

  const { data, pending, error, refresh } = await useFetch(`/api/v2/template/public-list-by-user?username=${username}`, {
    headers: {
      "X-COOK-APP": "web",
      "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
    },
  })

  return data.value?.data || [];
}
