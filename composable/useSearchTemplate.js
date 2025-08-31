export const useSearchTemplate = async (searchTerm) => {
  const runtimeConfig = useRuntimeConfig()

  const { data, pending, error, refresh } = await useFetch('/api/v2/template/search', {

    headers: {
      "X-COOK-APP": "web",
      "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
    },


    query: {
      q: searchTerm
    }



  })


  return data.value?.data;
}
