export const useDeleteTemplate = async (template_id) => {
  const runtimeConfig = useRuntimeConfig();

  const data = await $fetch('/api/v2/template/remove', {
    headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
          query:{
            uid:template_id
          }
  })
}
