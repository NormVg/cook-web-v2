export const useListPublicTemplate = async (template_id) => {
  const runtimeConfig = useRuntimeConfig()

      const { data, pending, error, refresh } = await useFetch('/api/v2/template/public-list', {

      headers: {
        "X-COOK-APP": "web",
        "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
      },





    })


    return data.value?.data;
}
