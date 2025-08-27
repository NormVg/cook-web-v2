export const useGetPublicTemplate = async (template_id) => {
  const runtimeConfig = useRuntimeConfig()

      const { data, pending, error, refresh } = await useFetch('/api/v2/template/public-get', {

      headers: {
        "X-COOK-APP": "web",
        "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
      },


      query: {
        uid: template_id
      }



    })


    return data.value?.data;
}
